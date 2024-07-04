import { NgModule } from '@angular/core';

import { AdminPublicRoutingModule, routedComponents } from './admin-public-routing.module';
import { RouterModule } from '@angular/router';
import { ThemeModule } from '../@theme/theme.module';

@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    ThemeModule,
    AdminPublicRoutingModule,
    RouterModule,
  ]
})
export class AdminPublicModule {
  
 }
