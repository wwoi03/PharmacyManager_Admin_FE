import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';

const routes: Routes = [{
  path: '',
  component: ProductComponent,
  children: [
    {
      path: 'product-list',
      component: ProductListComponent,
    },
    {
      path: 'product-create',
      component: ProductCreateComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ProductRoutingModule {
}

export const routedComponents = [
    ProductComponent,
    ProductListComponent,
    ProductCreateComponent,
];