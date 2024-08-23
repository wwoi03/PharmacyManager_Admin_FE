import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { OrderListComponent } from './order-list/order-list.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { OrderStatus } from '../../models/requests/order/edit-order-request';
import { OrderStatusComponent } from './order-status/order-status.component';
import { DetailsOrderListComponent } from './details-order-list/details-order-list.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    children: [
      { path: 'order-list', component: OrderListComponent },
      // {path: 'order-create', component: OrderCreateComponent},
      {path: 'order-edit/:id', component: EditOrderComponent },
      {path: 'order-details-list', component: DetailsOrderListComponent},
      // {path: 'order-delete/:id', component: OrderDeleteComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrderRoutingModule { }

export const routedComponents = [
  OrderComponent,
  OrderListComponent,
  OrderStatusComponent,
  // OrderCreateComponent,
  EditOrderComponent,
  DetailsOrderListComponent,
  // OrderDeleteComponent,
];