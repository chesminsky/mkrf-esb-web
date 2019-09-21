import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'esb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public error = false;

  constructor(
    private fb: FormBuilder
  ) { }

  public ngOnInit() {
    this.form = this.fb.group({
      name: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required)
    });
  }

  public onSubmit() {
    console.log(this.form.value);
    if (this.form.invalid) {
      this.error = true;
      return;
    }

    this.error = false;
  }

}
