import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { ListComponent as ProductList } from './view/product/list/list.component';
import { DetailsComponent as ProductDetails } from './view/product/details/details.component';
import { ListComponent as OrderList } from './view/order/list/list.component';
import { ListComponent as CostumerList } from './view/costumer/list/list.component';
import { DetailsComponent as OrderDetails } from './view/order/details/details.component';
import { DetailsComponent as CostumerDetails } from './view/costumer/details/details.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'produtos',
    component: ProductList,
  },
  {
    path: 'produtos/novo',
    component: ProductDetails,
  },
  {
    path: 'produtos/:id',
    component: ProductDetails,
  },
  {
    path: 'pedidos',
    component: OrderList,
  },
  {
    path: 'pedidos/:id',
    component: OrderDetails,
  },
  {
    path: 'clientes',
    component: CostumerList,
  },
  {
    path: 'clientes/:cpf',
    component: CostumerDetails,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
