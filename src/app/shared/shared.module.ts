import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToastComponent } from './components/toast/toast.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    ToastComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    SpinnerComponent,
    ToastComponent
  ]
})
export class SharedModule { }
