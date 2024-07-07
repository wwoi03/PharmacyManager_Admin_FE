import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  routedComponents,
  ShipmentRoutingModule,
} from "./shipment-routing.module";

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
} from "@nebular/theme";

import { ThemeModule } from "../../@theme/theme.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [...routedComponents],
  imports: [
    NbCardModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbActionsModule,
    NbButtonModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbRadioModule,
    NbSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NbSpinnerModule,

    CommonModule,
    ShipmentRoutingModule,
  ],
})
export class ShipmentModule {}
