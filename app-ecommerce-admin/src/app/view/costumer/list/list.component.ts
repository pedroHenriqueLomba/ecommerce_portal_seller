import { PaginatorComponent } from './../../../components/pagination/paginator/paginator.component';
import { CommonModule } from '@angular/common';
import { GeneralListComponent } from './../../../components/pagination/general-list/general-list.component';
import { CostumerService } from './../costumer.service';
import { Component } from '@angular/core';
import { Item } from './item.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-costumer-list',
  standalone: true,
  imports: [GeneralListComponent, CommonModule, PaginatorComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  constructor(private service: CostumerService, private route: Router) {}

  public fields = ['Cpf', 'Email', 'Nome'];

  public data: Item[] = [];

  public totalPages: number = 1;

  public currentPage: number = 1;

  ngOnInit(): void {
    this.service.getCostumers().subscribe((data) => {
      this.data = data.data;
      this.totalPages = data.totalPages;
    });
  }

  onPageChange(page: number) {
    this.service.getCostumers(page).subscribe((data) => {
      this.data = data.data;
      this.totalPages = data.totalPages;
    });
  }

  gotToCostumer(cpf: string) {
    this.route.navigate([`clientes/${cpf}`]);
  }
}
