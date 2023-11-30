import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule } from './admin-routing.module';
import {AddProductComponent} from './add-product/add-product.component';
import {ProductListComponent} from './product-list/product-list.component';
import {OrdersListComponent} from './orders-list/orders-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ShowProductImagesDialogComponent} from './show-product-images-dialog/show-product-images-dialog.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    AddProductComponent,
    ProductListComponent,
    OrdersListComponent,
    ShowProductImagesDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
