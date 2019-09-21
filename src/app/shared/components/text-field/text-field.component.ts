import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { MDCTextField } from '@material/textfield';

@Component({
  selector: 'esb-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit {

  @Input()
  public placeholder: string;
  private field: MDCTextField;

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.field = new MDCTextField(this.el.nativeElement.querySelector('.mdc-text-field'));
  }

}
