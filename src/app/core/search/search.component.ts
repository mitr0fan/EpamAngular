import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
    @Output() createCourseEvent = new EventEmitter();
    @Output() searchEvent = new EventEmitter();
    public searchValue: Subject<string> = new Subject();

    constructor() {}

    ngOnInit() {
        this.searchValue
            .pipe(
                debounceTime(500),
                filter((value) => {
                    return value.length > 2;
                })
            )
            .subscribe((value) => {
                this.searchEvent.emit(value);
            });
    }
    ngOnDestroy() {
        this.searchValue.unsubscribe();
    }

    addCourse() {
        this.createCourseEvent.emit();
    }

    search(value: string) {
        this.searchValue.next(value);
    }
}
