import { Component, OnInit, OnDestroy , Output, EventEmitter} from '@angular/core';
import { BomStepService } from '../bom-step.service';
 
@Component({
  selector: 'bom-id',
  templateUrl: './bom-id.component.html',
  providers: [BomStepService]
})

export class BomIdComponent implements OnInit, OnDestroy {
 
    @Output() change: EventEmitter<any> = new　EventEmitter();
    loading = false;
    pageIndex = 1;
    pageSize = 10; 
    total = 1;
    dataSet = [];
    search = {
      component_description: ""
    }
    
    constructor(private BomStepService: BomStepService){
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
          component_description: "" 
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
        this.BomStepService.getBomComponentList(this.pageIndex, this.pageSize, this.search).then(result=>{
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