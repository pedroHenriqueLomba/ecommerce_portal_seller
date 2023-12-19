import { ListOrderDto } from './dto/listOrder.dto';
import { Injectable, HttpException } from '@nestjs/common';
import { OrderSchema } from './schemas/order.schema';
import Order from './entities/order.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { ProductSchema } from 'src/product/schemas/product.schema';
import Product from 'src/product/entities/product.entity';
import { Costumer } from 'src/costumer/entities/costumer.entity';
import { CostumerSchema } from 'src/costumer/schemas/costumer.schema';
import Paginator from 'src/helpers/paginator/paginator';
import QueryPaginator from 'src/helpers/paginator/query.paginator';
import { DetailsOrderDto } from './dto/detailsOrder.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderSchema.name) private orderModel: Model<Order>,
    @InjectModel(ProductSchema.name) private productModel: Model<Product>,
    @InjectModel(CostumerSchema.name) private costumerModel: Model<Costumer>,
    private paginator: Paginator,
  ) {}

  findAll(query: QueryPaginator): Promise<OrderSchema[]> {
    return this.paginator.paginate(query, this.orderModel, ListOrderDto);
  }

  async findById(id: string): Promise<DetailsOrderDto> {
    const order: Order = await this.orderModel.findById(id).exec();
    if (!order) throw new HttpException('Pedido não encontrado', 404);

    const costumer = await this.costumerModel
      .findOne(
        { cpf: order.costumer_cpf },
        { _id: false, name: true, email: true, cpf: true },
      )
      .exec();

    const products = order.items.map((item) => {
      return {
        sku: item.product.sku,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        total: item.product.price * item.quantity,
      };
    });

    const info = {
      total: order.total,
      date: order.createdAt.toISOString().substring(0, 10), // Format the date to "yyyy-MM-dd"
    };

    return new DetailsOrderDto(await costumer, await products, await info);
  }

  async create(orderDataDto: CreateOrderDto): Promise<Order> {
    const completeItems = [];

    for (const item of orderDataDto.items) {
      const product = await this.productModel
        .findOne({ sku: item.sku })
        .exec();
      if (!product) throw new HttpException(`Produto não encontrado`, 404);
      if (product.stock < item.quantity)
        throw new HttpException(
          `Estoque do produto ${product.title} insuficiente`,
          400,
        );
      if (!product.active)
        throw new HttpException(`Produto ${product.title} inativo`, 400);

      completeItems.push({
        product: product,
        quantity: item.quantity,
      });
    }

    const costumer = await this.costumerModel.findOne({
      cpf: orderDataDto.costumer_cpf,
    });
    if (!costumer) throw new HttpException(`Cliente não encontrado`, 404);

    const total = completeItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );

    const orderData = {
      items: completeItems,
      costumer_cpf: costumer.cpf,
      total: total,
    };

    const createdOrder = new this.orderModel(orderData);
    await createdOrder.save();
    return createdOrder;
  }

  async update(id: string, orderData: UpdateOrderDto): Promise<OrderSchema> {
    const { items } = orderData;

    for (const item of items) {
      const product = await this.productModel
        .findOne({ sku: item.sku })
        .exec();
      if (!product) throw new HttpException(`Produto não encontrado`, 404);
      if(product.stock < item.quantity)
        throw new HttpException(`Estoque do produto ${product.title} insuficiente`, 400);
    }

    const updateOperations = items.map(async (item) => {

      const filter = {
        _id: id,
        'items.product.sku': item.sku,
      };

      const update = {
        $set: {
          'items.$[elem].quantity': item.quantity,
        },
      };

      const options = {
        new: true,
        arrayFilters: [{ 'elem.product.sku': item.sku }],
      };

      return this.orderModel.findOneAndUpdate(filter, update, options);
    });

    const updatedOrders = await Promise.all(updateOperations);
    const updatedOrder = updatedOrders.find((order) => order);

    if (!updatedOrder) {
      throw new HttpException('Pedido não encontrado', 404);
    }

    updatedOrder.total = updatedOrder.items.reduce(
      (total, currentItem) => total + currentItem.product.price * currentItem.quantity,
      0,
    );

    const savedOrder = await updatedOrder.save();

    return savedOrder;
  }
}
