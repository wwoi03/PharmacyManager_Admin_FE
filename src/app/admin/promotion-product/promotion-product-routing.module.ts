import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromotionProductComponent } from './promotion-product.component';
import { ListPromotionProductComponent } from './list-promotion-product/list-promotion-product.component';
import { CreatePromotionProductComponent } from './create-promotion-product/create-promotion-product.component';
import { DeletePromotionProductComponent } from './delete-promotion-product/delete-promotion-product.component';

const routes: Routes = [
  {
    path: 'promotion-product',
    component: PromotionProductComponent,
    children: [
      { path: 'promotion-product-list', component: ListPromotionProductComponent },
      {path: 'promotion-product-create', component: CreatePromotionProductComponent},
      // {path: 'promotion-details/:id', component: DetailsPromotionComponent},
      {path: 'promotion-delete/:id', component: DeletePromotionProductComponent},
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionProductRoutingModule { }

export const routedComponents = [
  PromotionProductComponent,
  ListPromotionProductComponent,
  DeletePromotionProductComponent,
  CreatePromotionProductComponent,
];

