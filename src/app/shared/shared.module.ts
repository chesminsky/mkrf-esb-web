import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PaginationPipe } from './components/pagination/pagination.pipe';
import { DialogComponent } from './components/dialog/dialog.component';
import { SpinnerComponent } from './components/spinner/spinner.component';


@NgModule({
  declarations: [
    TextFieldComponent,
    ButtonComponent,
    CheckboxComponent,
    SnackbarComponent,
    PaginationComponent,
    PaginationPipe,
    DialogComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TextFieldComponent,
    ButtonComponent,
    CheckboxComponent,
    SnackbarComponent,
    PaginationComponent,
    PaginationPipe,
    DialogComponent,
    SpinnerComponent
  ],
  entryComponents: [

  ]
})
export class SharedModule { }
