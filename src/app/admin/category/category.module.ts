import { NgModule } from '@angular/core';
import { NbAccordionModule, NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbListModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { CategoryRoutingModule, routedComponents } from './category-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { FsIconComponent } from './category-list/category-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ...routedComponents,
    FsIconComponent,
  ],
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbActionsModule,
    NbButtonModule,
    NbCheckboxModule,
    FormsModule,
    NbListModule,
    NbAccordionModule,

    CategoryRoutingModule,
  ]
})
export class CategoryModule { }
