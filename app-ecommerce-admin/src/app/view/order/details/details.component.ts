import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../order.service';
import { Order } from '../order.entity';
import { OrderDetails } from './orderDetails';
import { OrderUpdate, OrderUpdateProduct } from './orderUpdate.entity';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxMaskModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  constructor(
    private router: Router,
    private service: OrderService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  public orderForm!: FormGroup;
  private formData = new FormData();
  private order = new Order();

  ngOnInit(): void {
    this.createForm();
    this.getOrderDetails();
  }

  createForm() {
    this.orderForm = this.formBuilder.group({
      cpf: ['', Validators.required],
      costumerName: ['', Validators.required],
      email: ['', Validators.required],
      products: this.formBuilder.array([
        this.formBuilder.group({
          sku: ['', Validators.required],
          title: ['', Validators.required],
          price: ['', Validators.required],
          quantity: ['', Validators.required],
          totalProduct: ['', Validators.required],
        }),
      ]),
      date: ['', Validators.required],
      total: ['', Validators.required],
    });
  }

  getOrderDetails() {
    const orderId = this.router.url.split('/')[2];
    this.service.getOrderDetails(orderId).subscribe((data: OrderDetails) => {
      this.orderForm.patchValue({
        cpf: data.costumer.cpf,
        costumerName: data.costumer.name,
        email: data.costumer.email,
        date: data.info.date,
        total: data.info.total,
      });

      const productsArray = this.orderForm.get('products') as FormArray;
      productsArray.clear();

      data.products.forEach((product) => {
        productsArray.push(
          this.formBuilder.group({
            sku: product.sku,
            title: product.title,
            price: product.price,
            quantity: product.quantity,
            totalProduct: product.total,
          })
        );
      });
    });
  }

  public getProductsFormArray(): FormArray {
    return this.orderForm.get('products') as FormArray;
  }

  public update() {
    const updateOrderData = this.configRequest();
    const orderId = this.router.url.split('/')[2];
    this.service.updateOrder(updateOrderData, orderId).subscribe({
      next: () => {
        this.toastr.success('Pedido atualizado com sucesso!');
        this.router.navigate(['/pedidos']);
      },
      error: () => {
        this.toastr.error('Erro ao atualizar pedido!');
      }
    });
  }

  configRequest() {
    const productsArray = this.orderForm.get('products') as FormArray;
    const products = productsArray.value;
    let skuAndQuantity = new OrderUpdate();
    products.forEach((product: OrderUpdateProduct) => skuAndQuantity.items.push({sku: product.sku, quantity: product.quantity}))
    return skuAndQuantity;
  }

  goToList() {
    this.router.navigate(['/pedidos']);
  }
}
