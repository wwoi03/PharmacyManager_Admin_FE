import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentComponent } from './shipment.component';
import { ShipmentListComponent } from './shipment-list/shipment-list.component';
import { ShipmentCreateComponent } from './shipment-create/shipment-create.component';
import { ShipmentStatusComponent } from './shipment-status/shipment-status.component';

const routes: Routes = [{
  path: '',
  component: ShipmentComponent,
  children: [
    {
      path: 'shipment-list',
      component: ShipmentListComponent,
    },
    {
      path: 'shipment-create',
      component: ShipmentCreateComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentRoutingModule { } 

export const routedComponents = [
  ShipmentComponent,
  ShipmentListComponent,
  ShipmentCreateComponent,
  ShipmentStatusComponent
];