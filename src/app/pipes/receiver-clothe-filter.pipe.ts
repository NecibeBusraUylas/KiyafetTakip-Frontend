import { Receiver } from './../models/receiver/receiver';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'receiverClotheFilter'
})
export class ReceiverClotheFilterPipe implements PipeTransform {

  transform(value: Receiver[], filterText3: string): Receiver[] {
    return value.filter((r:Receiver) => r.clothe.toUpperCase().startsWith(filterText3.toUpperCase()))
  }
}
