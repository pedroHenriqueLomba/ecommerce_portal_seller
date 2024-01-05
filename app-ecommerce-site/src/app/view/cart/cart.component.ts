import { OrderService } from './../order/order.service';
import { CreateOrder } from './../order/entities/createOrder.entity';
import { Component } from '@angular/core';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cartItem.entity';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { OrderItem } from '../order/entities/orderItem.entity';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private route: Router,
    private toastr: ToastrService
  ) {
    // Instancia o formulário
    this.quantityForm = this.formBuilder.group({
      quantity: this.formBuilder.array([]),
    });
  }

  public items!: CartItem[];
  public quantityForm!: FormGroup;

  ngOnInit() {
    this.cartService.getCart().subscribe({
      next: (cart: Cart) => {
        this.items = cart.items;
        this.createForm();
        this.quantityForm.valueChanges.subscribe((value) => {
          const item = new OrderItem();
          value.quantity.forEach((quantity: number, index: number) => {
            item.sku = this.items[index].sku;
            item.quantity = quantity;
            this.updateQuantity(item);
          });
        });
      },
      error: (err) => {
        if (err.status === 401) {
          this.route.navigate(['login']);
        }
        console.log(err);
      },
    });
  }

  priceFormatter(price: number) {
    return price.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  createForm() {
    const quantityFormArray = this.quantityForm.get('quantity') as FormArray;

    this.items.forEach((item, i) => {
      quantityFormArray.push(
        this.formBuilder.control(item.quantity, [
          Validators.required,
          Validators.min(1),
        ])
      );
    });
  }

  getTotal() {
    if (this.items) {
      return this.items.reduce(
        (acc, item, index) =>
          acc + item.price * this.quantityForm.value.quantity[index],
        0
      );
    }
    return 0;
  }

  createOrder() {
    const orderData = this.configBody();
    this.orderService.createOrder(orderData).subscribe({
      next: () => {
        this.toastr.success('Pedido criado com sucesso!');
        this.route.navigate(['']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.toastr.error('Faça login para criar o pedido!');
          this.route.navigate(['login']);
        }
        this.toastr.error('Não foi possível criar o pedido!');
        console.log(err);
      },
    });
  }

  configBody() {
    const orderData: CreateOrder = new CreateOrder();
    this.items.forEach((item, index) => {
      orderData.items.push({
        sku: item.sku,
        quantity: this.quantityForm.value.quantity[index],
      });
    });
    return orderData;
  }

  removeItem(sku: string) {
    this.cartService.removeItem(sku).subscribe({
      next: (response) => {
        this.toastr.success('Produto removido do carrinho');
        this.ngOnInit();
      },
      error: (err) => {
        if (err.status === 401) {
          this.toastr.error('Faça login para acessar o carrinho');
          this.route.navigate(['login']);
        }
        this.toastr.error('Não foi possível remover o produto do carrinho');
        console.log(err);
      },
    });
  }

  updateQuantity(orderItem: OrderItem) {
    this.cartService.updateQuantity(orderItem).subscribe({
      next: (response) => {
        // Nothing to do
      },
      error: (err) => {
        if (err.status === 401) {
          this.toastr.error('Faça login para acessar o carrinho');
          this.route.navigate(['login']);
        }
        console.log(err);
      },
    });
  }
}
