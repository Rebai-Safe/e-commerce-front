import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrdersListComponent} from './orders-list/orders-list.component';
import {AuthGuard} from '../auth/auth.guard';
import {ProductListComponent} from './product-list/product-list.component';
import {AddProductComponent} from './add-product/add-product.component';
import {ProductResolverService} from '../services/product-resolver.service';

const routes: Routes = [
  {path: 'ordersList', component: OrdersListComponent, canActivate: [AuthGuard], data:{roles:['ADMIN']}},
  {path: 'productsList', component: ProductListComponent, canActivate: [AuthGuard], data:{roles:['ADMIN']}},
  {path: 'addProduct', component: AddProductComponent, canActivate: [AuthGuard], data:{roles:['ADMIN']},
    resolve: {
      product: ProductResolverService
    }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
