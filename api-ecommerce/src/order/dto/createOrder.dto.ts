import { IsString } from 'class-validator';
import { IsArray, Validate } from 'class-validator';
import { cpfValidator } from 'src/helpers/validator/cpf.validator';
import { CartItem } from '../../cart/entities/cartItem.entity';

export class CreateOrderDto {
  @IsArray()
  items: CartItem[];
}
