import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Todo } from '../interface/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl = environment.url + 'todo';

  constructor(private http: HttpClient) { }

  delete(id: string): Observable<Todo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Todo>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<Todo>('delete'))
      );
  }

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<Todo[]>('getAll', []))
      );
  }

  getById(id: string): Observable<Todo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Todo>(url)
      .pipe(
        catchError(this.handleError<Todo>('getById'))
      );
  }

  save(todo: any): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo, this.httpOptions)
      .pipe(
        catchError(this.handleError<Todo>('create'))
      );
  }

  update(id: string, todo: any): Observable<Todo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Todo>(url, todo, this.httpOptions)
      .pipe(
        catchError(this.handleError<Todo>('update'))
      );
  }

  

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}