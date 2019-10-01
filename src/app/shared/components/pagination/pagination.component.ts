import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'esb-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

  public recordsPerPage = 10;
  @Input()
  public dataRef: any[];
  public showPrev: boolean;
  public showNext: boolean;
  @Output()
  public paginated: EventEmitter<{ rowStart: number; rowEnd: number; }> = new EventEmitter();
  public rowStart: number;
  public rowEnd: number;

  private currentPage = 1;

  constructor() { }

  public get prevDisabled() {
    return this.currentPage === 1;
  }

  public get nextDisabled() {
    return this.currentPage === this.numPages();
  }

  public ngOnChanges() {
    if (this.dataRef) {
      setTimeout(() => {
        this.paginate();
      });
    }
  }

  public prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  public nextPage() {
    if (this.currentPage < this.numPages()) {
      this.currentPage++;
      this.paginate();
    }
  }

  private numPages() {
    return Math.ceil(this.dataRef.length / this.recordsPerPage);
  }

  private paginate() {

    this.rowStart = (this.currentPage - 1) * this.recordsPerPage;
    this.rowEnd = this.currentPage * this.recordsPerPage;

    if (this.rowEnd > this.dataRef.length) {
      this.rowEnd = this.dataRef.length;
    }

    this.paginated.emit({
      rowStart: this.rowStart,
      rowEnd: this.rowEnd
    });
  }

}




