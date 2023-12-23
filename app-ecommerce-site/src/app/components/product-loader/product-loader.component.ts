import { GeneralPaginated } from './../paginator/generalPaginator.entity';
import { ProductCardComponent } from './../product-card/product-card.component';
import { Component } from '@angular/core';
import { ProductCard } from '../product-card/productCard.entity';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../view/product/product.service';

@Component({
  selector: 'app-product-loader',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './product-loader.component.html',
  styleUrl: './product-loader.component.css',
})
export class ProductLoaderComponent {
  constructor(private service: ProductService) {}

  private currentPage = 1;
  public products: ProductCard[] = [];
  private totalPages = 1;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    if (this.hasMorePages()) {
      this.service
        .loadProducts(this.currentPage)
        .subscribe((response: GeneralPaginated<ProductCard>) => {
          this.totalPages = response.totalPages;
          response.data.forEach((product) => {
            this.products.push(product);
          });
        });
      this.currentPage++;
    }
  }

  hasMorePages() {
    return this.currentPage <= this.totalPages;
  }
}
