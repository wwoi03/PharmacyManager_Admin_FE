import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { DiseaseRoutingModule, routedComponents } from './disease-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routedDiseaseSymptomComponents } from '../diseaseSymptom/disease-symptom-routing.module';


@NgModule({
  
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

    DiseaseRoutingModule,
  ],
  
  declarations: [...routedComponents, ...routedDiseaseSymptomComponents],

})
export class DiseaseModule { }
