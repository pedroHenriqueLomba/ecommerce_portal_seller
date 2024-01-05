import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AutenticatorService {
  constructor(private cookieService: CookieService, private router: Router) {}

  public getToken(): string | void {
    const token = this.cookieService.get('access_token');
    if (token) {
      return token;
    }
  }

  public getCostumerName(): string | void {
    const costumerName = this.cookieService.get('costumer_name');
    if (costumerName) {
      return costumerName;
    }
  }

  public logout(): void {
    this.cookieService.delete('access_token');
    this.cookieService.delete('costumer_name');
    this.router.navigate(['/login']);
  }
}
