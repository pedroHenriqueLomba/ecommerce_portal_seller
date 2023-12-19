import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './../../../components/pagination/paginator/paginator.component';
import { GeneralListComponent } from './../../../components/pagination/general-list/general-list.component';
import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Item } from './item.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
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
  constructor(private service: ProductService, private router: Router) {}

  public fields = ['Sku', 'Título', 'Preço', 'Status'];

  public data: Item[] = [];

  public totalPages: number = 1;

  public currentPage: number = 1;

  ngOnInit() {
    this.service.getProducts().subscribe((data) => {
      this.data = data.data;
      this.totalPages = data.totalPages;
    });
  }

  onPageChange(page: number) {
    this.service.getProducts(page).subscribe((data) => {
      this.data = data.data;
      this.totalPages = data.totalPages;
    });
  }

  changeView() {
    this.router.navigate(['produtos/novo']);
  }

  goToProduct(sku: string) {
    this.router.navigate([`produtos/${sku}`]);
  }
}
