import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { OrderListComponent } from './order-list/order-list.component';
import { EditOrderComponent } from './edit-order/edit-order.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    children: [
      { path: 'order-list', component: OrderListComponent },
      // {path: 'order-create', component: OrderCreateComponent},
      {path: 'order-edit/:id', component: EditOrderComponent },
      // {path: 'order-details/:id', component: OrderDetailsComponent},
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
  // OrderCreateComponent,
  EditOrderComponent,
  // OrderDetailsComponent,
  // OrderDeleteComponent,
];