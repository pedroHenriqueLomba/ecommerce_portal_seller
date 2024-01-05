import { cpf } from 'cpf-cnpj-validator';
import { AuthGuard } from './../auth/auth.guard';
import { Controller, UseGuards } from '@nestjs/common';
import { Get, Param, Post, Body, Put, Query, Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import QueryPaginator from 'src/helpers/paginator/query.paginator';
import { CartService } from 'src/cart/cart.service';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private cartService: CartService,
  ) {}

  @Get()
  findAll(@Query() query) {
    const queryPaginator = new QueryPaginator(
      query.filter || '{}',
      query.page || 0,
      query.perPage || 10,
    );
    return this.orderService.findAll(queryPaginator);
  }

  @Get('costumer')
  @UseGuards(AuthGuard)
  async getByCostumer(@Request() req) {
    try {
      return this.orderService.getByCostumerCpf(req.user.cpf);
    } catch (error) {
      return error;
    }
  }

  @Get('costumer/:orderId')
  @UseGuards(AuthGuard)
  async getOrderData(@Request() req, @Param('orderId') orderId: string) {
    try {
      return this.orderService.getOrderDataByCostumer(req.user.cpf, orderId);
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    try {
      return this.orderService.findById(id);
    } catch (error) {
      return error;
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() orderData: CreateOrderDto, @Request() req) {
    try {
      const order = this.orderService.create(orderData, req.user.cpf);
      this.cartService.clearCart(req.user.cpf);
      return order;
    } catch (error) {
      return error;
    }
  }

  @Put(':id')
  update(@Body() orderData: UpdateOrderDto, @Param('id') id: string) {
    try {
      return this.orderService.update(id, orderData);
    } catch (error) {
      return error;
    }
  }
}
