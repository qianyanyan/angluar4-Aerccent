import { Component, OnInit, OnDestroy , Output, EventEmitter} from '@angular/core';
import { MatlService } from './matl.service';
 
@Component({
    selector:'mode-brand',
    templateUrl:'./mode-brand.component.html',
    styleUrls:['./mode-brand.component.less'],
    providers: []
})

export class ModeBrandComponent implements OnInit, OnDestroy {
 
    @Output() change: EventEmitter<any> = new　EventEmitter();//创建实力
    loading = false;
    pageIndex = 1;
    pageSize = 10; 
    total = 1;
    dataSet = [];
    search = {
        brand_name:'', 
    }
    
    constructor(private matlService: MatlService){
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
            brand_name:'', 
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
        /** matl_name:string,pp_name:string,brand_name:string, pageIndex:any, pageSize:any*/
        this.matlService.getBrandList('',this.pageIndex, this.pageSize,'').then(result=>{
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