import { ListProductDto } from './dto/listProduct.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { Model } from 'mongoose';
import Product from './entities/product.entity';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import Paginator from 'src/helpers/paginator/paginator';
import QueryPaginator from 'src/helpers/paginator/query.paginator';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(ProductSchema.name) private productModel: Model<Product>,
        private paginator: Paginator
    ) { }

    async findAll(query: QueryPaginator): Promise<Product[]> {
        return this.paginator.paginate(query, this.productModel, ListProductDto);
    }

    async findBySku(sku: string): Promise<Product> {
        const selectedProduct = await this.productModel.findOne({ sku: sku }).exec();
        if (!selectedProduct) throw new HttpException('Produto não encontrado', 404);
        return selectedProduct;
    }

    async create(productData: CreateProductDto): Promise<Product> {
        if(await this.productModel.findOne({ sku: productData.sku })) throw new HttpException('Produto já cadastrado', 400);
        const createdProduct = new this.productModel(productData);
        return await createdProduct.save();
    }

    async update(sku: string, productData: UpdateProductDto): Promise<Product> {
        const updatedProduct = await this.productModel.findOneAndUpdate({ sku: sku }, { $set: productData }, { new: true }).exec();
        if (!updatedProduct) throw new HttpException('Produto não encontrado', 404);
        return updatedProduct;
    }

    async disable(id: string) {
        const disabledProduct = await this.productModel.findOneAndUpdate({ _id: id }, { $set: { active: false } }, { new: true }).exec();
        if (!disabledProduct) throw new HttpException('Produto não encontrado', 404);
        return disabledProduct;
    }
}
