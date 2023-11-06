import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToastComponent } from './components/toast/toast.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule
  ],
  exports: [
    HeaderComponent,
    SpinnerComponent,
    ToastComponent
  ],
  providers: [
    DataService
  ]
})
export class SharedModule { }
