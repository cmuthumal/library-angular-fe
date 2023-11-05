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
}
