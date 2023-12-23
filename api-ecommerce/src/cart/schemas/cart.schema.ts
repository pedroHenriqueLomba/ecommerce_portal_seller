import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cartItem.entity';

export type CartDocument = HydratedDocument<CartSchema>;

@Schema({ collection: 'carts', timestamps: true })
export class CartSchema implements Cart {
  @Prop({ required: true })
  items: CartItem[];
  @Prop({ required: true, unique: true })
  costumerCpf: string;
}

export const CartSchemaFactory = SchemaFactory.createForClass(CartSchema);
