import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartSchema, CartSchemaFactory } from './schemas/cart.schema';
import { ProductSchema, ProductSchemaFactory } from 'src/product/schemas/product.schema';
import { ProductService } from 'src/product/product.service';
import Paginator from 'src/helpers/paginator/paginator';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CartSchema.name,
        schema: CartSchemaFactory,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: ProductSchema.name,
        schema: ProductSchemaFactory,
      },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService, ProductService, Paginator],
})
export class CartModule {}
