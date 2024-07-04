import { NgModule } from '@angular/core';

import { AdminPublicRoutingModule, routedComponents } from './admin-public-routing.module';

@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    AdminPublicRoutingModule,
  ]
})
export class AdminPublicModule { }
