import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { DiseaseRoutingModule, routedComponents } from './disease-routing.module';
import { DiseaseCreateComponent } from './disease-create/disease-create.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  
  imports: [
    NbCardModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    FormsModule,

    DiseaseRoutingModule,
  ],
  
  declarations: [...routedComponents, DiseaseCreateComponent],

})
export class DiseaseModule { }
