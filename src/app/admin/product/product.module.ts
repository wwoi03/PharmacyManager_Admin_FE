import { NgModule } from "@angular/core";
import {
  NbAccordionModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbTabsetModule,
  NbTreeGridModule,
} from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";

import { ThemeModule } from "../../@theme/theme.module";
import {
  ProductRoutingModule,
  routedComponents,
} from "./product-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FsIconComponent } from "./product-list/product-list.component";
import { NgxPaginationModule } from "ngx-pagination";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgOptionHighlightModule } from "@ng-select/ng-option-highlight";

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbActionsModule,
    NbButtonModule,
    NbCheckboxModule,
    FormsModule,
    NbListModule,
    NbAccordionModule,
    NgxPaginationModule,
    NbTabsetModule,

    NgSelectModule, 
    NgOptionHighlightModule, 

    ProductRoutingModule,
  ],
  declarations: [...routedComponents, FsIconComponent],
})
export class ProductModule {}
