import { CommonModule } from '@angular/common';
import { PaginationService } from './../pagination.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  constructor(private paginationService: PaginationService) { }

  @Input() public totalPages: number = 1;

  public getPagesArray(){
    return Array(this.totalPages).fill(0).map((x,i)=>i+1);
  }

  setPage(page: number){
    this.currentPage = page;
    this.onPageChange.emit(this.currentPage);
  }

  previousPage(){
    if(this.currentPage > 1){
      this.currentPage--;
      this.onPageChange.emit(this.currentPage);
    }
  }

  nextPage(){
    if(this.currentPage < this.totalPages){
      this.currentPage++;
      this.onPageChange.emit(this.currentPage);
    }
  }

  @Input() public currentPage: number = 1;

  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();
}
