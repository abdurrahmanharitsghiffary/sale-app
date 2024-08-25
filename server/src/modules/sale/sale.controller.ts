import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

import { CreateSaleDto, createSaleSchema } from './dto/create-sale.dto';
import {
  FindAllOptionsDto,
  findAllOptionsSchema,
} from './dto/find-all-options.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SaleService } from './sale.service';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createSaleSchema)) createSaleDto: CreateSaleDto,
  ) {
    return this.saleService.create(createSaleDto);
  }

  @Get()
  findAll(
    @Query(new ZodValidationPipe(findAllOptionsSchema))
    findAllOptions: FindAllOptionsDto,
  ) {
    return this.saleService.findAll(findAllOptions);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(createSaleSchema.partial()))
    updateSaleDto: UpdateSaleDto,
  ) {
    return this.saleService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleService.remove(+id);
  }
}
