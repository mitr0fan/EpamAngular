import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-custom-input-date',
  templateUrl: './custom-input-date.component.html',
  styleUrls: ['./custom-input-date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputDateComponent),
      multi: true
    }
  ]
})
export class CustomInputDateComponent implements ControlValueAccessor {

  private onChange = () => {};
  private onTouched = () => {};

  constructor() { }

  writeValue(value) {
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

}
