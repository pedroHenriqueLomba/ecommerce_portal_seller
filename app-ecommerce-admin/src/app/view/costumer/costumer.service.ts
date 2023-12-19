import { GeneralPaginated } from './../../components/pagination/general-paginated.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from './list/item.entity';

@Injectable({
  providedIn: 'root',
})
export class CostumerService {
  constructor(private http: HttpClient) {}

  private readonly API = 'http://localhost:3000';

  getCostumers(page: number = 1): Observable<GeneralPaginated<Item>> {
    return this.http.get<GeneralPaginated<Item>>(
      `${this.API}/costumer?page=${page}`
    );
  }

  getCostumer(cpf: string): Observable<Item> {
    return this.http.get<Item>(`${this.API}/costumer/${cpf}`);
  }
}
