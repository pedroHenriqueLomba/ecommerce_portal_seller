import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Costumer } from './costumer.entity';
import { HttpClient } from '@angular/common/http';
import { Auth } from './auth.entity';
import { Login } from './login-or-register/login/login.entity';

@Injectable({
  providedIn: 'root',
})
export class CostumerService {
  constructor(private http: HttpClient) {}

  registerCostumer(costumerData: Costumer): Observable<Costumer> {
    return this.http.post<Costumer>(
      'http://localhost:3000/costumer',
      costumerData
    );
  }

  login(loginData: Login): Observable<Auth> {
    return this.http.post<Auth>('http://localhost:3000/auth/login', loginData);
  }
}
