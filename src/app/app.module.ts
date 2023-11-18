import {LOCALE_ID, NgModule} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule, } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AddProductComponent } from './add-product/add-product.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { DragDirective } from './directives/drag.directive';
import { ListProductComponent } from './list-product/list-product.component';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { ShowProductImageDialogComponent } from './show-product-image-dialog/show-product-image-dialog.component';
registerLocaleData(localeFr);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    HeaderComponent,
    ForbiddenComponent,
    LoginComponent,
    AddProductComponent,
    DragDirective,

    ListProductComponent,
    ShowProductImageDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatGridListModule,
    MatButtonModule,

  ],
  providers: [AuthGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
