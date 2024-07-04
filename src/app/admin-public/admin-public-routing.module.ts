import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPublicComponent } from './admin-public.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LoginGuard } from '../services/auth/login-guard';

const routes: Routes = [
  {
    path: '',
    component: AdminPublicComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
        canActivate: [LoginGuard]
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPublicRoutingModule { }

export const routedComponents = [
  AdminPublicComponent,
  SignInComponent
];