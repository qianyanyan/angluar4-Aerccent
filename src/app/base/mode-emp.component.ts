import { Component, OnInit, OnDestroy , Output, EventEmitter} from '@angular/core';
import { registerLocaleData } from '@angular/common'; 
import { BaseService } from './base.service';
import zh from '@angular/common/locales/zh';
 
registerLocaleData(zh);

 
@Component({
    selector:'mode-emp',
    templateUrl:'./mode-emp.component.html',
    styleUrls:['./mode-emp.component.less'],
    providers: []
})

export class ModeEmpComponent implements OnInit, OnDestroy {
    @Output() change: EventEmitter<any> = new　EventEmitter();//创建实力
    loading = false;
    pageIndex = 1;
    pageSize = 10;
    total = 1;
    dataSet = [];
    search = {
        emp_no:'',
        employee_name:''
    }
    
    constructor(private baseService: BaseService){
    }
    
    ngOnInit(): void {
        this.searchData();
    }

    ngOnDestroy(): void {

    }

    searchSubmit():void {
        this.searchData(true);
    }

    resetForm(): void {
        this.search = {
            emp_no:'',
            employee_name:''
        }
        this.searchData(true);
    }

    select(data) {
        this.change.emit(data);//通过emit可将需要传递的数据发送给父组件
    }
      
    searchData(reset: boolean = false):void {
        if (reset) {
            this.pageIndex = 1;
        }
        this.loading = true;
        this.baseService.getEmpList(this.search.emp_no,this.search.employee_name, this.pageIndex, this.pageSize).then(result=>{
            if(result.code == 1) {
                this.dataSet = result.list;
                this.total = result.count;
              
            }
            this.loading = false;
        }, err=>{
            this.loading = false;
        })
    }
}