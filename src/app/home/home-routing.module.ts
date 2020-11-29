import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthGuardGuard } from '../auth/auth-guard.guard';
import { HomeComponent } from './home.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardGuard] },
  { path: '', redirectTo : 'home', pathMatch: 'full',canActivate: [AuthGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
