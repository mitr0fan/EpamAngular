import {
    Component,
    forwardRef,
    OnInit,
    Output,
    EventEmitter,
    OnDestroy,
    Input,
} from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor,
    NG_VALIDATORS,
    ValidationErrors,
    FormControl,
} from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';
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
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => CustomInputAuthorsComponent),
            multi: true,
        },
    ],
})
export class CustomInputAuthorsComponent implements OnInit, OnDestroy, ControlValueAccessor {
    private authorValue: string;
    @Output() searchEvent = new EventEmitter();
    private subscription: Subscription;
    @Input() authorsList: Author[];
    @Input() authorsListSearch$: Observable<Author[]>;
    public control: FormControl;
    public matcher = {
        isErrorState: () => {
            return (
                (this.control.hasError('noAuthors') || this.control.hasError('maxAuthors')) &&
                this.control.touched
            );
        },
    };
    @Output() changeAuthorsEvent = new EventEmitter();

    set author(value: string) {
        this.authorValue = value;
        this.onChange(this.authorValue);
    }

    get author() {
        return this.authorValue;
    }

    onChange: (_: any) => void = () => {};
    onTouched: (_: any) => void = () => {};

    constructor(private searchService: SearchService) {}

    ngOnInit() {
        this.subscription = this.searchService.getSearchValue().subscribe((value) => {
            this.searchEvent.emit(value);
        });

        setTimeout(() => {
            this.onChange('');
        }, 0);

        if (this.authorsList.length > 0) {
            this.onClick();
        }
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

    validate(control: FormControl): ValidationErrors | null {
        this.control = control;

        if (this.authorsList.length > 2) {
            return {
                maxAuthors: true,
            };
        }

        if (this.authorsList.length === 0) {
            return {
                noAuthors: true,
            };
        } else {
            return null;
        }
    }

    search(value: string) {
        this.searchService.searchValue$.next(value);
    }

    selectAuthor(author: Author) {
        const isAuthorAlreadyExist = this.authorsList.find((elem) => {
            if (elem.id === author.id) {
                return true;
            }
        });
        if (!isAuthorAlreadyExist) {
            this.authorsList.push(author);
        }
        this.onClick();
    }

    deleteAuthor(id: number) {
        this.authorsList = this.authorsList.filter((author) => {
            if (author.id !== id) {
                return true;
            }
        });
        this.onClick();
    }

    onClick() {
        this.onTouched(null);
        this.onChange('');
        this.changeAuthorsEvent.emit(this.authorsList);
    }
}
