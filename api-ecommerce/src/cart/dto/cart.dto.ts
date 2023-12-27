import Product from 'src/product/entities/product.entity';
import { CartItemDto } from './cartItem.dto';

export class CartDto {
  items: CartItemDto[];
}
