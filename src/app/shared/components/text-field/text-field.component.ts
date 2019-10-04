import { Component, OnInit, ElementRef, Input, forwardRef, AfterViewInit } from '@angular/core';
import { MDCTextField } from '@material/textfield';
import { MDCTextFieldIcon } from '@material/textfield/icon';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'esb-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements AfterViewInit, ControlValueAccessor {

  @Input()
  public placeholder: string;
  @Input()
  public type = 'text';
  @Input()
  public required = false;
  @Input()
  public disabled = false;
  @Input()
  public canShowPassword = false;

  private val = '';
  private field: MDCTextField;
  private propagateChange: any = () => { };

  constructor(
    private el: ElementRef,
    public ngControl: NgControl
  ) {
    ngControl.valueAccessor = this;
  }

  get value() {
    return this.val;
  }

  @Input()
  set value(val) {
    this.val = val || '';
    this.propagateChange(val);
  }

  ngAfterViewInit() {
    this.field = new MDCTextField(this.el.nativeElement.querySelector('.mdc-text-field'));
    const iconEl = this.el.nativeElement.querySelector('.mdc-text-field-icon');
    if (iconEl) {
      const icon = new MDCTextFieldIcon(iconEl);
    }

    this.ngControl.statusChanges.subscribe((status) => {
      console.log(status);
      this.field.valid = status !== 'INVALID';
    });
  }

  writeValue(val) {
    if (val) {
      this.val = val;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  onInput(e) {
    this.value = e.target.value;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

}
