import { Component, OnInit, OnDestroy , Output, EventEmitter} from '@angular/core';
import { deployService } from '../../technology/deploy.service';
 
@Component({
    selector:'ModeBomCmp',
    templateUrl:'./mode-BomComponent.component.html',
    styleUrls:['./mode-BomComponent.component.less'],
    providers: [deployService]
})

export class ModeBomCmptComponent implements OnInit, OnDestroy {
 
    @Output() change: EventEmitter<any> = new　EventEmitter();//创建实力
    loading = false;
    pageNum = '1';
    count = '10'; 
    rule_inst_desc;
    total = 1;
    dataSet = [];
    pageSize;
    search = {
        matl_name:'', 
    }
    
    constructor(private deployService:deployService,){
    }
    
    ngOnInit(): void {
         
        this.searchresource();
    }

    ngOnDestroy(): void {

    }

    searchSubmit():void {
        this.searchresource(true);
    }

    resetForm(): void {
        this.search = {
            matl_name:'', 
        }
        this.searchresource(true);
    } 

    select(data:any) {
        if(data) {
            this.change.emit(data); 
        }
    }
      
    searchresource(reset: boolean = false):void {
        if (reset) {
            this.pageNum = '1';
        }
    
        this.loading = true;
        this.deployService.getmathName(this.search.matl_name,this.count,this.pageNum).then(result=>{
            if(result.code == 1) {
                console.log( result);
                this.dataSet = result.list;
                this.total = result.count;
            }
             this.loading = false;
        }, err=>{
             this.loading = false;
        })
    }

    
}