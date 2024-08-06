import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromotionComponent } from './promotion.component';
import { ListPromotionComponent } from './list-promotion/list-promotion.component';
import { CreatePromotionComponent } from './create-promotion/create-promotion.component';
import { DetailsPromotionComponent } from './details-promotion/details-promotion.component';
import { DeletePromotionComponent } from './delete-promotion/delete-promotion.component';

const routes: Routes = [
  {
    path: '',
    component: PromotionComponent,
    children: [
      { path: 'promotion-list', component: ListPromotionComponent },
      {path: 'promotion-create', component: CreatePromotionComponent},
      {path: 'promotion-details/:id', component: DetailsPromotionComponent},
      {path: 'promotion-delete/:id', component: DeletePromotionComponent},
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionRoutingModule { }

export const routedComponents = [
  PromotionComponent,
  ListPromotionComponent,
  CreatePromotionComponent,
  DetailsPromotionComponent,
  DeletePromotionComponent,
];
