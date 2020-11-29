import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: '', component: AppComponent,
    children: [
      { path: '', loadChildren: './home/home.module#HomeModule' }

    ],
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
