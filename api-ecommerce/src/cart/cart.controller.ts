import { CartService } from './cart.service';
import { Body, Controller, Get, Post, Delete, Request, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CartItem } from './entities/cartItem.entity';

@Controller('cart')
export class CartController {
    constructor(private service: CartService) { }

    @Get()
    @UseGuards(AuthGuard)
    async getCart(@Request() req) {
        return this.service.findOrCreateCart(req.user.cpf);
    }

    @Post()
    @UseGuards(AuthGuard)
    async addToCart(@Request() req, @Body() item: CartItem) {
        return this.service.addToCart(req.user.cpf, item);
    }

    @Delete(':sku')
    @UseGuards(AuthGuard)
    async removeFromCart(@Request() req, @Param('sku') sku: string) {
        return this.service.removeFromCart(req.user.cpf, sku);
    }
}
