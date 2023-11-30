import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {UserRoutingModule} from '../user/user-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';


const modules = [
  FormsModule,
  ReactiveFormsModule,
  MatTableModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  UserRoutingModule,
  ReactiveFormsModule,
  MatToolbarModule,
  MatDialogModule,
  MatGridListModule,
  MatButtonModule,
  MatListModule
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modules
  ],
  exports: [modules]
})
export class SharedModule { }
