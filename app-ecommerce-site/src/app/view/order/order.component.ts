import { OrderDetails } from './entities/orderDetails.entity';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  constructor(private router: Router, private orderService: OrderService, private formBuilder: FormBuilder) {}

  public orderForm!: FormGroup;
  public orderId: string = this.router.url.split('/')[2];

  ngOnInit(): void {
    this.createForm();
    this.getOrderDetails();
  }

  createForm() {
    this.orderForm = this.formBuilder.group({
      cpf: '',
      costumerName: '',
      email: '',
      products: this.formBuilder.array([
        this.formBuilder.group({
          sku: '',
          title: '',
          price: '',
          quantity: '',
          totalProduct: '',
        }),
      ]),
      date: '',
      total: '',
    });
  }

  getOrderDetails() {
    this.orderService.getOrderDetails(this.orderId).subscribe((data: OrderDetails) => {
      this.orderForm.patchValue({
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

  goToList() {
    this.router.navigate(['pedidos']);
  }

  public getProductsFormArray(): FormArray {
    return this.orderForm.get('products') as FormArray;
  }
}
