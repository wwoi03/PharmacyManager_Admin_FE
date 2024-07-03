import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './category.component';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [{
  path: '',
  component: CategoryComponent,
  children: [
    {
      path: 'category-list',
      component: CategoryListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }

export const routedComponents = [
  CategoryComponent,
  CategoryListComponent
];