import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({name: 'menuType'})
export class MenuTypePipe implements PipeTransform {
  transform(value: any): any {
    let str = '';
    if(value=="1") {
      str = '菜单'
    } else if(value=="2") {
      str = '选项卡'
    } else if(value=="3") {
      str = '按钮'
    }
    return str;
  }
}