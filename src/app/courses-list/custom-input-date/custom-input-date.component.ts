import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, FormControl, ValidationErrors } from '@angular/forms';
import { DateValidatorService } from 'src/app/date-validator.service';

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
export class CustomInputDateComponent implements ControlValueAccessor{
    private dateValue;
    public control: FormControl;
    public matcher: {isErrorState: () => {}, control:any} = {
        isErrorState() {
            const controlState: FormControl = this.control();
            console.log(controlState);
            return !controlState.pristine
        },
        control: () => {return this.control},
    }

    @Input() set date(value) {
        this.dateValue = value;
        this.onChange(this.dateValue);
    }

    get dateFromClass() {
        return this.dateValue;
    }

    private onChange = (_: any) => {};

    constructor(private dateValidator: DateValidatorService) {}

    writeValue(date) {
        this.dateValue = date;
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {}

    validate(control: FormControl): ValidationErrors | null {
        const value = control.value;
        this.control = control;

        return this.dateValidator.validator(value);
    }
}
