import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/services/users.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { User } from '../shared/models/user';
import { MessageService } from '../shared/services/message.service';
import { forkJoin } from 'rxjs';
import { UserAccessRights } from '../shared/models/user-access-rights';

@Component({
  selector: 'esb-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  public users: Array<User>;
  public form: FormGroup;
  public userAccessRights: Array<UserAccessRights> = [];

  private userRow: Array<{ expanded: boolean }>;
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
      this.userRow = this.users.map(() => ({ expanded: false }));
      for (const user of users) {
        this.usersCtrl.push(this.createUserGroup(user));
      }
    });
  }

  public getRowClass(i: number) {
    return { 'is-expanded': this.userRow[i].expanded  };
  }

  public isRowVisible(i: number) {
    return this.userRow[i].expanded;
  }

  public cancel(i: number) {
    this.userRow[i].expanded = false;
  }

  public deleteUser(i: number) {
    const cn = this.usersCtrl.controls[i].get('cn').value;
    this.usersService.deleteUser(cn).subscribe(() => {
      this.users.splice(i, 1);
      this.usersCtrl.removeAt(i);
      this.messageService.text(`Пользователь ${cn} удален`);
    });
  }

  public onSubmit(i: number) {
    const group = this.usersCtrl.controls[i];
    const { cn, sn, email, password } = (group as FormGroup).getRawValue();

    const obs$ = [];

    if (password) {
      obs$.push(
        this.usersService.changePassword(cn, password)
      );
    }

    if (sn !== this.users[i].sn || email !== this.users[i].email) {
      obs$.push(
        this.usersService.updateUser({
          ...this.users[i],
          sn,
          email
        })
      );
    }

    forkJoin(obs$).subscribe(() => {
      this.messageService.text(`Информация о пользователе ${cn} обновлена`);
      this.userRow[i].expanded = false;
    });
  }

  public expand(i) {
    this.userRow[i].expanded = true;
    const cn = this.usersCtrl.controls[i].get('cn').value;
    this.usersService.getAccessRights(cn).subscribe((resp) => {
      this.userAccessRights[i] = resp;
    });
  }

  private createUserGroup(user: User): FormGroup {
    return this.fb.group({
      cn: { value: user.cn, disabled: true},
      sn: user.sn,
      email: user.email,
      password: ''
    });
  }

}
