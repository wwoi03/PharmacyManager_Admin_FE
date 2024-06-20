import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductIndexComponent } from './product-index/product-index.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [{
  path: '',
  component: ProductComponent,
  children: [
    {
      path: 'product-index',
      component: ProductIndexComponent,
    },
    {
      path: 'product-list',
      component: ProductListComponent,
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
    ProductIndexComponent,
    ProductListComponent,
];