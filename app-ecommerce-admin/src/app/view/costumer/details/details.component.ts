import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { CostumerService } from '../costumer.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxMaskModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  constructor(
    private service: CostumerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  public costumerForm!: FormGroup;

  ngOnInit() {
    this.createForm();
    this.getCostumerData();
  }

  createForm() {
    this.costumerForm = this.formBuilder.group({
      name: [''],
      email: [''],
      cpf: [''],
    });
  }

  getCostumerData() {
    const cpf = this.router.url.split('/')[2];
    this.service
      .getCostumer(cpf)
      .subscribe((costumer) => {
        this.costumerForm.patchValue(costumer);
      });
  }

  gotToList() {
    this.router.navigate(['/clientes']);
  }
}
