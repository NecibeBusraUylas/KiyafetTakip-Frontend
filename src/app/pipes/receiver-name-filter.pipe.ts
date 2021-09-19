import { Receiver } from './../models/receiver/receiver';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'receiverNameFilter'
})
export class ReceiverNameFilterPipe implements PipeTransform {

  transform(value: Receiver[], filterText1: string): Receiver[] {
    return value.filter((r:Receiver) => r.nameSurname.toUpperCase().startsWith(filterText1.toUpperCase()))
  }
}