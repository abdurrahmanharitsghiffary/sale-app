import { Module } from '@nestjs/common';

import { CommonModule } from './common/common.module';
import { ProductModule } from './modules/product/product.module';
import { SaleModule } from './modules/sale/sale.module';

@Module({
  imports: [CommonModule, SaleModule, ProductModule],
})
export class AppModule {}
