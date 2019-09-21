import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { ButtonComponent } from './components/button/button.component';


@NgModule({
  declarations: [
    TextFieldComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TextFieldComponent,
    ButtonComponent
  ]
})
export class SharedModule { }
