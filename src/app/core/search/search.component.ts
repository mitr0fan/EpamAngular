import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, debounceTime, first } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    @Output() createCourseEvent = new EventEmitter();
    @Output() searchEvent = new EventEmitter();
    public searchValue: Subject<string> = new Subject();

    constructor() {}

    ngOnInit() {
        this.searchValue.pipe(
            debounceTime(300),
            filter(value => {
                return value.length > 3;
            }),
        )
        .subscribe(value => {
            this.searchEvent.emit(value);
        });
    }

    addCourse() {
        this.createCourseEvent.emit();
    }

    search(value: string) {
        this.searchValue.next(value);
    }
}
