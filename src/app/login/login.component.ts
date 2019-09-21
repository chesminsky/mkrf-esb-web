import { Component, OnInit } from '@angular/core';
import { MDCTextField } from '@material/textfield';

@Component({
  selector: 'esb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const textField = new MDCTextField(document.querySelector('.mdc-text-field'));
  }

}
