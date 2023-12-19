import { UpdateOrderDto } from './../order/dto/updateOrder.dto';
import { Controller } from '@nestjs/common';
import {
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
  Query,
  UseInterceptors,
  HttpException,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import Product from './entities/product.entity';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import QueryPaginator from 'src/helpers/paginator/query.paginator';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import * as fs from 'fs';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  // TODO - Implementar paginação e filtros
  @Get()
  findAll(@Query() query): Promise<Product[]> {
    const queryPaginator = new QueryPaginator(
      query.filter || '{}',
      query.page || 0,
      query.perPage || 10,
    );
    return this.productService.findAll(queryPaginator);
  }

  @Get(':id')
  findById(@Param('id') sku: string): Promise<Product> {
    try {
      return this.productService.findBySku(sku);
    } catch (error) {
      return error;
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body('productData') productDataString: string,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Product> {
    const productDataObject: CreateProductDto = plainToClass(
      CreateProductDto,
      JSON.parse(productDataString),
    );
    const validatedErrors = await validate(productDataObject);
    if (validatedErrors.length > 0)
      throw new HttpException(validatedErrors, 400);

    const product = await this.productService.create(productDataObject);

    this.saveImage(image, product.sku);

    return product;
  }

  private async saveImage(image: Express.Multer.File, sku: string) {
    const uploadDir = './public/uploads/products';
    const fileName = `${sku}.jpg`;
    const filePath = `${uploadDir}/${fileName}`;
    fs.writeFileSync(filePath, image.buffer);
  }

  @Put(':sku')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('sku') sku: string,
    @Body('productData') productDataString: string,
    @UploadedFile() image: Express.Multer.File = null,
  ): Promise<Product> {
    try {
      const productDataObject: UpdateProductDto = new UpdateProductDto(JSON.parse(productDataString));
      const validatedErrors = await validate(productDataObject);
      if (validatedErrors.length > 0)
        throw new HttpException(validatedErrors, 400);

      const updatedProduct = this.productService.update(sku, productDataObject);
      if (image) {
        this.saveImage(image, sku);
      }
      return updatedProduct;
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  disable(@Param('id') id: string) {
    try {
      return this.productService.disable(id);
    } catch (error) {
      return error;
    }
  }
}
