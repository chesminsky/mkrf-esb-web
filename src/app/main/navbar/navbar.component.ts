import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MDCList } from '@material/list';
import { MDCRipple } from '@material/ripple';

@Component({
  selector: 'esb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    const list = new MDCList(document.querySelector('.mdc-list'));
    const listItemRipples = list.listElements.map((listItemEl) => new MDCRipple(listItemEl));
  }

}
