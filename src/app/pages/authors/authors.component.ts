import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/services/data.service';
import { Author } from '../../shared/interfaces/interfaces';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthorFormComponent } from '../author-form/author-form.component';

const AUTHOR_DATA: Author[] = [];

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent {
  displayedColumns: string[] = ['first_name', 'last_name'];
  authorsList!: Author[];
  dataSource = new MatTableDataSource<Author>(AUTHOR_DATA);

  constructor(private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllAuthors();
  }

  getAllAuthors() {
    this.dataService.getAllAuthors().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource<Author>(res);
      this.authorsList = res;
    });
  }

  getDialogConfig() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "800px";
    dialogConfig.height = "350px";
    return dialogConfig;
  }

  addAuthor() {
    const dialogConfig = this.getDialogConfig();
    dialogConfig.data = {
      mode: 'add',
      author: null
    };
    const dialogRef = this.dialog.open(AuthorFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data && data.first_name && data.last_name) {
        this.dataService.addAuthor(data).subscribe(res => {
          this.getAllAuthors();
        });
      }
    });
  }

  openViewAuthorModal(row: Author) {
    const dialogConfig = this.getDialogConfig();

    this.dataService.getAuthorById(row._id).subscribe((res: any) => {
      dialogConfig.data = {
        mode: 'view',
        author: res
      };
      const dialogRef = this.dialog.open(AuthorFormComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(data => {
        if (data && data._id) {
          this.updateAuthor(data);
        }
      });
    });
  }

  updateAuthor(author: Author) {
    this.dataService.updateAuthor(author).subscribe(res => {
      this.getAllAuthors();
    });
  }
}
