import { OrderListComponent } from './view/order/order-list/order-list.component';
import { LoginOrRegisterComponent } from './view/user/login-or-register/login-or-register.component';
import { DetailsComponent as ProductDetails } from './view/product/details/details.component';
import { HomeComponent } from './view/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './view/cart/cart.component';
import { EditComponent as EditCostumerComponent } from './view/user/edit/edit.component';
import { OrderComponent } from './view/order/order.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'produto/:sku',
    component: ProductDetails
  },
  {
    path: 'login',
    component: LoginOrRegisterComponent
  },
  {
    path: 'carrinho',
    component: CartComponent
  },
  {
    path: 'usuario/editar',
    component: EditCostumerComponent
  },
  {
    path: 'pedidos',
    component: OrderListComponent
  },
  {
    path: 'pedidos/:id',
    component: OrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
