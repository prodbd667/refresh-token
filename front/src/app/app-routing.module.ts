import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RandomGuard} from './auth/guards/random.guard';
import {AuthGuard} from './auth/guards/auth.guard';
import {LoginComponent} from './auth/containers/login/login.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'secret-random-number',
    loadChildren: () => import('./random/random.module').then(mod => mod.RandomModule),
    canActivate: [RandomGuard],
    canLoad: [RandomGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
