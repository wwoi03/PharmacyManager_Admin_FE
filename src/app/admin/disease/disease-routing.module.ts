import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DiseaseComponent } from './disease.component';
import { DiseaseListComponent } from './disease-list/disease-list.component';
import { DiseaseIndexComponent } from './disease-index/disease-index.component';
import { DiseaseCreateComponent } from './disease-create/disease-create.component';
import { DiseaseEditComponent } from './disease-edit/disease-edit.component';
import { DiseaseDetailsComponent } from './disease-details/disease-details.component';

const routes: Routes = [
  {
    path: '',
    component: DiseaseComponent,
    children: [
      { path: 'disease-list', component: DiseaseListComponent },
      { path: 'disease-index', component: DiseaseIndexComponent },
      {path: 'disease-create', component: DiseaseCreateComponent},
      {path: 'disease-edit/:id', component: DiseaseEditComponent },
      {path: 'disease-details/:id', component: DiseaseDetailsComponent},
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
  DiseaseIndexComponent,
  DiseaseCreateComponent,
  DiseaseEditComponent,
  DiseaseDetailsComponent,
];
