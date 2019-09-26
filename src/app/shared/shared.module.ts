import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';


@NgModule({
  declarations: [
    TextFieldComponent,
    ButtonComponent,
    CheckboxComponent,
    SnackbarComponent
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
    SnackbarComponent
  ],
  entryComponents: [

  ]
})
export class SharedModule { }
