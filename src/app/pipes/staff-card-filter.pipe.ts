import { Staff } from './../models/staff/staff';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'staffCardFilter'
})
export class StaffCardFilterPipe implements PipeTransform {

  transform(value: Staff[], filterText2: string): Staff[] {
    return value.filter((s:Staff) => s.cardNumber.toUpperCase().startsWith(filterText2.toUpperCase()))
  }
}
