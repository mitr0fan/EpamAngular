import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    public showLoading = new Subject<boolean>();

    constructor() {}
}
