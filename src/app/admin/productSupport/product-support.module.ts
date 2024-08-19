import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductSupportRoutingModule } from './product-support-routing.module';
import { ListProductSupportComponent } from './list-product-support/list-product-support.component';
import { CreateProductSupportComponent } from './create-product-support/create-product-support.component';
import { DeleteProductSupportComponent } from './delete-product-support/delete-product-support.component';
import { NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ListProductSupportComponent,
    CreateProductSupportComponent,
    DeleteProductSupportComponent
  ],
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
    
    ProductSupportRoutingModule,
  ],
  exports:[
    ListProductSupportComponent,
    DeleteProductSupportComponent,
    CreateProductSupportComponent,
  ]
})
export class ProductSupportModule { }
