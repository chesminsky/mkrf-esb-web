import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'esb-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  public visible$: Observable<boolean>;

  constructor(
    private spinnerService: SpinnerService
  ) { }

  ngOnInit() {
    this.visible$ = this.spinnerService.visibiliy$;
  }

}
