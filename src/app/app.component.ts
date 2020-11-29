import { Component, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import * as moment from 'moment'
import { User } from './interface/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todoApp';
  opened = true;
  isLogin = false;

  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav ;
constructor(private httpClient: HttpClient , private router: Router, private authenticationService: AuthenticationService, ) { }


  ngOnInit() {
     this.authenticationService.getAllUser().subscribe((data: User[])=>{
        localStorage.setItem('users', JSON.stringify(data))
    })
     let user = this.authenticationService.getCurrentUser()

    if (user && user.expiration) {
      if (moment() < moment(user.expiration)) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    }
    console.log(this.isLogin)
    console.log(window.innerWidth)
      if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }


  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55
      this.opened = true;
    }
    }
  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
     this.isLogin = false;
    this.authenticationService.logout()
     this.router.navigate(['login'])
  }

  getUser() {

  }
}
