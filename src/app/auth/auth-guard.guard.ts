import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import * as moment from 'moment'
@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router,
        private snackbar: MatSnackBar,
        private authService: AuthenticationService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.authService.getCurrentUser();
    if (user && user.expiration) {

            if (moment() < moment(user.expiration)) {
                return true;
            } else {
                this.snackbar.open ('Your session has expired');
                this.router.navigate(['login']);
                return false;
            }
        }
      this.router.navigate(['login']);
        return false;
  }

}
