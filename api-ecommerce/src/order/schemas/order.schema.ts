import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import Item from '../entities/item.entity';
import Order from '../entities/order.entity';

export type OrderDocument = HydratedDocument<OrderSchema>;

@Schema({ collection: 'orders', timestamps: true })
export class OrderSchema implements Order {
  @Prop({ required: true })
  items: Item[];
  @Prop({ required: true })
  costumer_cpf: string;
  @Prop({ required: true })
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export const OrderSchemaFactory = SchemaFactory.createForClass(OrderSchema);
