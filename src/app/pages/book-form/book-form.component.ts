import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Author, Book, BookWithAuthor } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent {

  @ViewChild('name')
  firstNameInput!: ElementRef;
  form!: FormGroup;
  book: Book = <Book>{};
  bookWithAuthor: BookWithAuthor = <BookWithAuthor>{};
  mode!: string;
  editableForm = false;
  allAuthors: any;
  authorsDropdownData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<BookFormComponent>
  ) {
    this.mode = data.mode;
    this.mode == 'add' ? this.editableForm = true : this.editableForm = false;
    if (data.book) {
      this.bookWithAuthor = data.book;
    }
    this.allAuthors = data.authors;

    this.setDropdownData();
    if (this.mode == 'view') {
      this.setupFormForView();
    } else {
      this.setupFormForEdit();
    }
  }

  setDropdownData() {
    this.authorsDropdownData = [];

    this.allAuthors.forEach((author: Author) => {
      this.authorsDropdownData.push({
        name: author.first_name + ' ' + author.last_name,
        id: author._id
      });
    });
  }

  setupFormForView() {
    this.form = this.formBuilder.group({
      name: new FormControl(this.bookWithAuthor.name, [Validators.required]),
      isbn: new FormControl(this.bookWithAuthor.isbn, [Validators.required]),
      author: new FormControl(this.bookWithAuthor.author._id, [Validators.required])
    });
  }

  setupFormForEdit() {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      isbn: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required])
    });
  }

  submit() {
    if (this.form.valid) {
      // send a book object from here
      this.bookWithAuthor.name = this.form.value.name;
      this.bookWithAuthor.isbn = this.form.value.isbn;
      this.bookWithAuthor.author = this.form.value.author;
      this.dialogRef.close(this.bookWithAuthor);
    }
  }

  makeFormEditable(val: boolean) {
    this.editableForm = val;
    this.firstNameInput.nativeElement.focus();
  }

  resetForm() {
    this.setupFormForView();
    this.makeFormEditable(false);
  }

  checkFormFieldValidity(fieldName: string) {
    return this.form.controls[fieldName].invalid && (this.form.controls[fieldName].dirty || this.form.controls[fieldName].touched);
  }
}
