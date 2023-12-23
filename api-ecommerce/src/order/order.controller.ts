import { AuthGuard } from './../auth/auth.guard';
import { Controller, UseGuards } from '@nestjs/common';
import {
    Get,
    Param,
    Post,
    Body,
    Put, 
    Query
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import QueryPaginator from 'src/helpers/paginator/query.paginator';

@Controller('order')
export class OrderController {
    constructor(
        private orderService: OrderService,
    ) { }

    @Get()
    findAll(@Query() query) {
        const queryPaginator = new QueryPaginator(
            query.filter || '{}', 
            query.page || 0, 
            query.perPage || 10
        );
        return this.orderService.findAll(queryPaginator);
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
    create(@Body() orderData: CreateOrderDto) {
        try {
            return this.orderService.create(orderData);
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
