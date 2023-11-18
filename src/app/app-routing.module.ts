import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { ListProductComponent } from './list-product/list-product.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import {ProductResolverService} from './services/product-resolver.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data:{roles:['Admin']}},
  {path: 'user', component:UserComponent,canActivate: [AuthGuard], data:{roles:['User']}},
  {path: 'product/list', component: ListProductComponent},
  {path: 'product/add', component: AddProductComponent, canActivate: [AuthGuard], data:{roles:['Admin']},
    resolve: {
      product: ProductResolverService
    }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
