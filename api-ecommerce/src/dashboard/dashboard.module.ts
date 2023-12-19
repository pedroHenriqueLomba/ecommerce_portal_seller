import { OrderSchemaFactory } from './../order/schemas/order.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CostumerSchema, CostumerSchemaFactory } from 'src/costumer/schemas/costumer.schema';
import { OrderSchema } from 'src/order/schemas/order.schema';
import { ProductSchema, ProductSchemaFactory } from 'src/product/schemas/product.schema';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: OrderSchema.name,
      schema: OrderSchemaFactory
  }]),
  MongooseModule.forFeature([{
      name: CostumerSchema.name,
      schema: CostumerSchemaFactory
  }]),
  MongooseModule.forFeature([{
      name: ProductSchema.name,
      schema: ProductSchemaFactory
  }]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
