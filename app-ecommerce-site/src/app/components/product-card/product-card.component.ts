import { ToastrService } from 'ngx-toastr';
import { OrderItem } from './../../view/order/entities/orderItem.entity';
import { Component, Input } from '@angular/core';
import { ProductCard } from './productCard.entity';
import { Router } from '@angular/router';
import { CartService } from '../../view/cart/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  constructor(private route: Router, private cartService: CartService, private toastr: ToastrService) {}

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
      next: () => {
        this.toastr.success('Produto adicionado ao carrinho');
        this.route.navigate(['carrinho']);
      },
      error: (err) => {
        if(err.status === 401){
          this.toastr.error('Não foi possível adicionar o produto ao carrinho, faça login para continuar');
          this.route.navigate(['login']);
        }
        this.toastr.error('Não foi possível adicionar o produto ao carrinho');
        console.log(err);
      }
    });
  }
}
