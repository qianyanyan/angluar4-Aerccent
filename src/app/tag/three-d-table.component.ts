import { Component, OnDestroy, OnInit, Input, ViewChild  } from '@angular/core';
import { TagService } from "./tag.service";
import { DataService } from "../DataService";
import { Format } from '../core/common/format.service';
import { LocalStorage } from './../core/common/local.storage';

@Component({
    selector:'three-d-table',
    templateUrl:'./three-d-table.component.html',
    styleUrls:['./tag.component.less'],
    providers: [ TagService ]
})

export class ThreeDTableComponent implements OnInit, OnDestroy {
    @Input() id: any;
    @Input() eqt_name: any;
    height:any;
    isVisible; 
    showloading:any;
    priorityList = [
      { text: 'L', value: 'L' },
      { text: 'M', value: 'M' },
      { text: 'H', value: 'H' }
    ];
    
    ruleInstNameList = [];
    ruleInstNameListP = [];
    ruleInstNameListC = [];
    eqtNameList = [];
    eqtNameListP = [];
    eqtNameListC = [];
    customizedName1 = [];
    customizedName1P = [];
    customizedName1C = [];
    customizedName2 = [];
    customizedName2P = [];
    customizedName2C = [];
    customizedName3 = [];
    customizedName3P = [];
    customizedName3C = [];
    sortName = null;
    sortValue = null;
    listOfSearchName = [];
    searchPriority: string;
    data = [];
    displayData = [ ...this.data ];
    trendOptions:any;
    trendIntance:any;
    listRule = [];
    eqtList = [];
    loading = true;
    trendSize = '0';
    trend ={
      eqt_id:'',
      rule_inst_id:''
    };
    customizedList = [];
   dtimer:any;
   trendName = '指标项';
    constructor( 
      private tagService:TagService, 
      private dataService:DataService,
      private format: Format,
      private store:LocalStorage
      ){
      this.height = (document.body.clientHeight-280)+"px";
      this.showloading = true;
       
    }

     
    getEqtList() {
        this.eqtList = this.dataService.getEqtIdList(this.id);
        this.eqtList.push(this.id);
        this.getThreeDStatus();
    }
 

  getThreeDStatus() {
    this.tagService.getThreeDStatuss(this.eqtList.join(',')).then((result: any) => {
      if(result.code==1) {
        this.data =  result.list;
        console.log(this.data);
        this.store.set('eqt_name_pj', this.data);
        /** eqt_id: "374" eqt_name: "卸垛机2" formula_value: "4" output_value1: "60_null"*/
        this.displayData = [ ...this.data ];
      } 
      this.loading = false;
      this.setTreeTime();
    },()=>{
      this.loading = false;
      this.setTreeTime();
    })
  }

  setTreeTime() {
    this.dtimer = setTimeout(()=>{
     this.getThreeDStatus();
    },5000)
  }
  
  ngOnInit(): void {
    this.getEqtList();
   
  }

  ngOnDestroy(): void {
    console.log("getThreeDStatus")
    this.dtimer &&  clearInterval(this.dtimer);
  }
   
}