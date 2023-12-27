import { AutenticatorService } from './../../helpers/autenticator/autenticator.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateOrder } from './entities/createOrder.entity';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private autenticatorService: AutenticatorService
  ) {}

  createOrder(orderData: CreateOrder) {
    return this.http.post('http://localhost:3000/order', orderData, {
      headers: {
        Authorization: `Bearer ${this.autenticatorService.getToken()}`,
      },
    });
  }
}
