import { Component, ElementRef, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'esb-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CheckboxComponent),
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {

  @Input()
  public label: string;
  @Input()
  public name: string;
  @Input()
  public required = false;
  @Input()
  public disabled = false;

  private val = false;

  private propagateChange: any = () => {};

  constructor(
    private el: ElementRef
  ) { }

  get value() {
    return this.val;
  }

  @Input()
  set value(val) {
    this.val = val;
    this.propagateChange(val);
  }

  writeValue(val) {
    if (val) {
      this.val = val;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  onChange(e) {
    this.value = e.target.checked;
  }

}
