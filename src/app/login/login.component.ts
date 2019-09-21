import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'esb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  public ngOnInit() {
    this.form = this.fb.group({
      name: this.fb.control('init'),
      password: this.fb.control('')
    });
  }

  public onSubmit() {
    console.log(this.form.value);
  }

}
