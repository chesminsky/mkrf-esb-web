import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'esb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public error = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  public ngOnInit() {
    this.form = this.fb.group({
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required)
    });
  }

  public onSubmit() {
    if (this.form.invalid) {
      this.error = true;
      return;
    }

    this.error = false;
    this.authService.login(this.form.value).subscribe();
  }

}
