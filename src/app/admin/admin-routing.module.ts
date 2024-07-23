import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { DiseaseComponent } from './disease/disease.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'disease',
      loadChildren: ()=> import('./disease/disease.module').then(m => m.DiseaseModule),
    },
    {
      path: 'support',
      loadChildren: ()=> import('./support/support.module').then(m => m.SupportModule),
    },
    {
      path: 'symptom',
      loadChildren: ()=> import('./symptom/symptom.module').then(m => m.SymptomModule),
    },
    {
      path: 'order',
      loadChildren: ()=> import('./order/order.module').then(m => m.OrderModule),
    },
    {
      path: 'product',
      loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
    },
    {
      path: 'category',
      loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
    },
    {
      path: 'staff',
      loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module').then(m => m.MiscellaneousModule),
    },
    {
      path: 'shipment',
      loadChildren: () => import('./shipment/shipment.module').then(m => m.ShipmentModule),
    },
    //phụ
    {
      path: 'disease-symptom',
      loadChildren: () => import('./diseaseSymptom/disease-symptom.module').then(m => m.DiseaseSymptomModule),
    },
    {
      path: 'shipment-details',
      loadChildren: () => import('./shipment-details/shipment-details.module').then(m => m.ShipmentDetailsModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AdminRoutingModule {
}
