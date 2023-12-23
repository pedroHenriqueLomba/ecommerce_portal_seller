import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-or-register',
  standalone: true,
  imports: [LoginComponent, RegisterComponent],
  templateUrl: './login-or-register.component.html',
  styleUrl: './login-or-register.component.css'
})
export class LoginOrRegisterComponent {

}
