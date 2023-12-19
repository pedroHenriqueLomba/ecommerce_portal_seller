import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema, OrderSchemaFactory } from './schemas/order.schema';
import { OrderController } from './order.controller';
import { CostumerSchema, CostumerSchemaFactory } from 'src/costumer/schemas/costumer.schema';
import { OrderService } from './order.service';
import { ProductSchema, ProductSchemaFactory } from 'src/product/schemas/product.schema';
import Paginator from 'src/helpers/paginator/paginator';

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
    controllers: [OrderController],
    providers: [OrderService, Paginator],
})
export class OrderModule { }
