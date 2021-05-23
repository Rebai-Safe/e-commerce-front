import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { CategoryResolverService } from '../resolvers/category-resolver.service';
import { UserResolverService } from '../resolvers/user-resolver.service';
import { AdminAuthGuard } from '../guards/admin-auth.guard';


const routes: Routes = [
  {
      path: "",
      children:[ 
          {
              path: "dashboard",
              component: DashboardComponent,
              canActivate:[AdminAuthGuard]
          },
          {
            path: "management",
            canActivate:[AdminAuthGuard],
            children:[ 
            {
                path: "manage-categories",
                component: ManageCategoriesComponent,
                resolve:{
                  categories: CategoryResolverService
                  }
            },
            {
              path: "manage-users",
              component: ManageUsersComponent,
              resolve: {
                allUsers: UserResolverService
              }
            },
      ]
  },
]
 }
]

/**
 * forRoute is used for the main routing module
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
   
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
