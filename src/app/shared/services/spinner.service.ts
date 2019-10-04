import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public visibiliy$: Subject<boolean>;
  public pendingRequests = 0;

  constructor() {
    this.visibiliy$ = new Subject();
  }

  check() {
    this.visibiliy$.next(this.pendingRequests > 0);
  }

  inc() {
    this.pendingRequests++;
    this.check();
  }

  dec() {
    if (this.pendingRequests > 0) {
      this.pendingRequests--;
    }
    this.check();
  }
}
