import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralPaginated } from '../../components/paginator/generalPaginator.entity';
import { ProductCard } from '../../components/product-card/productCard.entity';
import Product from './product.entity';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  private api = 'http://localhost:3000';

  loadProducts(page: number = 1): Observable<GeneralPaginated<ProductCard>>{
    const perPage = 12;
    return this.http.get<GeneralPaginated<ProductCard>>(`${this.api}/product?page=${page}&perPage=${perPage}`);
  }

  getProduct(sku: string): Observable<Product>{
    return this.http.get<Product>(`${this.api}/product/${sku}`);
  }
}
