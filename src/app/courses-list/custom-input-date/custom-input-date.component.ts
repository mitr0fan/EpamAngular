import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CoursesService } from 'src/app/courses.service';

@Component({
    selector: 'app-custom-input-date',
    templateUrl: './custom-input-date.component.html',
    styleUrls: ['./custom-input-date.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomInputDateComponent),
            multi: true,
        },
    ],
})
export class CustomInputDateComponent implements ControlValueAccessor {
    private dateValue;

    @Input() set date(value) {
        if (value.length === 10) {
            this.dateValue = this.coursesService.dateFromStringToMs(value);
        }
        this.onChange(this.dateValue);
    }

    get dateFromClass() {
        return this.dateValue;
    }

    private onChange = (_: any) => {};

    constructor(private coursesService: CoursesService) {}

    writeValue(date) {
        this.dateValue = date;
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {}
}
