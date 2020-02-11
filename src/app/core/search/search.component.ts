import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
    @Output() createCourseEvent = new EventEmitter();
    @Output() searchEvent = new EventEmitter();

    private subscription: Subscription;

    constructor(private searchService: SearchService) {}

    ngOnInit() {
        this.subscription = this.searchService.getSearchValue().subscribe((value) => {
            this.searchEvent.emit(value);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    addCourse() {
        this.createCourseEvent.emit();
    }

    search(value: string) {
        this.searchService.searchValue$.next(value);
    }
}
