import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './containers/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './guards/auth.guard';
import {AuthService} from './services/auth.service';
import {RandomGuard} from './guards/random.guard';
import {TokenInterceptor} from './token.interceptor';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [LoginComponent],
  providers: [
    AuthGuard,
    AuthService,
    RandomGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthModule {
}
