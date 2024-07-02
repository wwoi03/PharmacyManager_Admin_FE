import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { DiseaseRoutingModule, routedComponents } from './disease-routing.module';
import { RouterModule } from '@angular/router';
import { DiseaseComponent } from './disease.component';

@NgModule({
  
  imports: [
    RouterModule.forRoot([]),
    NbCardModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,

    DiseaseRoutingModule,
  ],
  
  declarations: [...routedComponents],

})
export class DiseaseModule { }
