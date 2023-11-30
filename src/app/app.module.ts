import {LOCALE_ID, NgModule} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {BrowserModule} from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';

import {HeaderComponent} from './header/header.component';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {AuthInterceptor} from './auth/interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule,} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {DragDirective} from './directives/drag.directive';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {RegisterUserComponent} from './register-user/register-user.component';
import { SpinnerComponent } from './spinner/spinner.component';
import {SharedModule} from './shared/shared.module';
//https://www.youtube.com/watch?v=Zyxvm3v-_d8&list=PLZTETldyguF2bRz-ypCa3a8gumxeXB4pu&index=47

registerLocaleData(localeFr);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ForbiddenComponent,
    LoginComponent,
    DragDirective,
    ProductDetailsComponent,
    RegisterUserComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    SharedModule,

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
