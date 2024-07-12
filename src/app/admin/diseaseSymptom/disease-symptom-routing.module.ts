import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDiseaseSymptomComponent } from './list-disease-symptom/list-disease-symptom.component';
import { DeleteDiseaseSymptomComponent } from './delete-disease-symptom/delete-disease-symptom.component';
import { CreateDiseaseSymptomComponent } from './create-disease-symptom/create-disease-symptom.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiseaseSymptomRoutingModule { }

export const routedDiseaseSymptomComponents = [
  ListDiseaseSymptomComponent,
  DeleteDiseaseSymptomComponent,
  CreateDiseaseSymptomComponent,
];
