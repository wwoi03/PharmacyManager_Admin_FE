import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StaffComponent } from './staff.component';
import { StaffListComponent } from './staff-list/staff-list.component';

const routes: Routes = [{
  path: '',
  component: StaffComponent,
  children: [
    {
      path: 'staff-list',
      component: StaffListComponent,
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
];