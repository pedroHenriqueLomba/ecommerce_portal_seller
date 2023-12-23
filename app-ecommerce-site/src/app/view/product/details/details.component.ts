import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import Product from '../product.entity';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  constructor(private service: ProductService, private route: Router) {}

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
}
