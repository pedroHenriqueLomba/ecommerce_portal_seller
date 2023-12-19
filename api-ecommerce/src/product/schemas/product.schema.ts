import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Product from '../entities/product.entity';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductSchema>;

@Schema({ collection: 'products', timestamps: true })
export class ProductSchema implements Product {
  @Prop({ required: true, unique: true })
  sku: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: false })
  description: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  stock: number;

  @Prop({ required: true, default: true })
  active: boolean;
}

export const ProductSchemaFactory = SchemaFactory.createForClass(ProductSchema);
