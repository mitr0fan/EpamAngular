import { Component, forwardRef } from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor,
    NG_VALIDATORS,
    FormControl,
    ValidationErrors,
    Validator,
} from '@angular/forms';
import { DateValidatorService } from 'src/app/services/date-validator.service';

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
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => CustomInputDateComponent),
            multi: true,
        },
    ],
})
export class CustomInputDateComponent implements ControlValueAccessor, Validator {
    private dateValue;
    public control: FormControl;
    public matcher = {
        isErrorState: () => {
            return this.control.hasError('invalidDate') && this.control.touched;
        },
    };

    set date(value) {
        this.dateValue = value;
        this.onChange(this.dateValue);
    }

    get date() {
        return this.dateValue;
    }

    private onChange = (_: any) => {};
    private onTouched = (_: any) => {};

    constructor(private dateValidator: DateValidatorService) {}

    writeValue(date) {
        this.dateValue = date;
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    validate(control: FormControl): ValidationErrors | null {
        const value = control.value;
        this.control = control;

        return this.dateValidator.validator(value);
    }

    onClick() {
        this.onTouched(null);
    }
}
