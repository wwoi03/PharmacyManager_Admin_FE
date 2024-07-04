import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminPublicComponent } from './admin-public/admin-public.component';
import { SignInComponent } from './admin-public/sign-in/sign-in.component';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'admin-public',
    component: AdminPublicComponent,
    children: [
      {
        path: '',
        component: SignInComponent,
      },
      {
        path: 'sign-in',
        component: SignInComponent,
      },
    ],
  },
  { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'admin/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
