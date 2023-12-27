import { Observable } from 'rxjs';
import { AutenticatorService } from './../../helpers/autenticator/autenticator.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from './entities/cart.entity';
import { OrderItem } from '../order/entities/orderItem.entity';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private http: HttpClient,
    private autenticatorService: AutenticatorService
  ) {}

  private api = 'http://localhost:3000';

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.api}/cart`, {
      headers: {
        Authorization: `Bearer ${this.autenticatorService.getToken()}`,
      },
    });
  }

  removeItem(sku: string) {
    return this.http.delete(`${this.api}/cart/${sku}`, {
      headers: {
        Authorization: `Bearer ${this.autenticatorService.getToken()}`,
      },
    });
  }

  addProduct(cartItem: OrderItem){
    return this.http.post(`${this.api}/cart`, cartItem, {
      headers: {
        Authorization: `Bearer ${this.autenticatorService.getToken()}`,
      },
    });
  }

  updateQuantity(cartItem: OrderItem) {
    return this.http.put(`${this.api}/cart`, cartItem, {
      headers: {
        Authorization: `Bearer ${this.autenticatorService.getToken()}`,
      },
    });
  }
}
