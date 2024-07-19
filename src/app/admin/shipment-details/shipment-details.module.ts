import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routedComponents, ShipmentDetailsRoutingModule } from './shipment-details-routing.module';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbListModule, NbRadioModule, NbSelectModule, NbTabsetModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from "@ng-select/ng-select";
import { NgOptionHighlightModule } from "@ng-select/ng-option-highlight";

@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    ShipmentDetailsRoutingModule,

    NbCardModule,
    Ng2SmartTableModule,
    FormsModule,
    NbRadioModule,
    NbSelectModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbListModule,
    NbTabsetModule,
    NgSelectModule, 
    NgOptionHighlightModule, 
  ]
})
export class ShipmentDetailsModule { }
