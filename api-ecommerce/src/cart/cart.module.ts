import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartSchema, CartSchemaFactory } from './schemas/cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CartSchema.name,
        schema: CartSchemaFactory,
      },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
