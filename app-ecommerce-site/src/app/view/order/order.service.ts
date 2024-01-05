import { AutenticatorService } from './../../helpers/autenticator/autenticator.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateOrder } from './entities/createOrder.entity';
import { Observable } from 'rxjs';
import { OrderListItem } from './order-list/entities/orderListItem.entity';
import { OrderDetails } from './entities/orderDetails.entity';

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

  getCostumerOrders(): Observable<OrderListItem[]>{
    return this.http.get<OrderListItem[]>('http://localhost:3000/order/costumer', {
      headers: {
        Authorization: `Bearer ${this.autenticatorService.getToken()}`,
      },
    });
  }

  getOrderDetails(orderId: string): Observable<OrderDetails> {
    return this.http.get<OrderDetails>(`http://localhost:3000/order/costumer/${orderId}`, {
      headers: {
        Authorization: `Bearer ${this.autenticatorService.getToken()}`,
      },
    });
  }
}
