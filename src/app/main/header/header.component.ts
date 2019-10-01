import { Component, OnInit } from '@angular/core';
import { GlobalFilterService } from 'src/app/shared/services/global-filter..service';
import { FormGroup, FormControl } from '@angular/forms';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'esb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private globalFilter: GlobalFilterService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      search: new FormControl('')
    });

    this.form.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap((value) => {
        this.globalFilter.source$.next(value.search);
      })
    ).subscribe();
  }

}
