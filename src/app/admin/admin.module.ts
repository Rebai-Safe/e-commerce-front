import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';




@NgModule({
  declarations: [
    ManageCategoriesComponent,
    DashboardComponent,
    ManageUsersComponent,
    ManageOrdersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
