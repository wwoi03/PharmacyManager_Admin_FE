import { NgModule } from '@angular/core';

import { DiseaseSymptomRoutingModule, routedDiseaseSymptomComponents } from './disease-symptom-routing.module';
import { NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListDiseaseSymptomComponent } from './list-disease-symptom/list-disease-symptom.component';
import { DeleteDiseaseSymptomComponent } from './delete-disease-symptom/delete-disease-symptom.component';
import { CreateDiseaseSymptomComponent } from './create-disease-symptom/create-disease-symptom.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [ ...routedDiseaseSymptomComponents],

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
    NgxPaginationModule,
    
    DiseaseSymptomRoutingModule
  ],
  exports:[
    ListDiseaseSymptomComponent,
    DeleteDiseaseSymptomComponent,
    CreateDiseaseSymptomComponent,
  ]
})
export class DiseaseSymptomModule { 
}


