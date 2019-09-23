import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'esb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public error: number;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  public get errorMessage() {
    const errors = {
      403: 'Неверное имя пользователя или пароль'
    };
    const def = 'Что-то пошло не так...';
    return errors[this.error] || def;
  }

  public ngOnInit() {
    this.form = this.fb.group({
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required)
    });
  }

  public onSubmit() {
    if (this.form.invalid) {
      this.error = 403;
      return;
    }

    this.error = null;
    this.authService.login(this.form.value).subscribe(() => {
      this.router.navigate(['']);
    }, (err) => {
      this.error = err.status;
    });
  }

}
