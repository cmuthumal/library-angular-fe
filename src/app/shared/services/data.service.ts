import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllBooks(page: number, limit: number) {
    return this.http.get(this.url + '/books?page=' + page + '&limit=' + limit);
  }

  getBookById(id: string) {
    return this.http.get(this.url + '/book/' + id);
  }

  addBook() {
    //
  }

  updateBook() {
    //
  }

  getAllAuthors() {
    return this.http.get(this.url + '/authors');
  }

  getAuthorById(id: string) {
    return this.http.get(this.url + '/author/' + id);
  }

  addAuthor() {
    //
  }

  updateAuthor() {
    //
  }
}
