import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimeFormat',
})
export class DateAndTimeFormatPipe implements PipeTransform {
  transform(value: string | Date, format: string = 'medium'): string {
    if (typeof value === 'string') {
      // Convert the input string to a Date object
      value = new Date(value);
    }

    if (!(value instanceof Date) || isNaN(value.getTime())) {
      return 'Invalid Date';
    }

    const options = {
      year: 'numeric',
      month: 'long', // Use 'long' for full chinese date format
      day: 'numeric',
    };

    switch (format) {
      case 'date':
        return value.toLocaleDateString('zh-HK', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      case 'time':
        return value.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
      default:
        return value.toLocaleString();
    }
  }
}
