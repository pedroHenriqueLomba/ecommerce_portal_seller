import { CookieService } from 'ngx-cookie-service';
import { CostumerService } from './../../costumer.service';
import { Router } from '@angular/router';
import { Costumer } from './../../costumer.entity';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Login } from './login.entity';
import { Auth } from '../../auth.entity';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private costumerService: CostumerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cookieService: CookieService
  ) {}

  public loginForm!: FormGroup;

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(7)]),
      ],
    });
  }

  login() {
    const loginData: Login = this.loginForm.value;
    this.costumerService.login(loginData).subscribe({
      next: (auth: Auth) => {
        this.cookieService.set('access_token', auth.access_token, {expires: Date.now() + 10800000}); // 3 hours
        this.cookieService.set('costumer_name', auth.name, {expires: Date.now() + 10800000}); // 3 hours

        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
