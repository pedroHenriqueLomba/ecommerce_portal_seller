import { OrderDetails } from './details/orderDetails';
import { GeneralPaginated } from './../../components/pagination/general-paginated.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from './list/item.entity';
import { OrderUpdate } from './details/orderUpdate.entity';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  private readonly API = 'http://localhost:3000';

  getOrders(page: number = 1): Observable<GeneralPaginated<Item>> {
    return this.http.get<GeneralPaginated<Item>>(
      `${this.API}/order?page=${page}`
    );
  }

  getOrderDetails(id: string): Observable<OrderDetails> {
    return this.http.get<OrderDetails>(`${this.API}/order/${id}`);
  }

  updateOrder(order: OrderUpdate, id: string): Observable<OrderDetails> {
    return this.http.put<OrderDetails>(`${this.API}/order/${id}`, order);
  }
}
