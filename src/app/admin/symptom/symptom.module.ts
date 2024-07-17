import { NgModule } from '@angular/core';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbListModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { routedComponents, SymptomRoutingModule } from './symptom-routing.module';
import { DiseaseSymptomModule } from '../diseaseSymptom/disease-symptom.module';

@NgModule({
  declarations: [
    ...routedComponents
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
    DiseaseSymptomModule,
    NbListModule,
    NbAccordionModule,

    SymptomRoutingModule,
  ]
})
export class SymptomModule { }
