import { Component, forwardRef, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SearchService } from 'src/app/search.service';
import { Subscription, Observable } from 'rxjs';
import { Author } from 'src/app/user';

@Component({
  selector: 'app-custom-input-authors',
  templateUrl: './custom-input-authors.component.html',
  styleUrls: ['./custom-input-authors.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputAuthorsComponent),
      multi: true
    }
  ]
})
export class CustomInputAuthorsComponent implements OnInit, OnDestroy, ControlValueAccessor {
  private authorValue: string;
  @Output() searchEvent = new EventEmitter();
  private subscription: Subscription;
  @Input() authorsList: Author[];
  @Input() authorsListSearch: Observable<Author[]>;

  set author(value: string) {
    this.authorValue = value;
    this.onChange(this.authorValue);
  }

  get author() {
    return this.authorValue;
  }

  onChange: (_:any) => void = () => {};
  onTouched: (_:any) => void = () => {};

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.subscription = this.searchService.getSearchValue().subscribe(value => {
      this.searchEvent.emit(value);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  writeValue(value: string) {
    this.authorValue = value;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  search(value: string) {
    this.searchService.searchValue$.next(value);
  }

  selectAuthor(author: Author) {
    this.authorsList.push(author);
  }

  deleteAuthor(id: number) {
    this.authorsList = this.authorsList.filter(author => {
      if (author.id !== id) {
        return true;
      }
    });
  }

}
