import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductDiseaseComponent } from './list-product-disease/list-product-disease.component';
import { DeleteProductDiseaseComponent } from './delete-product-disease/delete-product-disease.component';
import { CreateProductDiseaseComponent } from './create-product-disease/create-product-disease.component';

const routes: Routes = [
  { path: 'list', component: ListProductDiseaseComponent },
  { path: 'delete', component: DeleteProductDiseaseComponent },
  { path: 'create', component: CreateProductDiseaseComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDiseaseRoutingModule { }

export const routedProductDiseaseComponents = [
  ListProductDiseaseComponent,
  DeleteProductDiseaseComponent,
  CreateProductDiseaseComponent,
];