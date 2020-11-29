import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
  loading: boolean;
   isLogin = false;
  constructor(public snackbar :  MatSnackBar, private router: Router,  private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.logout();
    this.createForm();


  }

  private createForm() {
        const savedUserEmail = localStorage.getItem('savedUserEmail');

        this.loginForm = new FormGroup({
            email: new FormControl(savedUserEmail, [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
            rememberMe: new FormControl(savedUserEmail !== null)
        });
    }

   login() {
        const email = this.loginForm.get('email').value;
        const password = this.loginForm.get('password').value;
        const rememberMe = this.loginForm.get('rememberMe').value;

        this.loading = true;
        let resp = this.authenticationService
          .login(email.toLowerCase(), password)

     if (resp.reponse == false) {
       this.loading = false;
       this.snackbar.open(resp.message, 'Error')
     } else {
       if (rememberMe) {
                        localStorage.setItem('savedUserEmail', email);
                    } else {
                        localStorage.removeItem('savedUserEmail');
       }
        this.isLogin = true;
        this.router.navigate(['/']);
     }

    }



}
