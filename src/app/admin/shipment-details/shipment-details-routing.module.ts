import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentDetailsComponent } from './shipment-details.component';
import { ShipmentDetailsCreateComponent } from './shipment-details-create/shipment-details-create.component';
import { ShipmentDetailsListComponent } from './shipment-details-list/shipment-details-list.component';
import { ShipmentEditComponent } from './shipment-edit/shipment-edit.component';

const routes: Routes = [{
  path: '',
  component: ShipmentDetailsComponent,
  children: [
    {
      path: 'shipment-details-list/:id',
      component: ShipmentDetailsListComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentDetailsRoutingModule { }

export const routedComponents = [
  ShipmentDetailsComponent,
  ShipmentDetailsCreateComponent,
  ShipmentDetailsListComponent,
  ShipmentEditComponent,
];