import { NgModule } from '@angular/core';
import { NbAccordionModule, NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDialogModule, NbIconModule, NbInputModule, NbListModule, NbTableModule, NbTreeGridModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { DiseaseRoutingModule, routedComponents } from './disease-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DiseaseSymptomModule } from '../diseaseSymptom/disease-symptom.module';
import { CommonModule } from '@angular/common';


@NgModule({
  
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
    

    DiseaseRoutingModule,
  ],
  
  declarations: [...routedComponents],

})
export class DiseaseModule { }
