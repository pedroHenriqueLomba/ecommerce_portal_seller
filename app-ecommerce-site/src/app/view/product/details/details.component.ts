import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import Product from '../product.entity';
import { CommonModule } from '@angular/common';
import { OrderItem } from '../../order/entities/orderItem.entity';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  constructor(
    private service: ProductService,
    private route: Router,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  public product!: Product;

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    const sku = this.route.url.split('/')[2];
    this.service.getProduct(sku).subscribe((product) => {
      this.product = product;
    });
  }

  priceFormatter() {
    return this.product.price.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
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
        if (err.status === 401) {
          this.toastr.error('Faça login para adicionar um produto ao carrinho');
          this.route.navigate(['login']);
        }
        this.toastr.error('Não foi possível adicionar o produto ao carrinho');
        console.log(err);
      },
    });
  }
}
