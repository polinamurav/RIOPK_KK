import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'customDate' })
export class CustomDatePipe extends DatePipe implements PipeTransform {
  // noinspection JSAnnotator
  transform(date: any, format: string): any {
    const timezone: string = this.getTimezoneFromDate(date);
    const dateWithoutZone = this.getDateWithoutZone(date);
    return super.transform(dateWithoutZone, format);
  }

  private getTimezoneFromDate(date: string): string {
    if (date && date.length) {
      return date.slice(-6);
    }
    return '';
  }

  private getDateWithoutZone(date: string): string {
    if (date && date.length) {
      return date.split('+')[0];
    }
    return '';
  }
}
