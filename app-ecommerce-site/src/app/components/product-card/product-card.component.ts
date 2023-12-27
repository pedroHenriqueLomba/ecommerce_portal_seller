import { OrderItem } from './../../view/order/entities/orderItem.entity';
import { Component, Input } from '@angular/core';
import { ProductCard } from './productCard.entity';
import { Router } from '@angular/router';
import { CartService } from '../../view/cart/cart.service';
import { CartItem } from '../../view/cart/entities/cartItem.entity';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  constructor(private route: Router, private cartService: CartService) {}

  @Input() product!: ProductCard;

  priceFormatter() {
    return this.product.price.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  goToProduct() {
    this.route.navigate(['produto', this.product.sku]);
  }

  addToCart({ sku }: { sku: string }) {
    const cartItem: OrderItem = {
      sku: sku,
      quantity: 1,
    };
    this.cartService.addProduct(cartItem).subscribe({
      next: (test) => {
        this.route.navigate(['carrinho']);
      },
      error: (err) => {
        if(err.status === 401){
          this.route.navigate(['login']);
        }
        console.log(err);
      }
    });
  }
}
