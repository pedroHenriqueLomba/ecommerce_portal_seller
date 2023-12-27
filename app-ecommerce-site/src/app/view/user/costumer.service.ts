import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Costumer } from './costumer.entity';
import { HttpClient } from '@angular/common/http';
import { Auth } from './auth.entity';
import { Login } from './login-or-register/login/login.entity';
import { AutenticatorService } from '../../helpers/autenticator/autenticator.service';

@Injectable({
  providedIn: 'root',
})
export class CostumerService {
  constructor(
    private http: HttpClient,
    private autenticatorService: AutenticatorService
  ) {}

  registerCostumer(costumerData: Costumer): Observable<Costumer> {
    return this.http.post<Costumer>(
      'http://localhost:3000/costumer',
      costumerData
    );
  }

  login(loginData: Login): Observable<Auth> {
    return this.http.post<Auth>('http://localhost:3000/auth/login', loginData);
  }

  getCostumerInfo(): Observable<Costumer> {
    return this.http.get<Costumer>('http://localhost:3000/costumer/info', {
      headers: {
        Authorization: `Bearer ${this.autenticatorService.getToken()}`,
      },
    });
  }

  updateCostumer(costumerData: Costumer): Observable<Costumer> {
    return this.http.put<Costumer>(
      'http://localhost:3000/costumer',
      costumerData,
      {
        headers: {
          Authorization: `Bearer ${this.autenticatorService.getToken()}`,
        },
      }
    );
  }
}
