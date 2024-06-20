import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { StaffRoutingModule, routedComponents } from './staff-routing.module';

@NgModule({
  imports: [
    NbCardModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    StaffRoutingModule
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class StaffModule { }
