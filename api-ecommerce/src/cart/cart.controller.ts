import { CartService } from './cart.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Request,
  UseGuards,
  Param,
  Put
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CartItem } from './entities/cartItem.entity';
import { ProductService } from 'src/product/product.service';
import { CartDto } from './dto/cart.dto';
import { CartItemDto } from './dto/cartItem.dto';

@Controller('cart')
export class CartController {
  constructor(
    private service: CartService,
    private productService: ProductService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async getCart(@Request() req) {
    const cart = await this.service.findOrCreateCart(req.user.cpf);
    const items = await cart.items.map(async (item) => {
      const cartItem = new CartItemDto(
        await this.productService.findBySku(item.sku),
      );
      cartItem.quantity = item.quantity;
      return cartItem;
    });

    const cartDto = new CartDto();
    cartDto.items = await Promise.all(items);

    return cartDto;
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

  @Put('')
  @UseGuards(AuthGuard)
  async updateQuantity(@Request() req, @Body() cartItem: CartItem) {
    return this.service.updateQuantity(req.user.cpf, cartItem);
  }
}
