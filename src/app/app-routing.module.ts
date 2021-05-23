import {NgModule} from '@angular/core';
import {PreloadingStrategy, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import {CartComponent} from './components/cart/cart.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ContactComponent } from './components/contact/contact.component';
import {HomeComponent} from './components/home/home.component';
import {OrderComponent} from './components/order/order.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {ProfileComponent} from './components/profile/profile.component';
import { UserAuthGuard } from './guards/user-auth.guard';
import { CartResolverService } from './resolvers/cart-resolver.service';
import { CategoryResolverService } from './resolvers/category-resolver.service';
import { ProductResolverService } from './resolvers/product-resolver.service';
import { ProfileResolverService } from './resolvers/profile-resolver.service';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "profile",
        component: ProfileComponent,
        resolve:{
          profile: ProfileResolverService
        },
        canActivate:[UserAuthGuard]
    }, {
        path: "orders",
        component: OrderComponent,
        canActivate:[UserAuthGuard]
    }, {
        path: "cart",
        component: CartComponent,
        resolve:{
        cart: CartResolverService
        },
        canActivate:[UserAuthGuard]
    }, {
        path: "auth",
        children: [

            {
                path: "login",
                component: LoginComponent
            },
            {
              path:"register",
              component:RegisterComponent
            }
        ]
    },
    {
      path:"products",
      component:ProductListComponent,
      resolve:{
        product: ProductResolverService
        }
    },
    {
      path:"products/:id",
      component:ProductDetailsComponent
    },
    {
      path:"categories",
      component:CategoryListComponent,
      resolve:{
        categories: CategoryResolverService
        }
    },
    {
      path:"categories/:id",
      component:CategoryDetailsComponent
    }, 
    //this module will be loaded only if the user navigates to it
      {
        path: "admin",
        canActivate:[UserAuthGuard],
        loadChildren: () => import('./admin/admin.module').then(a => a.AdminModule)
      },
      {
        path: "contact",
        component:ContactComponent
      },
      {
        path: "**",
        component:PageNotFoundComponent
      }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
