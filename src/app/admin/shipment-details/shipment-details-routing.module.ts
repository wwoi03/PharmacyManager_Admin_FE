import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentDetailsComponent } from './shipment-details.component';
import { ShipmentDetailsCreateComponent } from './shipment-details-create/shipment-details-create.component';
import { ShipmentDetailsListComponent } from './shipment-details-list/shipment-details-list.component';
import { ShipmentEditComponent } from './shipment-edit/shipment-edit.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ShipmentDetailsUnitListComponent } from './shipment-details-unit-list/shipment-details-unit-list.component';
import { ShipmentDetailsDeleteComponent } from './shipment-details-delete/shipment-details-delete.component';

const routes: Routes = [{
  path: '',
  component: ShipmentDetailsComponent,
  children: [
    {
      path: 'shipment-details-list/:id',
      component: ShipmentDetailsListComponent,
    },
    {
      path: 'shipment-details-create/:id',
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
  ShipmentDetailsCreateComponent,
  ShipmentDetailsListComponent,
  ShipmentEditComponent,
  ProductCreateComponent,
  ShipmentDetailsUnitListComponent,
  ShipmentDetailsDeleteComponent,
];