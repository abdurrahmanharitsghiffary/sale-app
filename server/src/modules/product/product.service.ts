import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductMustExistsException } from './exception/must-exists.exception';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({ data: createProductDto });
  }

  findAll() {
    return this.prismaService.product.findMany();
  }

  findOne(id: number) {
    return this.checkProductMustExists(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.checkProductMustExists(id);
    return this.prismaService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    await this.checkProductMustExists(id);
    return this.prismaService.product.delete({ where: { id } });
  }

  async checkProductMustExists(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });
    if (!product) throw new ProductMustExistsException();
    return product;
  }
}
