import { Component, OnInit, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { MDCDialog } from '@material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'esb-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements AfterViewInit, OnDestroy {

  public title: string;
  public cancelButtonText = 'Нет';
  public confirmButtonText = 'Да';

  private dialog: MDCDialog;
  private confirmed$;

  constructor() { }

  ngAfterViewInit() {
    this.dialog = new MDCDialog(document.querySelector('.mdc-dialog'));

    this.dialog.listen('MDCDialog:closed', (e: CustomEvent) => {
      this.confirmed$.next(e.detail.action === 'confirm');
    });
  }

  ngOnDestroy() {
    this.dialog.destroy();
  }

  public open(opts: { title: string; }) {
    Object.assign(this, opts);
    this.dialog.open();
    this.confirmed$ = new Subject<boolean>();
    return this.confirmed$;
  }

}
