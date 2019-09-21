import { Component, OnInit, ElementRef, Input, forwardRef, AfterViewInit } from '@angular/core';
import { MDCTextField } from '@material/textfield';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'esb-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TextFieldComponent),
    }
  ]
})
export class TextFieldComponent implements AfterViewInit, ControlValueAccessor {

  @Input()
  public placeholder: string;
  @Input()
  public type = 'text';
  @Input()
  public required = false;

  private value = '';

  private propagateChange: any = () => {};

  constructor(
    private el: ElementRef
  ) { }

  get inputValue() {
    return this.value;
  }

  set inputValue(val) {
    this.value = val;
    this.propagateChange(val);
  }

  ngAfterViewInit() {
    const field = new MDCTextField(this.el.nativeElement.querySelector('.mdc-text-field'));
  }

  writeValue(value) {
    if (value) {
      this.inputValue = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  onInput(e) {
    this.inputValue = e.target.value;
  }

}
