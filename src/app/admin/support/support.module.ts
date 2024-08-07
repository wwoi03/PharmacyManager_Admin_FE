import { NgModule } from '@angular/core';

import { routedComponents, SupportRoutingModule } from './support-routing.module';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbListModule, NbTabsetModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductSupportModule } from '../productSupport/product-support.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    NbCardModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    FormsModule,
    NbButtonModule,
    RouterModule.forChild([]),
    NbDialogModule.forChild(),
    Ng2SmartTableModule,
    NbTabsetModule,
    
    ProductSupportModule,
    SupportRoutingModule,
  ]
})
export class SupportModule { }
