import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {Todo} from '../interface/todo'

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  private apiServer = "http://localhost:3000";


   constructor(private httpClient: HttpClient) { }
   httpOptions = {
    headers: new HttpHeaders ({
      'Content-Type': 'application/json'
    })
   }

   create(todo): Observable<Todo> {
    return this.httpClient.post<Todo>(this.apiServer + '/todoLists/', JSON.stringify(todo), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
   }

  getById(id): Observable<Todo> {
    return this.httpClient.get<Todo>(this.apiServer + '/todoLists/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

   getAll(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.apiServer + '/todoLists/')
    .pipe(
      catchError(this.errorHandler)
    )
   }

  update(id, todo): Observable<Todo> {
    return this.httpClient.put<Todo>(this.apiServer + '/todoLists/' + id, JSON.stringify(todo), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id) {
     console.log('delete')
    return this.httpClient.delete<Todo>(this.apiServer + '/todoLists/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
   }

  errorHandler(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }


}
