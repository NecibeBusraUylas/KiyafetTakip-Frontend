import { Staff } from './../models/staff/staff';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'staffNameFilter'
})
export class StaffNameFilterPipe implements PipeTransform {

  transform(value:  Staff[], filterText1: string): Staff[] {
    return value.filter((s:Staff) => s.nameSurname.toUpperCase().startsWith(filterText1.toUpperCase()))
  }
}
