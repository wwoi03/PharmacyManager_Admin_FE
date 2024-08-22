import { NgModule } from '@angular/core';
import { NbDatepickerModule, NbMenuModule, NbSpinnerModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { AdminComponent } from './admin.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AdminRoutingModule } from './admin-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PromotionProductComponent } from './promotion-product/promotion-product.component';
import { PromotionProgramComponent } from './promotion-program/promotion-program.component';

@NgModule({
  imports: [
    AdminRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    NbDatepickerModule.forRoot(),
    MiscellaneousModule,
    NbSpinnerModule
  ],
  declarations: [
    AdminComponent,
    PromotionProgramComponent,
  ],
})

export class AdminModule {
}
