import { NgModule } from '@angular/core';

import { AdminPublicRoutingModule, routedComponents } from './admin-public-routing.module';
import { RouterModule } from '@angular/router';
import { ThemeModule } from '../@theme/theme.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    ThemeModule,
    AdminPublicRoutingModule,
    RouterModule,
    FormsModule
  ]
})
export class AdminPublicModule {
  
 }
