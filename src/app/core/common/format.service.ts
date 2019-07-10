export class  Format{
    public timestampFormat (index:any, format?:string):string {
        let timestamp = parseInt(index);
        if(index) {
            let date = new Date(timestamp);
            let y = date.getFullYear();
            let m = (date.getMonth()+1)>10 ?  (date.getMonth()+1) :"0"+(date.getMonth()+1);
            let d = (date.getDate()+1)>10 ? date.getDate() :"0"+date.getDate();
            let hh =  (date.getHours()+1)>10 ? date.getHours() :"0"+date.getHours();
            let ss =  (date.getSeconds()+1)>10 ? date.getSeconds() :"0"+date.getSeconds(); 
            let mm = (date.getMilliseconds()+1)>10 ? date.getMilliseconds() :"0"+date.getMilliseconds();
          
            if(format == 'YY-MM-DD') {
                return y +"-"+m+"-"+d;
            } else if(format ==  'YY-MM-DD hh:ss:mm') {
                return y +"-"+m+"-"+d + ' '+hh+':'+ss+':'+mm;
            } else {
                return y +"-"+m+"-"+d;
            }
        
        } else {
        return '';
        }
    }

    public dateFormat (date?:any, format?:string):string {
        let dateTinme = new Date(date);
        let y = dateTinme.getFullYear();
        let m = (dateTinme.getMonth()+1)>10 ?  (dateTinme.getMonth()+1) :"0"+(dateTinme.getMonth()+1);
        let d = (dateTinme.getDate()+1)>10 ? dateTinme.getDate() :"0"+dateTinme.getDate();
        let hh =  (dateTinme.getHours()+1)>10 ? dateTinme.getHours() :"0"+dateTinme.getHours();
        let ss =  (dateTinme.getSeconds()+1)>10 ? dateTinme.getSeconds() :"0"+dateTinme.getSeconds(); 
        let mm = (dateTinme.getMilliseconds()+1)>10 ? dateTinme.getMilliseconds() :"0"+dateTinme.getMilliseconds();
        
        if(format == 'YY-MM-DD') {
            return y +"-"+m+"-"+d;
        } else if(format ==  'YY-MM-DD hh:ss:mm') {
            return y +"-"+m+"-"+d + ' '+hh+':'+ss+':'+mm;
        } else {
            return y +"-"+m+"-"+d;
        }
    }

    public nowTime(format?: string) {
        let dateTinme = new Date();
        let y = dateTinme.getFullYear();
        let m = (dateTinme.getMonth() + 1) > 10 ? (dateTinme.getMonth() + 1) : "0" + (dateTinme.getMonth() + 1);
        let d = (dateTinme.getDate() + 1) > 10 ? dateTinme.getDate() : "0" + dateTinme.getDate();
        let hh = (dateTinme.getHours() + 1) > 10 ? dateTinme.getHours() : "0" + dateTinme.getHours();
        let ss = (dateTinme.getSeconds() + 1) > 10 ? dateTinme.getSeconds() : "0" + dateTinme.getSeconds();
        let mm = (dateTinme.getMilliseconds() + 1) > 10 ? dateTinme.getMilliseconds() : "0" + dateTinme.getMilliseconds();

        if (format == 'YY-MM-DD') {
            return y + "-" + m + "-" + d;
        } else if (format == 'YY-MM-DD hh:ss:mm') {
            return y + "-" + m + "-" + d + ' ' + hh + ':' + ss + ':' + mm;
        } else {
            return y + "-" + m + "-" + d;
        }
    }

    public formatUnixtimestamp (timestamp:any){
        let dateTime = new Date(timestamp*1);
        let year =   dateTime.getFullYear();
        let month = "0" + (dateTime.getMonth() + 1);
        let date = "0" + dateTime.getDate();
        let hour = "0" + dateTime.getHours();
        let minute = "0" + dateTime.getMinutes();
        let second = "0" + dateTime.getSeconds();
        return year + "-" + month.substring(month.length-2, month.length)  + "-" + date.substring(date.length-2, date.length)
            + " " + hour.substring(hour.length-2, hour.length) + ":"
            + minute.substring(minute.length-2, minute.length) + ":"
            + second.substring(second.length-2, second.length);
 }
 

    public  changLongLat (arr) {
        let cArr = arr;
         if(arr[1]>30) {
             if(arr[0]<-10) {
                     cArr[0] = parseFloat(arr[0])+180;
             } else {
                     cArr[0] = parseFloat(arr[0])-180;
             }
         }  else {
             if(arr[0]<-18) {
                     cArr[0] = parseFloat(arr[0])+180;
             } else {
                     cArr[0]= parseFloat(arr[0])-180;
             }
         }
        return cArr;
    }
    public class2type = {};
    extend(...args) {
       let options, name, src, srcType, copy, copyType, copyIsArray, clone,
          target = args[0] || {},
          i = 1,
            length = args.length,
        deep = false;
         
         if ( typeof target === 'boolean') {
            deep = target;
            target = args[i] || {};
            i++;
          }
         if ( typeof target !== 'object' && typeof target !== 'function') {
            target = {};
         }
        if ( i === length) {
            target = this;
            i--;
         }
        for ( ; i < length; i++ ) {
           if ( (options = args[i]) !== null ) {
             for ( name in options ) {
                src = target[name];
                copy = options[name];
                   // 若参数中字段的值就是目标参数，停止赋值，进行下一个字段的赋值
                 // 这是为了防止无限的循环嵌套
                  if ( target === copy ) {
                  continue;
                }
                 srcType = this.isArray(src) ? 'array': typeof src;
                 // 不能用typeof判断一个数组是否为数组格式，例：typeof [] -> object。如需判断的话可用'[] instanceof Array'方法。
                   // copyType = typeof copy;
                 if ( deep && copy && ((copyIsArray = this.isArray(copy)) || typeof copy === 'object')) {
                 if ( copyIsArray ) {
                   copyIsArray = false;
                     clone = src && srcType === 'array' ? src : [];
                 } else {
                   clone = src && srcType === 'object' ? src: {};
                  }
                 target[name] = this.extend(deep, clone, copy);
                } else if ( copy !== undefined ) {
                     target[name] = copy;
                  }
              }
               }
             }
             return target;
           }
        
         public isArray = Array.isArray || function(obj) {
            return this.type(obj) === 'array';
         }
        
          private type(obj: object) {
           if (obj === null) {
              return obj + "";
           }
           return typeof obj === 'object' || typeof obj === 'function' ?
              this.class2type[this.toString.call(obj)] || 'object' :
                 typeof obj;
         }
         
          private getClass2type() {
         'Boolean Number String Function Array Data RegExp Object Error'.split(' ').forEach(name => {
            this.class2type['[object' + name + ']'] = name.toLowerCase();
           });
        }
}

