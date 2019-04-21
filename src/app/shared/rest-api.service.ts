import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Board } from '../shared/board';
import { Task } from '../shared/task';
import { Tag } from '../shared/tag';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {

  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 
  
  // HttpClient API get() method => Fetch board list
  getBoards(): Observable<Board> {
    return this.http.get<Board>(this.apiURL + '/boards')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API post() method => Create board
  createBoard(board): Observable<Board> {
    return this.http.post<Board>(this.apiURL + '/boards', JSON.stringify(board), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  } 

  getTaskList(id_board, type): Observable<Board> {
    return this.http.get<Board>(this.apiURL + '/tasks?id_board='+ id_board +'&status='+ type)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  createTask(task): Observable<Task> {
    return this.http.post<Task>(this.apiURL + '/tasks', JSON.stringify(task), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  } 

  getTask(id): Observable<Task> {
    return this.http.get<Task>(this.apiURL + '/tasks/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  } 

  updateTask(id, task): Observable<Task> {
    return this.http.put<Task>(this.apiURL + '/tasks/' + id, JSON.stringify(task), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  createTag(tag): Observable<Tag> {
    return this.http.post<Tag>(this.apiURL + '/tags', JSON.stringify(tag), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }   

  getTagList(id_task): Observable<Tag> {
    return this.http.get<Tag>(this.apiURL + '/tags?id_tarea='+ id_task)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteTag(id_tag){
    return this.http.delete<Tag>(this.apiURL + '/tags/' + id_tag, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteTask(id_task){
    return this.http.delete<Task>(this.apiURL + '/tasks/' + id_task, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

   // Error handling 
   handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
