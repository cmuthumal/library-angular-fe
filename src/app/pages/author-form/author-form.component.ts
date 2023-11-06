import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Author } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent {

  @ViewChild('first_name')
  firstNameInput!: ElementRef;
  form!: FormGroup;
  author: Author = <Author>{};
  mode!: string;
  editableForm = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AuthorFormComponent>
  ) {
    this.mode = data.mode;
    this.mode == 'add' ? this.editableForm = true : this.editableForm = false;
    if (data.author) {
      this.author = data.author;
    }

    this.setupForm();
  }

  setupForm() {
    this.form = this.formBuilder.group({
      first_name: new FormControl(this.author.first_name, [Validators.required]),
      last_name: new FormControl(this.author.last_name, [Validators.required])
    });
  }

  submit() {
    if (this.form.valid) {
      this.author.first_name = this.form.value.first_name;
      this.author.last_name = this.form.value.last_name;
      this.dialogRef.close(this.author);
    }
  }

  makeFormEditable(val: boolean) {
    this.editableForm = val;
    this.firstNameInput.nativeElement.focus();
  }

  resetForm() {
    this.setupForm();
    this.makeFormEditable(false);
  }

  checkFormFieldValidity(fieldName: string) {
    return this.form.controls[fieldName].invalid && (this.form.controls[fieldName].dirty || this.form.controls[fieldName].touched);
  }
}
