import { Component, OnInit, OnDestroy , Output, EventEmitter} from '@angular/core';
import { LocalStorage } from "../../core/common/local.storage";
import { deployService } from '../technology/deploy.service';
 
@Component({
    selector:'mode-resuoult-group',
    templateUrl:'./mode-group-tips.component.html',
    styleUrls:['./mode-group-tips.component.less'],
    providers: [deployService]
})

export class ModetipsGroupComponent implements OnInit, OnDestroy {
 
    @Output() change: EventEmitter<any> = new　EventEmitter();//创建实力
    loading = false;
    pageNum = '1';
    count = '10'; 
    rule_inst_desc;
    total = '1';
    dataSet = [];
    pageSize;
    search = {
        resource_description:'', 
    }
    
    constructor(private deployService:deployService,private store: LocalStorage){
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
            resource_description:'', 
        }
        this.searchData(true);
    } 

    select(data:any) {
        if(data) {
            this.change.emit(data); 
        }
    }
      
    searchData(reset: boolean = false):void {
        let resource_type = this.store.get('resource_type');
        if (reset) {
            this.pageNum = '1';
        }
        if(!reset){
            resource_type = '';
        }
        if(resource_type == 'resource'){
            this.loading = true;
            this.deployService.getresourceName(this.search.resource_description,this.count, this.pageNum).then(result=>{
                console.log(result);
                if(result.code == 1) {
                    this.dataSet = result.list;
                    this.total = result.count;
                }
                 this.loading = false;
            }, err=>{
                 this.loading = false;
            })
        }else{
            this.loading = true;
            this.deployService.getResourceLists(this.search.resource_description,this.count, this.pageNum).then(result=>{
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

    
}