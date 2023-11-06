import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';

import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';
import { BookFormComponent } from './book-form/book-form.component';
import { AuthorFormComponent } from './author-form/author-form.component';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  declarations: [
    BooksComponent,
    AuthorsComponent,
    BookFormComponent,
    AuthorFormComponent
  ],
})
export class PagesModule { }
