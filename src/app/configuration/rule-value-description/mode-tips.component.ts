import { Component, OnInit, OnDestroy , Output, EventEmitter} from '@angular/core';
import { deployService } from '../technology/deploy.service';
 
@Component({
    selector:'mode-tips',
    templateUrl:'./mode-tips.component.html',
    styleUrls:['./mode-tips.component.less'],
    providers: [deployService]
})

export class ModetipsComponent implements OnInit, OnDestroy {
 
    @Output() change: EventEmitter<any> = new　EventEmitter();//创建实力
    loading = false;
    pageNum = 1;
    count = 10; 
    rule_inst_desc;
    total = 1;
    dataSet = [];
    pageSize;
    search = {
        brand_name:'', 
    }
    
    constructor(private deployService:deployService,){
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
            this.pageNum = 1;
        }
    
        this.loading = true;
        console.log(this.search.brand_name, this.pageNum, this.count);
        this.deployService.getBrandTipsList(this.search.brand_name, this.count, this.pageNum).then(result=>{
            console.log(result);
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