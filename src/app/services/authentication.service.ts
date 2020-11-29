import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import * as moment from 'moment'

import { environment } from '../../environments/environment';
import { of, EMPTY } from 'rxjs';
import { User } from '../interface/user';

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
    return this.httpClient.post<User>(this.apiServer + '/users/', { email, password })
      .pipe(map(user => {
        user['expiration'] = moment().add(1, 'days').toDate()
        localStorage.setItem('currentUser', JSON.stringify(user ));

        return user;
    }))



    }

    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    getCurrentUser(): any {
        // TODO: Enable after implementation
        return JSON.parse(localStorage.getItem('currentUser'));

    }


}

