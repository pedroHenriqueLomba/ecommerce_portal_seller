import { IsArray } from 'class-validator';
import CartItem from '../entities/cartItem.entity';

export class UpdateOrderDto {
    @IsArray()
    items: CartItem[];

    constructor(items: CartItem[]) {
        this.items = items;
    }
}