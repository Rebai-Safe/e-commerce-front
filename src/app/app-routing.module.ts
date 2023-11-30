import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from './auth/auth.guard';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';

import {ProductResolverService} from './services/product-resolver.service';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {CheckoutComponent} from './user/checkout/checkout.component';
import {BuyProductResolverService} from './services/buy-product-resolver.service';
import {RegisterUserComponent} from './register-user/register-user.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterUserComponent},
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'productDetails', component: ProductDetailsComponent,
    resolve: {
      product: ProductResolverService
    }
  },
  {path: 'forbidden', component: ForbiddenComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
