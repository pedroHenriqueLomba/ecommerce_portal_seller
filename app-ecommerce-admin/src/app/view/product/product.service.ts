import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './list/item.entity';
import { GeneralPaginated } from '../../components/pagination/general-paginated.entity';
import { FormGroup } from '@angular/forms';
import Product from './product.entity';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private readonly API = 'http://localhost:3000';

  getProducts(page: number = 1): Observable<GeneralPaginated<Item>> {
    return this.http.get<GeneralPaginated<Item>>(
      `${this.API}/product?page=${page}`
    );
  }

  getProduct(sku: string): Observable<Product> {
    return this.http.get<Product>(`${this.API}/product/${sku}`);
  }

  createProduct(productForm: FormData): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.post<Product>(`${this.API}/product`, productForm).subscribe({
        next: () => resolve(true),
        error: () => resolve(false),
      });
    });
  }

  updateProduct(productForm: FormData, sku: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) =>
      this.http
        .put(`${this.API}/product/${sku}`, productForm).subscribe({
          next: () => resolve(true),
          error: () => resolve(false),
        })
    );
  }
}
