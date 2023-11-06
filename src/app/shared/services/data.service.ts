import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Author, Book } from '../interfaces/interfaces';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllBooks(page: number, limit: number) {
    return this.http.get(this.baseURL + '/books?page=' + page + '&limit=' + limit);
  }

  getBookById(id: string) {
    return this.http.get(this.baseURL + '/book/' + id);
  }

  addBook(book: Book) {
    const url = this.baseURL + "/book";
    return this.http.post(url, book).pipe(retry(1), catchError(this.handleError));
  }

  updateBook(book: Book) {
    const url = this.baseURL + "/book/" + book._id;
    return this.http.put(url, book).pipe(retry(1), catchError(this.handleError));
  }

  getAllAuthors() {
    return this.http.get(this.baseURL + '/authors');
  }

  getAuthorById(id: string) {
    return this.http.get(this.baseURL + '/author/' + id);
  }

  addAuthor(author: Author) {
    const url = this.baseURL + "/author";
    return this.http.post(url, author).pipe(retry(1), catchError(this.handleError));
  }

  updateAuthor(author: Author) {
    const url = this.baseURL + "/author/" + author._id;
    return this.http.put(url, author).pipe(retry(1), catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      console.error(err.error.message);
    } else {
      console.error('Backend error:', err.status, err.error);
    }

    return throwError('Error occured. Please try again later.');
  }
}
