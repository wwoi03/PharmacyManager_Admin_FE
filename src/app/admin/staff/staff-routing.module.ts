import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StaffComponent } from './staff.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffCreateComponent } from './staff-create/staff-create.component';
import { StaffEditComponent } from './staff-edit/staff-edit.component';

const routes: Routes = [{
  path: '',
  component: StaffComponent,
  children: [
    {
      path: 'staff-list',
      component: StaffListComponent,
    },
    {
      path: 'staff-create',
      component: StaffCreateComponent,
    },
    {
      path: 'staff-edit/:id',
      component: StaffEditComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class StaffRoutingModule {
}

export const routedComponents = [
    StaffComponent,
    StaffListComponent,
    StaffCreateComponent,
    StaffEditComponent,
];