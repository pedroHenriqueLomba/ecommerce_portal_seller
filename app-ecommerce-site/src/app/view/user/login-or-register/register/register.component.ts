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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private formBuilder: FormBuilder, private service: CostumerService) {}

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
    this.service.registerCostumer(costumer).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
