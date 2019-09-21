import { Component, OnInit, ElementRef } from '@angular/core';
import { MDCRipple } from '@material/ripple';

@Component({
  selector: 'esb-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {


  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {

    const ripple = new MDCRipple(this.el.nativeElement.querySelector('.mdc-button'));
  }

}
