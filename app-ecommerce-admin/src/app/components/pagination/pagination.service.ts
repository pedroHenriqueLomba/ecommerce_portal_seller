import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  public totalPages: number = 1;

  public setTotalPages(totalPages: number) {
    this.totalPages = totalPages;
  }

  public currentPage: number = 1;
}
