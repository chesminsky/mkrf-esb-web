import { Pipe, PipeTransform } from '@angular/core';
import { PaginationComponent } from './pagination.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(list: any[], paginationRef: PaginationComponent): Observable<any[]> {

    return paginationRef.paginated.pipe(
      map(({ rowStart, rowEnd }) => {
        if (!rowEnd) {
          return [];
        }
        return list.slice(rowStart, rowEnd);
      })
    );
  }

}
