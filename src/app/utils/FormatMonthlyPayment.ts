import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMonthlyPayment'
})
export class FormatMonthlyPayment implements PipeTransform {
  transform(value: any): string {
    if (!value) return '';
    
    const numericValue = value.toString().replace(/\D/g, '');
    return numericValue.slice(0, -2) + ',' + numericValue.slice(-2);
  }
}