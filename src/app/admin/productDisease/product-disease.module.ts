import { NgModule } from '@angular/core';

import { ProductDiseaseRoutingModule, routedProductDiseaseComponents } from './product-disease-routing.module';
import { NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListProductDiseaseComponent } from './list-product-disease/list-product-disease.component';
import { DeleteProductDiseaseComponent } from './delete-product-disease/delete-product-disease.component';
import { CreateProductDiseaseComponent } from './create-product-disease/create-product-disease.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [ ...routedProductDiseaseComponents],

  imports: [
    NbCardModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    FormsModule,
    NbButtonModule,
    RouterModule.forChild([]),
    NbDialogModule.forChild(),
    NgxPaginationModule,

    ProductDiseaseRoutingModule
  ],

  exports:[
    ListProductDiseaseComponent,
    DeleteProductDiseaseComponent,
    CreateProductDiseaseComponent,
  ]
})
export class ProductDiseaseModule { }
