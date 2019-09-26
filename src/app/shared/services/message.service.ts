import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

    public messages$: Subject<string> = new Subject();

    public text(message: string) {
        this.messages$.next(message);
    }

}
