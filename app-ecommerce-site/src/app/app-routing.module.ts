import { LoginOrRegisterComponent } from './view/user/login-or-register/login-or-register.component';
import { DetailsComponent as ProductDetails } from './view/product/details/details.component';
import { HomeComponent } from './view/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './view/cart/cart.component';
import { EditComponent as EditCostumerComponent } from './view/user/edit/edit.component';


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
    path: 'user/edit',
    component: EditCostumerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
