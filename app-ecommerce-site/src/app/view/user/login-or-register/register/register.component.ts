import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { equalsPasswordValidator } from './../../../../helpers/validators/equalsPasswordsValidator';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { cpfValidator } from '../../../../helpers/validators/cpfValidator';
import { CommonModule } from '@angular/common';
import { CostumerService } from '../../costumer.service';
import { Costumer } from '../../costumer.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private costumerService: CostumerService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private route: Router
  ) {}

  public registerForm!: FormGroup;

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      cpf: ['', Validators.compose([Validators.required, cpfValidator()])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      newPassword: [
        '',
        Validators.compose([Validators.required, Validators.minLength(7)]),
      ],
      newPasswordConfirmation: ['', Validators.compose([Validators.required])],
    });
    this.registerForm
      .get('newPasswordConfirmation')
      ?.setValidators(
        equalsPasswordValidator(this.registerForm.get('newPassword'))
      );
  }

  registerCostumer() {
    this.setAllFieldsTouched();
    if (this.registerForm.invalid) {
      return;
    }
    const costumer = this.configRequest();
    this.sendRequest(costumer);
  }

  setAllFieldsTouched() {
    Object.keys(this.registerForm.controls).forEach((field) => {
      this.registerForm.get(field)?.markAsTouched();
    });
  }
  configRequest(): Costumer {
    return new Costumer(
      this.registerForm.get('name')?.value,
      this.registerForm.get('cpf')?.value,
      this.registerForm.get('email')?.value,
      this.registerForm.get('newPassword')?.value
    );
  }
  sendRequest(costumer: Costumer) {
    this.costumerService.registerCostumer(costumer).subscribe({
      next: (response) => {
        this.toastr.success('Cadastro realizado com sucesso');
        this.costumerService.login({email: costumer.email, password: costumer.password}).subscribe({
          next: (auth) => {
            this.cookieService.set('access_token', auth.access_token, {expires: Date.now() + 10800000}); // 3 hours
            this.cookieService.set('costumer_name', auth.name, {expires: Date.now() + 10800000}); // 3 hours

            this.route.navigate(['/']);
          },
          error: (error) => {
            this.toastr.error('Não foi possível realizar seu login');
            console.log(error);
          },
        });
      },
      error: (error) => {
        this.toastr.error('Não foi possível realizar seu cadastro');
        console.log(error);
      },
    });
  }
}
