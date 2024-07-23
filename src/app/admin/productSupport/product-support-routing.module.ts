import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductSupportComponent } from './list-product-support/list-product-support.component';
import { DeleteProductSupportComponent } from './delete-product-support/delete-product-support.component';
import { CreateProductSupportComponent } from './create-product-support/create-product-support.component';


const routes: Routes = [
  { path: 'list', component: ListProductSupportComponent },
  { path: 'delete', component: DeleteProductSupportComponent },
  { path: 'create', component: CreateProductSupportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductSupportRoutingModule { }

export const routedProductSupportComponents = [
  ListProductSupportComponent,
  DeleteProductSupportComponent,
  CreateProductSupportComponent,
];