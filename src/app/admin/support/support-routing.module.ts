import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportComponent } from './support.component';
import { SupportListComponent } from './support-list/support-list.component';
import { SupportCreateComponent } from './support-create/support-create.component';
import { SupportEditComponent } from './support-edit/support-edit.component';
import { SupportDetailsComponent } from './support-details/support-details.component';
import { SupportDeleteComponent } from './support-delete/support-delete.component';

const routes: Routes = [
  {
    path: '',
    component: SupportComponent,
    children: [
      { path: 'support-list', component: SupportListComponent },
      {path: 'support-create', component: SupportCreateComponent},
      {path: 'support-edit/:id', component: SupportEditComponent },
      {path: 'support-details/:id', component: SupportDetailsComponent},
      {path: 'support-delete/:id', component: SupportDeleteComponent},
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }


export const routedComponents = [
  SupportComponent,
  SupportListComponent,
  SupportCreateComponent,
  SupportEditComponent,
  SupportDetailsComponent,
  SupportDeleteComponent,
];

