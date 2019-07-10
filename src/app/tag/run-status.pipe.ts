import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({name: 'runStatus'})
export class RunStatusPipe implements PipeTransform {
  transform(value: any): any {
    let str = '';
    if(value=="0") {
      str = '停机'
    } else if(value=="1"){
      str = '运行'
    } else if(value=="2"){
        str = '上游'
    } else if(value=="3"){
        str = '上游其它'
    } else if(value=="4"){
        str = '自身'
    } else if(value=="5"){
        str = '下游'
    } else if(value=="6"){
        str = '下游其它'
    } else if(value=="7"){
        str = '外部'
    } else if(value=="8"){
        str = '未知'
    } else if(value=="9"){
        str = '换型'
    } else if(value=="10"){
        str = '计划停机'
    } else if(value=="11"){
        str = '无工作计划'
    }  else if(value=="12"){
        str = '没有PLC通讯'
    } else {
      str = '';
    } 
    return str;
  }
}
 