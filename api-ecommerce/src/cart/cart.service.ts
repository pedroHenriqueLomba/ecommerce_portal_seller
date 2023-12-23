import { CartSchema } from './schemas/cart.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cartItem.entity';

@Injectable()
export class CartService {
  constructor(@InjectModel(CartSchema.name) private model: Model<Cart>) {}

  async findOrCreateCart(cpf: string): Promise<Cart> {
    const cart = await this.model.findOne({ costumerCpf: cpf }).exec();
    if (!cart) {
      return this.model.create({ costumerCpf: cpf, items: [] });
    }
    return cart;
  }

  async addToCart(cpf: string, item: CartItem): Promise<Cart> {
    await this.findOrCreateCart(cpf);
    return await this.model
      .findOneAndUpdate(
        { costumerCpf: cpf },
        { $push: { items: item } },
        { new: true },
      )
      .exec();
  }

  async removeFromCart(cpf: string, sku: string): Promise<Cart> {
    await this.findOrCreateCart(cpf);
    return await this.model.findOneAndUpdate(
        { costumerCpf: cpf },
        { $pull: { items: { sku: sku } } },
        { new: true },
    )
  }
}
