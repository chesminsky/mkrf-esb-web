import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/services/users.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../shared/models/user';

interface UserRow extends User {
  exoanded?: boolean;
}

@Component({
  selector: 'esb-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  public users: Array<UserRow>;
  private form: FormGroup;

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({

    });

    this.usersService.getUsers().subscribe((users) => this.users = users);
  }

}
