import { Item } from './item.entity';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from '../../../components/pagination/paginator/paginator.component';
import { GeneralListComponent } from './../../../components/pagination/general-list/general-list.component';
import { OrderService } from './../order.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    GeneralListComponent,
    PaginatorComponent,
    CommonModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  constructor(private service: OrderService,
    private route: Router) {}

  public fields = ['id', 'cpf', 'total'];

  public data: Item[] = [];

  public totalPages: number = 1;

  public currentPage: number = 1;

  ngOnInit(): void {
    this.service.getOrders().subscribe((data) => {
      this.data = data.data;
      this.totalPages = data.totalPages;
    });
  }

  onPageChange(page: number) {
    this.service.getOrders(page).subscribe((data) => {
      this.data = data.data;
      this.totalPages = data.totalPages;
    });
  }

  gotToOrder(id: string) {
    this.route.navigate([`/pedidos/${id}`]);
  }
}
