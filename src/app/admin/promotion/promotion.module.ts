import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionRoutingModule, routedComponents } from './promotion-routing.module';
import { ListPromotionComponent } from './list-promotion/list-promotion.component';
import { CreatePromotionComponent } from './create-promotion/create-promotion.component';
import { DetailsPromotionComponent } from './details-promotion/details-promotion.component';
import { DeletePromotionComponent } from './delete-promotion/delete-promotion.component';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbIconModule, NbInputModule, NbRadioModule, NbTabsetModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';


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
  ]
})
export class PromotionModule { }
