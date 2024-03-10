import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatArrayStrings',
  standalone: true
})
export class FormatArrayStringsPipe implements PipeTransform {

  transform(value: string[], ...args: unknown[]): unknown {
    let newString = value[0];
    for (let i = 1; i < value.length; i++) {    
      newString += i === value.length - 1 ? ' and ' + value[i] : ', ' + value[i];
    }
    return newString;
  }

}
