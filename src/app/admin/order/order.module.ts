import { NgModule } from '@angular/core';

import { OrderRoutingModule, routedComponents } from './order-routing.module';
import { NbAccordionModule, NbActionsModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbListModule, NbSelectModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CommonModule } from '@angular/common';
import { DetailsOrderListComponent } from './details-order-list/details-order-list.component';


@NgModule({
  declarations: [...routedComponents,],
  
  imports: [
    CommonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    FormsModule,
    NbButtonModule,
    RouterModule.forChild([]),
    NbDialogModule.forChild(),
    NbListModule,
    NbAccordionModule,
    NbActionsModule,
    NbSelectModule,
    Ng2SmartTableModule,
    

    OrderRoutingModule
  ]
})
export class OrderModule { }
