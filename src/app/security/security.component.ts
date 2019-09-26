import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/services/users.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../shared/models/user';
import { MessageService } from '../shared/services/message.service';

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
  public form: FormGroup;

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({

    });

    this.usersService.getUsers().subscribe((users) => this.users = users);
  }

  public deleteUser(user: User, i: number) {
    this.usersService.deleteUser(user.cn).subscribe(() => {
      this.users.splice(i, 1);
      this.messageService.text(`Пользователь ${user.cn} удален`);
    });
  }

}
