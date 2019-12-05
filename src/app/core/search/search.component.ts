import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
    @Output() searchEvent: EventEmitter<string> = new EventEmitter();
    @Output() createCourseEvent = new EventEmitter();

    public inputValue: string;

    constructor() {}

    search() {
        this.searchEvent.emit(this.inputValue);
    }

    addCourse() {
        this.createCourseEvent.emit();
    }
}
