import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DiseaseComponent } from './disease.component';
import { DiseaseListComponent } from './disease-list/disease-list.component';
import { DiseaseIndexComponent } from './disease-index/disease-index.component';

const routes: Routes = [
  {
    path: '',
    component: DiseaseComponent,
    children: [
      { path: 'disease-list', component: DiseaseListComponent },
      { path: 'disease-index', component: DiseaseIndexComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiseaseRoutingModule { }

export const routedComponents = [
  DiseaseComponent,
  DiseaseListComponent,
  DiseaseIndexComponent
];
