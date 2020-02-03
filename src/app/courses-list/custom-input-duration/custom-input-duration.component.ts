import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';
import { DurationPipe } from 'src/app/directives-pipes/duration.pipe';

@Component({
  selector: 'app-custom-input-duration',
  templateUrl: './custom-input-duration.component.html',
  styleUrls: ['./custom-input-duration.component.scss'],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CustomInputDurationComponent),
        multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomInputDurationComponent),
      multi: true,
  },
],
})
export class CustomInputDurationComponent implements ControlValueAccessor, Validator {
  private durationProperty: string;
  public control: FormControl;
  public matcher = {
    isErrorState: () => {
      return this.control.hasError('invalidError') && this.control.touched;
    }
  };
  private onChange = (_: any) => {};
  private onTouched = (_: any) => {};

  get duration() {
    return this.durationProperty;
  }

  set duration(value: string) {
    this.durationProperty = value;
    this.onChange(value);
  }

  constructor(private durationPipe: DurationPipe) { }

  writeValue(duration: string) {
    if (duration !== null) {
      this.durationProperty = this.durationPipe.changeDurationFromMsToMinutes(+duration);
      this.onChange(this.durationProperty);
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  onClick() {
    this.onTouched(null);
  }

  validate(control: FormControl): ValidationErrors | null {
    const value: string = control.value;
    this.control = control;
    const regExp = /\d{1,3}/;
    const error = {
      invalidError: true
    };

    if (value === null) {
      return error;
    }
    if (value === '') {
      return error;
    }
    if (value.match(regExp)) {
      if (value.match(regExp)[0] === value) {
        return null;
      } else {
        return error;
      }
    } else {
      return error;
    }
  }

}
