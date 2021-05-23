import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { ContactComponent } from './components/contact/contact.component';
import { OrderComponent } from './components/order/order.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { ApplicationErrorComponent } from './shared/application-error/application-error.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ResourceNotFoundComponent } from './shared/resource-not-found/resource-not-found.component';
import { AdminModule } from './admin/admin.module';
import { MaterialModule } from './shared/material/material.module';
import { NgxModuleModule } from './shared/ngx-module/ngx-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilesModule } from './shared/files/files.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/auth/token-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { ProfileComponent } from './components/profile/profile.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { MatSelectCountryModule } from "@angular-material-extensions/select-country";
import { AlertDialogComponent } from './shared/components/alert-dialog/alert-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CategoryListComponent,
    CategoryDetailsComponent,
    ContactComponent,
    OrderComponent,
    ProductListComponent,
    ProductDetailsComponent,
  
    ApplicationErrorComponent,
    PageNotFoundComponent,
    ResourceNotFoundComponent,
    ProfileComponent,
    CartComponent,
    AlertDialogComponent,
   
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    NgxModuleModule,
    HttpClientModule,
    AdminRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    FilesModule,
    ReactiveFormsModule,
    MatSelectCountryModule.forRoot('fr'),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
