import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, finalize, map } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';
import { throwError, Observable } from 'rxjs';

@Injectable()
export class PendingInterceptor implements HttpInterceptor {

  constructor(
    private spinner: SpinnerService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.headers.has('HideSpinner')) {
      this.spinner.inc();
    }

    return next.handle(req).pipe(
      map(event => {
        return event;
      }),
      catchError(error => {
        return throwError(error);
      }),
      finalize(() => {
        if (!req.headers.has('HideSpinner')) {
          this.spinner.dec();
        }
      })
    );
  }
}

