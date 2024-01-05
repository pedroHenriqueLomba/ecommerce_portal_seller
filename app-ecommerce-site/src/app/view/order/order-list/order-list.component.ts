import { OrderListItem } from './entities/orderListItem.entity';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css',
})
export class OrderListComponent {
  constructor(private orderService: OrderService, private router: Router) {}

  public orderList: OrderListItem[] = [];

  ngOnInit() {
    this.orderService.getCostumerOrders().subscribe({
      next: (orderList: OrderListItem[]) => {
        this.orderList = orderList;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  formatDate(date: Date) {
    return new Date(date).toLocaleDateString();
  }

  goToOrder(id: string) {
    this.router.navigate(['pedidos', id]);
  }
}
