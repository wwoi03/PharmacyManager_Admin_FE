import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule } from '@nebular/theme';
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
    Ng2SmartTableModule,
    FormsModule,
    NbButtonModule,
    RouterModule.forChild([]),
    NbDialogModule.forChild(),
    DiseaseSymptomModule,

    SymptomRoutingModule,
  ]
})
export class SymptomModule { }
