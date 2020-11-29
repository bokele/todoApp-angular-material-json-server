import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as moment from 'moment'
import { User } from '../interface/user';

import { Observable } from 'rxjs/internal/Observable';


let users = JSON.parse(localStorage.getItem('users')) || [];
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
private apiServer = "http://localhost:3000";



  constructor(private httpClient: HttpClient) {

    }

  httpOptions = {
    headers: new HttpHeaders ({
      'Content-Type': 'application/json'
    })
   }



  login(email: string, password: string) {

     const user = users.find(x => x.email === email && x.password === password);
    if (!user) {
      console.log('Username or password is incorrect');
      return ({
        reponse: false,
        message: 'Username or password is incorrect'
      })
    } else {
      user['expiration'] = moment().add(1, 'days').toDate()
            localStorage.setItem('currentUser', JSON.stringify(user))
            return ({
                id: user.id,
                username: user.username,
                email: user.email,
                emaexpirationil: user.expiration,
                token: 'fake-jwt-token'
            })
    }






    }



    logout(): void {
        // clear token remove user from local storage to log user out
      localStorage.removeItem('currentUser');

    }

    getCurrentUser(): any {
        // TODO: Enable after implementation
        return JSON.parse(localStorage.getItem('currentUser'));

    }
  getAllUser(): Observable<User[]> {

    return this.httpClient.get<User[]>(this.apiServer + '/users')
  }


}

