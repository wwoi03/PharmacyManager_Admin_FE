import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NbAuthComponent } from '@nebular/auth';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent, 
    children: [
      {
        path: 'login',
        component: LoginComponent, // <---
      },
    ],
  },
  {
    path: 'auth',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }