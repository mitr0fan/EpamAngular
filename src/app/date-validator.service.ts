import { Injectable } from '@angular/core';
import { isExists } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class DateValidatorService {

  constructor() { }

  validator(value: string) {
    const regPattern: RegExp =/\d\d\.\d\d\.\d{4}/;
    if (value && value.length === 10 && regPattern.test(value)) {
      if(isExists(+value.slice(6), +value.slice(3, 5) - 1, +value.slice(0, 2))) {
        return null;
      } else {
        return {
          invalidDate: true
        }
      }
    } else {
      return {
        invalidDate: true
      }
    }
  }
}
