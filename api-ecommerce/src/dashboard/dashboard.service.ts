import { Costumer } from 'src/costumer/entities/costumer.entity';
import { CostumerSchema } from './../costumer/schemas/costumer.schema';
import { ProductSchema } from './../product/schemas/product.schema';
import { OrderSchema } from './../order/schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import Order from 'src/order/entities/order.entity';
import Product from 'src/product/entities/product.entity';
import Dashboard from './entities/dashboard.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(OrderSchema.name) private orderModel: Model<Order>,
    @InjectModel(ProductSchema.name) private productModel: Model<Product>,
    @InjectModel(CostumerSchema.name) private costumerModel: Model<Costumer>,
  ) {}

  async index(): Promise<Dashboard> {
    const totalOrders = this.orderModel.countDocuments();
    const totalProducts = this.productModel.countDocuments();
    const totalCostumers = this.costumerModel.countDocuments();

    const dashboard: Dashboard = {
      totalOrders: await totalOrders,
      totalCostumers: await totalCostumers,
      totalProducts: await totalProducts,
    };

    return dashboard;
  }
}
