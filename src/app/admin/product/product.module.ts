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
  NbTreeGridModule,
} from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";

import { ThemeModule } from "../../@theme/theme.module";
import {
  ProductRoutingModule,
  routedComponents,
} from "./product-routing.module";
import { FormsModule } from "@angular/forms";
import { FsIconComponent } from "./product-list/product-list.component";
import { NgxPaginationModule } from "ngx-pagination";

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

    ProductRoutingModule,
  ],
  declarations: [...routedComponents, FsIconComponent],
})
export class ProductModule {}
