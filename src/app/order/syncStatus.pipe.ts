import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({ name: 'syncStatus'})
export class SyncStatusPipe implements PipeTransform {
  transform(value: any): any {
    let str = '';
    if(value=="opening") {
      str = '打开'
    } else if(value=="confirmed"){
      str = '已确认'
    } else {
      str = '';
    } 
    return str;
  }
}