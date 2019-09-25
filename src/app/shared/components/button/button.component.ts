import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { MDCRipple } from '@material/ripple';

@Component({
  selector: 'esb-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input()
  public type = 'button';
  @Input()
  public styleType;

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
    const ripple = new MDCRipple(this.el.nativeElement.querySelector('.mdc-button'));
  }

}
