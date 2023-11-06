import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/services/data.service';
import { Author, Book } from '../../shared/interfaces/interfaces';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BookFormComponent } from '../book-form/book-form.component';

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
  allAuthors: any;
  booksList!: Book[];

  constructor(private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAllBooks(this.pageIndex, this.pageSize);
    this.getAllAuthors();
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
      this.booksList = res;
    });
  }

  getAllAuthors() {
    this.dataService.getAllAuthors().subscribe((res: any) => {
      this.allAuthors = res;
    });
  }

  getDialogConfig() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "800px";
    dialogConfig.height = "420px";
    return dialogConfig;
  }

  addBook() {
    const dialogConfig = this.getDialogConfig();
    dialogConfig.data = {
      mode: 'add',
      book: null,
      authors: this.allAuthors
    };
    const dialogRef = this.dialog.open(BookFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data && data.name && data.isbn && data.author) {
        this.dataService.addBook(data).subscribe(res => {
          this.getAllBooks(this.pageIndex + 1, this.pageSize);
        });
      }
    });
  }

  openViewBookModal(row: Book) {
    const dialogConfig = this.getDialogConfig();

    this.dataService.getBookById(row._id).subscribe((res: any) => {
      dialogConfig.data = {
        mode: 'view',
        book: res,
        authors: this.allAuthors
      };
      const dialogRef = this.dialog.open(BookFormComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(data => {
        if (data && data._id) {
          this.updateBook(data);
        }
      });
    });
  }

  updateBook(book: Book) {
    this.dataService.updateBook(book).subscribe(res => {
      this.getAllBooks(this.pageIndex + 1, this.pageSize);
    });
  }
}
