import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({name: 'PropInstType'})
export class PropInstType implements PipeTransform {
  transform(value: any): any {
    let str = '';
    if(value=="Dynamic") {
      str = '动态'
    } else if(value=="Static"){
      str = '静态'
    } else {
      str = '';
    } 
    return str;
  }
}