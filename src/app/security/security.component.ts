import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UsersService } from '../shared/services/users.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { User } from '../shared/models/user';
import { MessageService } from '../shared/services/message.service';
import { forkJoin, Subscription, of } from 'rxjs';
import { UserAccessRights, ModuleAccessRight, SystemAccessRight } from '../shared/models/user-access-rights';
import { cloneDeep, isEqual } from 'lodash';
import { GlobalFilterService } from '../shared/services/global-filter..service';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { catchError } from 'rxjs/operators';

interface UserRow {
  expanded?: boolean;
  model: User;
}

@Component({
  selector: 'esb-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit, OnDestroy {

  public users: Array<UserRow>;
  public form: FormGroup;
  public searchTerm: string;
  public addMode: boolean;
  public checkBlocks = [{
    name: 'Администрирование',
    key: 'module'
  }, {
    name: 'Внешние системы',
    key: 'system'
  }];
  public userAccessRights: UserAccessRights;
  private userAccessRightsClone: UserAccessRights;
  private searchSub: Subscription;

  @ViewChild(DialogComponent, { static: true })
  private dialogRef: DialogComponent;

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private globalFilter: GlobalFilterService
  ) { }

  public ngOnInit() {

    let userRows;

    this.usersService.getUsers().subscribe((users) => {
      userRows = users.map((user) => ({ model: user, expanded: false }));
      this.users = [].concat(userRows);
    });

    this.searchSub = this.globalFilter.source$.subscribe((term) => {
      if (term) {
        this.users = userRows.filter((user) => {
          const userModel = user.model;
          return userModel.cn.includes(term) || userModel.sn.includes(term);
        });
      } else {
        this.users = [].concat(userRows);
      }
    });
  }

  public ngOnDestroy() {
    this.searchSub.unsubscribe();
  }

  /**
   * Update модели прав доступа по клику на чекбоксы
   */
  public onChecked(checked: boolean, item: ModuleAccessRight | SystemAccessRight, serviceInex?: number) {

    const serviceChecked = typeof serviceInex !== 'undefined';

    if (serviceChecked) {
      item.serviceAccessRights[serviceInex].hasAccess = checked;
    } else {
      item.hasAccess = checked;
    }

    if ((item as SystemAccessRight).systemName) {
      if (serviceChecked) {
        item.hasAccess = item.serviceAccessRights.every((s) => s.hasAccess);
      }

      if (!serviceChecked) {
        item.serviceAccessRights.forEach((s) => s.hasAccess = checked);
      }
    }
  }

  /**
   * Добавление формы создания пользователя
   */
  public addUser() {
    this.collapseAll();
    this.addMode = true;
    this.form = this.createUserGroup({
      cn: '',
      sn: '',
      email: ''
    }, true);
  }

  /**
   * Создание пользователя
   */
  public createUser() {
    if (this.form.invalid) {
      return;
    }
    const userModel = this.form.getRawValue();
    this.usersService.createUser(userModel).subscribe((user) => {
      this.messageService.text(`Создан новый пользователь ${userModel.cn}`);
      this.addMode = false;

      setTimeout(() => {
        this.users = [{ model: user }].concat(this.users).sort((a, b) => a.model.cn.localeCompare(b.model.cn));
      });
    });
  }

  /**
   * Удаление пользователя
   */
  public deleteUser(user: UserRow) {
    const cn = user.model.cn;
    this.dialogRef.open({
      title: `Вы действительно хотите удалить пользователя ${cn}?`
    }).subscribe((confirmed) => {
      if (confirmed) {
        this.usersService.deleteUser(cn).subscribe(() => {
          this.users = this.users.filter((u) => u.model.cn !== cn);
          this.messageService.text(`Пользователь ${cn} удален`);
        });
      }
    });
  }

  /**
   * Отправка формы
   */
  public updateUser(user: UserRow) {

    const { cn, sn, email, password } = this.form.getRawValue();

    const obs$ = [];

    if (password) {
      obs$.push(
        this.usersService.changePassword(cn, password)
      );
    }

    if (sn !== user.model.sn || email !== user.model.email) {
      user.model = { ...user.model, sn, email };
      obs$.push(
        this.usersService.updateUser(user.model)
      );
    }

    if (!isEqual(this.userAccessRights, this.userAccessRightsClone)) {
      obs$.push(
        this.usersService.setAccessRights(cn, this.userAccessRights)
      );
    }

    if (obs$.length === 0) {
      return user.expanded = false;
    }

    forkJoin(obs$).subscribe(() => {
      this.messageService.text(`Информация о пользователе ${cn} обновлена`);
      user.expanded = false;
    });
  }

  /**
   * Раскрытие формы и подгрузка данных
   */
  public expand(user: UserRow, rowElement: Element) {
    this.collapseAll();
    this.form = this.createUserGroup(user.model);
    this.userAccessRights = null;
    this.usersService.getAccessRights(user.model.cn).pipe(
      catchError(() => {
        return of(null);
      })
    ).subscribe((resp) => {
      this.userAccessRights = resp;
      this.userAccessRightsClone = cloneDeep(resp);
      user.expanded = true;
      setTimeout(() => rowElement.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    });
  }

  /**
   * Скрыть все формы
   */
  public collapseAll() {
    this.addMode = false;
    this.users.forEach((r) => r.expanded = false);
  }

  /**
   * Создание формы по модели
   */
  private createUserGroup(userModel: User, isNew = false): FormGroup {
    return this.fb.group({
      cn: [{ value: userModel.cn, disabled: !isNew }, Validators.required],
      sn: userModel.sn,
      email: userModel.email,
      password: ''
    });
  }

}
