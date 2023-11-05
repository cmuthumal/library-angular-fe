import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/services/data.service';
import { Book } from '../../shared/interfaces/interfaces';

const BOOK_DATA: Book[] = [];

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  displayedColumns: string[] = ['name', 'isbn'];
  dataSource = new MatTableDataSource<Book>(BOOK_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  length: number = 0;
  pageSizeOptions = [5, 10, 25];
  pageSize: number = this.pageSizeOptions[0];
  pageIndex: number = 1;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAllBooks(this.pageIndex, this.pageSize);
  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.getAllBooks(this.pageIndex + 1, this.pageSize);
  }

  getAllBooks(pageIndex: number, pageSize: number) {
    this.dataService.getAllBooks(pageIndex, pageSize).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource<Book>(res.results);
      this.length = res.length;
      this.pageIndex = res.page - 1;
    });
  }

  addBook() {
    console.log('addBook()');
  }
}
