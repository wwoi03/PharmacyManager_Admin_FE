import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { DiseaseRoutingModule, routedComponents } from './disease-routing.module';
import { DiseaseCreateComponent } from './disease-create/disease-create.component';
import { FormsModule } from '@angular/forms';
import { DiseaseEditComponent } from './disease-edit/disease-edit.component';
import { DiseaseDetailsComponent } from './disease-details/disease-details.component';
import { RouterModule } from '@angular/router';


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

    DiseaseRoutingModule,
  ],
  
  declarations: [...routedComponents, DiseaseCreateComponent, DiseaseEditComponent, DiseaseDetailsComponent],

})
export class DiseaseModule { }
