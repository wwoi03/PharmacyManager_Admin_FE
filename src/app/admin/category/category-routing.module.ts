import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryDeleteComponent } from './category-delete/category-delete.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';

const routes: Routes = [{
  path: '',
  component: CategoryComponent,
  children: [
    {
      path: 'category-list',
      component: CategoryListComponent,
    },
    {
       path: 'category-details/:categoryId', 
       component: CategoryDetailsComponent 
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
  CategoryListComponent,
  CategoryCreateComponent,
  CategoryDeleteComponent,
  CategoryEditComponent,
  CategoryDetailsComponent,
];