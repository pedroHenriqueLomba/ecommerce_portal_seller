import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema, ProductSchemaFactory } from './schemas/product.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import Paginator from 'src/helpers/paginator/paginator';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: ProductSchema.name,
            schema: ProductSchemaFactory
        }]),
    ],
    controllers: [ProductController],
    providers: [ProductService, Paginator]
})
export class ProductModule {}
