import { Component, OnInit, OnDestroy , Output, EventEmitter} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { OrderService } from './order.service';
import zh from '@angular/common/locales/zh';
 
registerLocaleData(zh);
@Component({
    selector:'mode-matl',
    templateUrl:'./mode-matl.component.html',
    styleUrls:['./mode-matl.component.less'],
    providers: [OrderService]
})

export class ModeMatlComponent implements OnInit, OnDestroy {
    @Output() change: EventEmitter<any> = new　EventEmitter();//创建实力
    loading = false;
    pageIndex = 1;
    pageSize = 10;
    total = 1;
    dataSet = [];
    search = {
        matl_name:'', 
    }
    
    constructor(private orderService: OrderService){

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
            matl_name:'', 
        }
        this.searchData(true);
    }

    select(data:any) {
        if(data) {
            this.change.emit(data); 
        }
    }
      
    searchData(reset: boolean = false):void {
        if (reset) {
            this.pageIndex = 1;
        }
        this.loading = true;

        this.orderService.getMatlList(null,this.search.matl_name, this.pageIndex, this.pageSize).then(result=>{
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