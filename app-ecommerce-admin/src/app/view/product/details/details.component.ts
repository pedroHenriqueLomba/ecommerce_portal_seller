import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import Product from '../product.entity';
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
    private service: ProductService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  public productForm!: FormGroup;
  private formData = new FormData();
  private product = new Product();

  private type =
    this.router.url.split('/')[2] === 'novo'
      ? 'createProduct'
      : 'updateProduct';

  public pageTitle: string =
    this.type === 'createProduct' ? 'Novo Produto' : 'Editar Produto';

  ngOnInit(): void {
    this.createForm();
    if (this.type === 'updateProduct') {
      const sku = this.router.url.split('/')[2];
      this.service.getProduct(sku).subscribe((product) => {
        this.product = product;
        this.productForm.patchValue(product);
        this.productForm.get('image')?.clearValidators();
        this.productForm.get('image')?.updateValueAndValidity();
        this.productForm.get('sku')?.disable();
      });
    }
  }

  private createForm(): void {
    this.productForm = this.formBuilder.group({
      sku: [this.product.sku, Validators.compose([Validators.required])],
      title: [this.product.title, Validators.compose([Validators.required])],
      price: [
        this.product.price,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      image: ['', Validators.compose([Validators.required])],
      description: [this.product.description],
      stock: [
        this.product.stock,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      active: [this.product.active, Validators.compose([Validators.required])],
    });
  }

  async save() {
    this.setAllFieldsTouched();
    if (!this.productForm.valid) return;

    this.configRequest();
    if (this.type === 'createProduct') {
      if(await this.service.createProduct(this.formData)){
        this.toastr.success('Produto criado com sucesso!');
        this.router.navigate(['produtos']);
      } else {
        this.toastr.error('Erro ao criar produto!');
      }
    } else {
      const requestSuccesfully = await this.service.updateProduct(this.formData, this.product.sku!);
      if(requestSuccesfully){
        this.toastr.success('Produto atualizado com sucesso!');
        this.router.navigate(['produtos']);
      } else {
        this.toastr.error('Erro ao atualizar produto!');
      }
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      if (this.formData.has('image')) this.formData.delete('image');
      this.formData.append('image', file, file.name);
    }
  }

  configRequest() {
    if (this.formData.has('productData')) this.formData.delete('productData');
    this.formData.append('productData', JSON.stringify(this.productForm.value));
  }

  setAllFieldsTouched(): void {
    Object.keys(this.productForm.controls).forEach((field) => {
      const control = this.productForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  cancel() {
    this.router.navigate(['produtos']);
  }
}
