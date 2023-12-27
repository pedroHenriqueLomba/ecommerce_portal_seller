import { equalsPasswordValidator } from './../../../helpers/validators/equalsPasswordsValidator';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CostumerService } from '../costumer.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { cpfValidator } from '../../../helpers/validators/cpfValidator';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  constructor(
    private costumerService: CostumerService,
    private formBuilder: FormBuilder,
    private route: Router,
    private cookieService: CookieService
  ) {}

  public costumerForm!: FormGroup;

  ngOnInit() {
    this.getrCostumerInfo();
    this.createForm();
  }

  getrCostumerInfo() {
    this.costumerService.getCostumerInfo().subscribe((costumer) => {
      this.costumerForm.patchValue(costumer);
    });
  }

  createForm() {
    this.costumerForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      cpf: ['', Validators.compose([Validators.required, cpfValidator()])],
      oldPassword: ['', Validators.compose([Validators.required, Validators.minLength(7)])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(7)]),
      ],
      passwordConfirmation: ['', Validators.compose([Validators.required])],
    });
    this.costumerForm
      .get('passwordConfirmation')
      ?.setValidators(
        equalsPasswordValidator(this.costumerForm.get('password'))
      );
  }

  sendUpdate() {
    this.setAllFieldsTouched();
    this.configRequest();
    if (this.costumerForm.invalid) {
      return;
    }
    this.costumerService.updateCostumer(this.costumerForm.value).subscribe({
      next: (costumer) => {
        this.cookieService.set('costumer_name', costumer.name, {
          expires: Date.now() + 10800000,
        }); // 3 hours
        this.route.navigate(['/']);
      },
      error: (err) => {
        if(err.status === 401){
          this.route.navigate(['login']);
        }
        console.log(err);
      },
    });
  }

  setAllFieldsTouched(){
    Object.keys(this.costumerForm.controls).forEach(field => {
      const control = this.costumerForm.get(field);
      control?.markAsTouched();
    });
  }

  configRequest() {
    if (this.costumerForm.get('password')?.value === '') {
      this.costumerForm.setControl(
        'password',
        this.costumerForm.get('oldPassword')
      );
      this.costumerForm.setControl(
        'passwordConfirmation',
        this.costumerForm.get('oldPassword')
      );
    }
    this.costumerForm.removeControl('email');
    this.costumerForm.removeControl('passwordConfirmation');
  }
}
