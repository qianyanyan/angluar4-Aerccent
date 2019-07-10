import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { BaseService } from './base.service';
import zh from '@angular/common/locales/zh';
 
registerLocaleData(zh);
 
@Component({
    selector:'mode-user',
    templateUrl:'./mode-user.component.html',
    styleUrls:['./mode-user.component.less'],
    providers: []
})

export class ModeUserComponent implements OnInit, OnDestroy {
 
    @Input() set roleId(roleId:string){
        if(roleId) {
            this.role_id = roleId;
            this.pageIndex = 1;
            this.searchData();
        }
    }
    loading = false;
    pageIndex = 1;
    pageSize = 10;
    total = 1;
    dataSet = [];
    role_id:string;
    constructor(private baseService: BaseService){
    }
    
    ngOnInit(): void {
         
    }

    ngOnDestroy(): void {

    }
  
    searchData(reset: boolean = false):void {
        if (reset) {
            this.pageIndex = 1;
        }
        this.loading = true;
        this.baseService.getRoleUserList(this.role_id,this.pageIndex, this.pageSize).then(result=>{
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