import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/services/data.service';
import { Author } from '../../shared/interfaces/interfaces';

const AUTHOR_DATA: Author[] = [];

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent {
  displayedColumns: string[] = ['first_name', 'last_name'];
  dataSource = new MatTableDataSource<Author>(AUTHOR_DATA);

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getAllAuthors();
  }

  getAllAuthors() {
    this.dataService.getAllAuthors().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource<Author>(res);
    });
  }

  addAuthor() {
    console.log('addAuthor()');
  }

  getAuthorInfo(row: Author) {
    this.dataService.getAuthorById(row._id).subscribe((res: any) => {
      console.log(res);
    });
  }
}
