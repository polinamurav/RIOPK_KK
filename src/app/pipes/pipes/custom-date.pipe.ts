import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'customDate' })
export class CustomDatePipe extends DatePipe implements PipeTransform {
  transform(date: any, format: string): any {
    const timezone: string = this.getTimezoneFromDate(date);

    return super.transform(date, format, timezone);
  }

  private getTimezoneFromDate(date: string) {
    if (date && date.length) {
      return date.slice(-5);
    }
    return '';
  }
}
