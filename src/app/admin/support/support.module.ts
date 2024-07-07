import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routedComponents, SupportRoutingModule } from './support-routing.module';
import { SupportDetailsComponent } from './support-details/support-details.component';
import { NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    NbCardModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    FormsModule,
    NbButtonModule,
    RouterModule.forChild([]),
    NbDialogModule.forChild(),

    SupportRoutingModule,
  ]
})
export class SupportModule { }
