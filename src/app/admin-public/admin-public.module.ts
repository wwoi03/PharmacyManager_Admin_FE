import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPublicRoutingModule, routedComponents } from './admin-public-routing.module';

@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    AdminPublicRoutingModule
  ]
})
export class AdminPublicModule { }
