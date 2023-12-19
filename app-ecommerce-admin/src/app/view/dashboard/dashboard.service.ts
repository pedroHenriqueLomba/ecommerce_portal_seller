import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Dashboard from './dashboard.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  private readonly API = 'http://localhost:3000/dashboard';

  getDashboardData(): Observable<Dashboard> {
    return this.http.get<Dashboard>(this.API);
  }
}
