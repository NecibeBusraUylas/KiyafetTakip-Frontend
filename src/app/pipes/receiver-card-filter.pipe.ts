import { Receiver } from './../models/receiver/receiver';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'receiverCardFilter'
})
export class ReceiverCardFilterPipe implements PipeTransform {

  transform(value: Receiver[], filterText2: string): Receiver[] {
    return value.filter((r:Receiver) => r.cardNumber.toUpperCase().startsWith(filterText2.toUpperCase()))
  }

}
