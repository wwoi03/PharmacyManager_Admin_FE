import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DiseaseComponent } from './disease.component';
import { DiseaseListComponent } from './disease-list/disease-list.component';
import { DiseaseCreateComponent } from './disease-create/disease-create.component';
import { DiseaseEditComponent } from './disease-edit/disease-edit.component';
import { DiseaseDetailsComponent } from './disease-details/disease-details.component';
import { DiseaseDeleteComponent } from './disease-delete/disease-delete.component';

const routes: Routes = [
  {
    path: '',
    component: DiseaseComponent,
    children: [
      { path: 'disease-list', component: DiseaseListComponent },
      {path: 'disease-create', component: DiseaseCreateComponent},
      {path: 'disease-edit/:id', component: DiseaseEditComponent },
      {path: 'disease-details/:id', component: DiseaseDetailsComponent},
      {path: 'disease-delete/:id', component: DiseaseDeleteComponent},
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
  DiseaseCreateComponent,
  DiseaseEditComponent,
  DiseaseDetailsComponent,
  DiseaseDeleteComponent,
];
