import { Pipe, PipeTransform } from '@angular/core';
import { Clothe } from '../models/clothe/clothe';

@Pipe({
  name: 'clotheFilterPipe'
})
export class ClotheFilterPipePipe implements PipeTransform {
  
  transform(value: Clothe[], filterText: string): Clothe[] {
    return value.filter((c:Clothe) => c.type.toUpperCase().startsWith(filterText.toUpperCase()))
  }
}

