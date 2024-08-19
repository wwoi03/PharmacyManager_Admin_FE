import { NgModule } from '@angular/core';
import {  NbButtonModule, NbCardModule,  NbDialogModule, NbIconModule, NbInputModule, NbTabsetModule} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';

import { DiseaseRoutingModule, routedComponents } from './disease-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DiseaseSymptomModule } from '../diseaseSymptom/disease-symptom.module';
import { ProductDiseaseModule } from '../productDisease/product-disease.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

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
    Ng2SmartTableModule, 
    NbTabsetModule,
    
    DiseaseSymptomModule,
    ProductDiseaseModule,
    DiseaseRoutingModule,
  ],
  
  declarations: [...routedComponents],

})
export class DiseaseModule { }
