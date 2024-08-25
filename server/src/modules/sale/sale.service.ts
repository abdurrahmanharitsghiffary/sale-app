import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CODE } from 'src/common/constants/code';
import { ApiPaginationResponseImpl } from 'src/common/interfaces/api-response/api-pagination-response.impl';
import { PrismaService } from 'src/common/services/prisma.service';
import { genInvoice } from 'src/common/utils/gen-invoice';

import { CreateSaleDto } from './dto/create-sale.dto';
import { FindAllOptionsDto } from './dto/find-all-options.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SaleMustExistsException } from './exception/must-exists.exception';
import { saleInclude, SaleIncludePayload } from './sale.include';

@Injectable()
export class SaleService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ details, ...dto }: CreateSaleDto) {
    await this.checkProductMustExists(
      details.map((detail) => detail.product_id),
    );

    const newSale = await this.prismaService.sale.create({
      data: {
        details: {
          createMany: {
            data: details.map((detail) => ({
              price: detail.price,
              quantity: detail.quantity,
              product_id: detail.product_id,
            })),
          },
        },
        invoice_id: genInvoice(),
        ...dto,
      },
      include: saleInclude,
    });

    return this.toSaleResponse(newSale);
  }

  async findAll({
    limit = 10,
    order_by = 'id',
    search = '',
    sort_by = 'ASC',
    page = 1,
  }: FindAllOptionsDto) {
    this.checkColumnMustExists(order_by);

    const saleWhereInput = {
      AND: [{ invoice_id: { contains: search, mode: 'insensitive' } }],
    } satisfies Prisma.SaleWhereInput;

    const results = await this.prismaService.sale.findMany({
      where: saleWhereInput,
      orderBy: [{ [order_by]: sort_by.toLowerCase() }],
      take: limit,
      skip: (page - 1) * limit,
      include: saleInclude,
    });

    const filteredCount = await this.prismaService.sale.count({
      where: saleWhereInput,
    });

    const count = await this.getAllRecordCount();

    return this.toPaginatedResponse([results, count, filteredCount], {
      limit,
      order_by,
      page,
      search,
      sort_by,
    });
  }

  async findOne(id: number) {
    const product = await this.checkSaleMustExists(id);
    return this.toSaleResponse(product);
  }

  async update(id: number, { details, ...dto }: UpdateSaleDto) {
    await this.checkSaleMustExists(id);

    const updatedSale = await this.prismaService.sale.update({
      where: { id },
      data: {
        details: {
          set: details.map((detail) => ({
            price: detail.price,
            product_id_sale_id: {
              sale_id: id,
              product_id: detail.product_id,
            },
            quantity: detail.quantity,
          })),
        },
        ...dto,
      },
      include: saleInclude,
    });

    return this.toSaleResponse(updatedSale);
  }

  async remove(id: number) {
    await this.checkSaleMustExists(id);
    const deletedSale = await this.prismaService.sale.delete({
      where: { id },
      include: saleInclude,
    });
    return this.toSaleResponse(deletedSale);
  }

  getAllRecordCount() {
    return this.prismaService.sale.count();
  }

  async checkProductMustExists(ids: number[]) {
    const products = await this.prismaService.product.findMany({
      where: { id: { in: ids } },
      select: { id: true },
    });

    const productIds = products.map((p) => p.id);

    const errors = ids
      .filter((id) => !productIds.includes(id))
      .map((id) => ({
        message: 'Product not found',
        code: CODE.NOT_FOUND,
        product_id: id,
      }));

    if (errors.length > 0)
      throw new BadRequestException('Failed to create sale', { cause: errors });
  }

  getTotalPrice({
    discount,
    tax,
    subTotal,
  }: {
    discount: number;
    tax: number;
    subTotal: number;
  }) {
    const totalTax = subTotal * tax;
    const totalDiscount = subTotal * discount;

    return subTotal - totalDiscount + totalTax;
  }

  getSubTotal(details: CreateSaleDto['details']) {
    return details.reduce((a, { price, quantity }) => a + price * quantity, 0);
  }

  checkColumnMustExists(key: string) {
    const isColumnExists = this.prismaService.sale.fields[key] !== undefined;
    if (!isColumnExists)
      throw new UnprocessableEntityException(
        `Failed to sort data. available options: ${Object.keys(
          this.prismaService.sale.fields,
        )
          .map((key) => `${key}`)
          .join(' | ')}`,
      );
  }

  async checkSaleMustExists(id: number) {
    const sale = await this.prismaService.sale.findUnique({
      where: { id },
      include: saleInclude,
    });
    if (!sale) throw new SaleMustExistsException();
    return sale;
  }

  toSaleResponse(sale: SaleIncludePayload) {
    console.log(sale, 'SALE');
    return {
      total_price: this.getTotalPrice({
        discount: +sale.discount,
        tax: +sale.tax,
        subTotal: this.getSubTotal(sale.details),
      }),
      ...sale,
    };
  }

  toPaginatedResponse(
    [data, count, filteredCount]: [SaleIncludePayload[], number, number],
    findAllOptions: FindAllOptionsDto,
  ) {
    const saleResponses = data.map((d) => this.toSaleResponse(d));
    console.log(saleResponses, 'RESPONSE');
    return new ApiPaginationResponseImpl(
      saleResponses,
      findAllOptions.page,
      filteredCount,
      count,
      findAllOptions.limit,
      findAllOptions.sort_by,
      findAllOptions.order_by,
      findAllOptions.search,
    );
  }
}
