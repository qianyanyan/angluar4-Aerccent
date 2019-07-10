import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({name: 'lockedType'})
export class LockedTypePipe implements PipeTransform {
  transform(value: any): any {
    let str = '';
    if(value=="1") {
      str = '是'
    } else {
      str = '否'
    }  
    return str;
  }
}