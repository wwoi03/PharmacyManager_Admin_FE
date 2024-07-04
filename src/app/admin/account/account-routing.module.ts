import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [{
  path: '',
  component: AccountComponent,
  children: [
    {
      path: 'profile',
      component: ProfileComponent
    },
    {
      path: 'sign-in',
      component: SignInComponent
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }

export const routedComponents = [
  AccountComponent,
  ProfileComponent,
  SignInComponent
];