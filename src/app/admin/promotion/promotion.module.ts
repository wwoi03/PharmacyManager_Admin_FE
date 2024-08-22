import { NgModule } from '@angular/core';

import { PromotionRoutingModule, routedComponents } from './promotion-routing.module';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbRadioModule, NbTabsetModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { PromotionProductModule } from '../promotion-product/promotion-product.module';
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
    NbTabsetModule,
    NbDatepickerModule,
    NgOptionHighlightModule,
    NbRadioModule,


    PromotionRoutingModule,
    PromotionProductModule,
    PromotionProgramModule,
  ]
})
export class PromotionModule { }
