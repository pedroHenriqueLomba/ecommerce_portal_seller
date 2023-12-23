import { IsArray } from 'class-validator';
import { CartItem } from '../../cart/entities/cartItem.entity';

export class UpdateOrderDto {
  @IsArray()
  items: CartItem[];

  constructor(items: CartItem[]) {
    this.items = items;
  }
}
