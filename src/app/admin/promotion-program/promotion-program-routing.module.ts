import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromotionProgramComponent } from './promotion-program.component';
import { ListPromotionProgramComponent } from './list-promotion-program/list-promotion-program.component';
import { CreatePromotionProgramComponent } from './create-promotion-program/create-promotion-program.component';
import { DeletePromotionProgramComponent } from './delete-promotion-program/delete-promotion-program.component';

const routes: Routes = [
  {
    path: 'promotion-program',
    component: PromotionProgramComponent,
    children: [
      { path: 'promotion-program-list', component: ListPromotionProgramComponent },
      {path: 'promotion-program-create', component: CreatePromotionProgramComponent},
      {path: 'promotion-delete/:id', component: DeletePromotionProgramComponent},
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionProgramRoutingModule { }

export const routedComponents = [
  ListPromotionProgramComponent,
  CreatePromotionProgramComponent,
  DeletePromotionProgramComponent,
];
