import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionProductRoutingModule, routedComponents } from './promotion-product-routing.module';
import { ListPromotionProductComponent } from './list-promotion-product/list-promotion-product.component';
import { CreatePromotionProductComponent } from './create-promotion-product/create-promotion-product.component';
import { DeletePromotionProductComponent } from './delete-promotion-product/delete-promotion-product.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { PromotionProductComponent } from './promotion-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { PromotionProgramModule } from '../promotion-program/promotion-program.module';


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
    NgSelectModule,

    PromotionProductRoutingModule,
    PromotionProgramModule
  ],
  exports:[
    ...routedComponents,
    PromotionProductComponent,
    ListPromotionProductComponent,
    DeletePromotionProductComponent,
    CreatePromotionProductComponent,
  ]
})
export class PromotionProductModule { }
