import { Component, OnInit, OnDestroy , Output, EventEmitter} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { EqtService } from './eqt.service';
import zh from '@angular/common/locales/zh';
 
registerLocaleData(zh);
@Component({
    selector:'mode-prop',
    templateUrl:'./mode-prop.component.html',
    styleUrls:['./mode-prop.component.less'],
    providers: [EqtService]
})

export class ModePropComponent implements OnInit, OnDestroy {
    @Output() change: EventEmitter<any> = new　EventEmitter();//创建实力
    loading = false;
    pageIndex = 1;
    pageSize = 10;
    total = 1;
    dataSet = [];
    search = {
        prop_name:'', 
    }
    
    constructor(private eqtService: EqtService){

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
            prop_name:'', 
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
        this.eqtService.getPropList(this.search.prop_name, this.pageIndex, this.pageSize).then(result=>{
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