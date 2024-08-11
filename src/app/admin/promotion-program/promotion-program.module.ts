import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionProgramRoutingModule, routedComponents } from './promotion-program-routing.module';
import { ListPromotionProgramComponent } from './list-promotion-program/list-promotion-program.component';
import { DeletePromotionProgramComponent } from './delete-promotion-program/delete-promotion-program.component';
import { CreatePromotionProgramComponent } from './create-promotion-program/create-promotion-program.component';
import { EditPromotionProgramComponent } from './edit-promotion-program/edit-promotion-program.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';


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
    
    PromotionProgramRoutingModule
  ],
  exports:[
    ListPromotionProgramComponent,
    CreatePromotionProgramComponent,
    EditPromotionProgramComponent,
    DeletePromotionProgramComponent,
  ]
})
export class PromotionProgramModule { }
