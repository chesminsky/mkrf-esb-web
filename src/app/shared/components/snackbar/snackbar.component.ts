import { Component, OnInit, AfterViewInit, ElementRef, Input, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MDCSnackbar } from '@material/snackbar';
import { MessageService } from '../../services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'esb-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnackbarComponent implements AfterViewInit, OnDestroy {

  public message: string;
  private snackbar: MDCSnackbar;
  private sub: Subscription;

  constructor(
    private el: ElementRef,
    private messageService: MessageService,
    private cd: ChangeDetectorRef
  ) { }

  public ngAfterViewInit() {
    this.snackbar = new MDCSnackbar(this.el.nativeElement.querySelector('.mdc-snackbar'));

    this.sub = this.messageService.messages$.subscribe((msg) => {
      if (this.snackbar.isOpen) {
        this.snackbar.close();
      }
      setTimeout(() => {
        this.message = msg;
        this.open();
        this.cd.detectChanges();
      });
    });
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private open() {
    this.snackbar.open();
  }

}
