import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routedComponents, ShipmentDetailsRoutingModule } from './shipment-details-routing.module';

@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    ShipmentDetailsRoutingModule
  ]
})
export class ShipmentDetailsModule { }
