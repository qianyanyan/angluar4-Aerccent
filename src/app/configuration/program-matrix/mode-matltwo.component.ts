import { Component, OnInit, OnDestroy , Output, EventEmitter} from '@angular/core';
import { deployService } from '../technology/deploy.service';
 
@Component({
    selector:'mode-matlNameTwo',
    templateUrl:'./mode-matltwo.component.html',
    styleUrls:['./mode-matltwo.component.less'],
    providers: [deployService]
})

export class ModeMatlnameTwoComponent implements OnInit, OnDestroy {
 
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
         
        this.searchmatlName();
    }

    ngOnDestroy(): void {

    }

    searchSubmit():void {
        this.searchmatlName(true);
    }

    resetForm(): void {
        this.search = {
            matl_name:'', 
        }
        this.searchmatlName(true);
    } 

    select(data:any) {
        if(data) {
            this.change.emit(data); 
        }
    }
      
    searchmatlName(reset: boolean = false):void {
        if (reset) {
            this.pageNum = '1';
        }
    
        this.loading = true;
        this.deployService.getmathName(this.search.matl_name, this.count, this.pageNum).then(result=>{
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