import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/services/users.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { User } from '../shared/models/user';
import { MessageService } from '../shared/services/message.service';

interface UserRow extends User {
  expanded?: boolean;
}

@Component({
  selector: 'esb-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  public users: Array<UserRow>;
  public form: FormGroup;
  private usersCtrl: FormArray;

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.usersCtrl = this.fb.array([]);
    this.form = this.fb.group({
      users: this.usersCtrl
    });

    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
      for (const user of users) {
        this.usersCtrl.push(this.createUserGroup(user));
      }
    });
  }

  public deleteUser(i: number) {
    const login = this.usersCtrl.controls[i].get('cn').value;
    this.usersService.deleteUser(login).subscribe(() => {
      this.users.splice(i, 1);
      this.usersCtrl.removeAt(i);
      this.messageService.text(`Пользователь ${login} удален`);
    });
  }

  public onSubmit(i: number) {
    const group = this.usersCtrl.controls[i];
    const login = group.get('cn').value;
    const password = group.get('password').value;
    this.usersService.changePassword(login, password).subscribe(() => {
      this.messageService.text(`Информация о пользователе ${login} обновлена`);
      this.users[i].expanded = false;
    });
  }

  private createUserGroup(user: User): FormGroup {
    return this.fb.group({
      cn: this.fb.control({ value: user.cn, disabled: true}),
      email: this.fb.control({ value: user.email, disabled: true}),
      sn: this.fb.control({ value: user.sn, disabled: true}),
      password: ''
    });
  }

}
