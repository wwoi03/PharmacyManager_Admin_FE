import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SymptomComponent } from './symptom.component';
import { SymptomListComponent } from './symptom-list/symptom-list.component';
import { SymptomCreateComponent } from './symptom-create/symptom-create.component';
import { SymptomEditComponent } from './symptom-edit/symptom-edit.component';
import { SymptomDetailsComponent } from './symptom-details/symptom-details.component';

const routes: Routes = [
  {
    path: '',
    component: SymptomComponent,
    children: [
      { path: 'symptom-list', component: SymptomListComponent },
      {path: 'symptom-create', component: SymptomCreateComponent},
      {path: 'symptom-edit/:id', component: SymptomEditComponent },
      {path: 'symptom-details/:id', component: SymptomDetailsComponent},
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SymptomRoutingModule { }


export const routedComponents = [
  SymptomComponent,
  SymptomListComponent,
  SymptomCreateComponent,
  SymptomEditComponent,
  SymptomDetailsComponent,
];

