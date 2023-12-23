import { Component, Input } from '@angular/core';
import { ProductCard } from './productCard.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  constructor(private router: Router) {}

  @Input() product!: ProductCard;

  priceFormatter() {
    return this.product.price.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  goToProduct() {
    this.router.navigate(['produto', this.product.sku]);
  }
}
