import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    public searchValue$ = new Subject<string>();

    constructor() {}

    getSearchValue() {
        return this.searchValue$.pipe(
            debounceTime(500),
            filter((value) => {
                return value.length > 2;
            })
        );
    }
}
