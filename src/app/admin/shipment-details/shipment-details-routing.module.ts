import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentDetailsComponent } from './shipment-details.component';
import { ShipmentDetailsCreateComponent } from './shipment-details-create/shipment-details-create.component';

const routes: Routes = [{
  path: '',
  component: ShipmentDetailsComponent,
  children: [
    {
      path: 'shipment-details-create',
      component: ShipmentDetailsCreateComponent,
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
  ShipmentDetailsCreateComponent
];