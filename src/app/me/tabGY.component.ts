import {Component,OnInit,Input, Output, EventEmitter} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ElementRef } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import { MEService } from "./me.service";
import { Format } from "../core/common/format.service";
import zh from "@angular/common/locales/zh";
//import GXCJComponent from "./GXCJ.component";
// import * as $ from 'jquery';
//declare var $: any;
registerLocaleData(zh);
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import {CommonUtil} from '../core/common/common-util.service';
import { Http, URLSearchParams } from '@angular/http';
import {WH_XQEXCEL_SERVICE} from '../app.constants';

@Component({
  selector: "tab-gy",
  templateUrl: "./tab-gy.component.html",
styleUrls: ["./GXCJ.component.less"],
  providers: []
})
export class TabGYcomponent implements OnInit {
  @Input() eqtId:string;
  @Input() startDate:string;
  @Input() endDate:string;
  @Input() queryParam1;
  @Input() tabsFlag;

  @Input() XFQYId1: string;
	@Input() startDate1: string;
	@Input() endDate1: string;
  @Input() plantId: string;
  //向父组件传值
	@Output('checkedThree') checkedBackThree = new EventEmitter < any > ();
  //机台
  THJT=''
  //工艺参数
  THGYCS=''
  // 订单
  THDD=''
  pageNum1=1;
  pageSize1=10;
  orderBatchSet2=[];
  dataSet1=[];
  total1;
  loading1=false;
   orderBy1 = null;
   queryParamsMain=[]
   queryParamsXZDB={}
  constructor(
    private el: ElementRef,
    private router: Router,
    private meService: MEService,
    private format: Format,
    private activatedRoute: ActivatedRoute,
    private messageService : NzMessageService
  ) {


  }

  getParamsMain(params){
    this.queryParamsMain=[{
      'eqtId': params ? params.xfqyId : this.eqtId,
      'startDate': params ? params.startDate : this.startDate,
      'endDate': params ? params.endDate : this.endDate,
      'eqtName':this.THJT,
      'ruleInstName':this.THGYCS,
      'orderBatch':this.THDD,
      resultType: "条件A"
    }]
  }
	getOrderParams(params) {
    this.getParamsMain(params)
    this.queryParamsXZDB={
      'eqtId': this.XFQYId1,
      'startDate': this.startDate1,
      'endDate': this.endDate1,
      'eqtName':this.THJT,
      'ruleInstName':this.THGYCS,
      'orderBatch':this.THDD,
      resultType: "条件B"
    }
      if(this.queryParam1){
        this.queryParamsMain.push( this.queryParamsXZDB)
      }

		return JSON.stringify(this.queryParamsMain)
  }

   loadOperationParamData(params?){
    this.loading1 = true;
    //获取tab3数据
    this.meService.getTab3MultiData
      (
        this.getOrderParams(params),this.pageNum1,this.pageSize1,this.orderBy1)
      .then(
        result => {
          if (result.code == "200") {
          	if(result.data){
            this.dataSet1 = result.data.list;
            this.total1 = result.data.total;
            this.checkedCallback()
           }
          }
          this.loading1 = false;
        },
        err => {
          this.loading1 = false;
          console.log("err");
        }
      );
  }
  	//查询按钮
	tab3Search() {
		this.loadOperationParamData();
	}
   //清空按钮
	clear(){
		this.THJT=''
    this.THGYCS=''
    this.THDD=''
    this.pageNum1=1
        this.pageSize1=10
		this.loadOperationParamData();
	}

  searchOperationParamData (reset: boolean = false): void {
    if(reset){
      this.pageNum1 = 1;
    }
    this.loadOperationParamData();
  }
    loadOrderNumber(param){
    this.meService.selectOrderTab1(
      param.xfqyId,param.startDate,param.endDate
    ).then(result=>{
      if(result && result.code=='200'){
        this.orderBatchSet2 = result.data;
      }
    },err=>{
      console.log("err");
    });
  }


  sortTable1(event, sortArr, sortType){
    this.orderBy1 = `${event.target.parentElement.parentElement.id} ${sortType}`
    this.loadOperationParamData()
  }

//compare(direction, prop) {
//  return function(objOne, objTwo) {
//    var valOne = objOne[prop];
//    var valTwo = objTwo[prop];
//    if (!isNaN(Number(valOne)) && !isNaN(Number(valTwo))) {
//      valOne = Number(valOne);
//      valTwo = Number(valTwo);
//    }
//    if (prop.indexOf("postingDate") >= 0) {
//      valOne = Date.parse(valOne);
//      valTwo = Date.parse(valTwo);
//    }
//    if (
//      prop.indexOf("resourceName") > -1 ||
//      prop.indexOf("ruleInstName") > -1 ||
//      prop.indexOf("eqtName") > -1
//    ) {
//      valOne = pinyin.getFullChars(valOne);
//      valTwo = pinyin.getFullChars(valTwo);
//    }
//    if (direction === "asc") {
//      if (valOne < valTwo) {
//        return -1;
//      } else if (valOne > valTwo) {
//        return 1;
//      } else {
//        return 0;
//      }
//    } else if (direction === "desc") {
//      if (valOne > valTwo) {
//        return -1;
//      } else if (valOne < valTwo) {
//        return 1;
//      } else {
//        return 0;
//      }
//    }
//  };
//}
  Filter = {
    "orderBatch": { "isShow": false, "data": [], "choosed": [] },
  };
  GetTextFilterArray(type: string) {
    this.Filter[type].isShow = true;

  }
  SelectAll(e,data) {
    for (const item of data) {
      item['IsSelected'] = e.target.checked ? true : false;
    }
  }

  IsAll(e, item,data) {
    console.log("重新排序1");
    console.log(item.orderBatch);
    item['IsSelected'] = e.target.checked;
    console.log(item['IsSelected']);
    console.log(e.target.checked);
    const len = data.filter(x => { return x['IsSelected']; }).length;
    console.log(len);
    len === data.length ? document.getElementById('c_all')['checked'] = true : document.getElementById('c_all')['checked'] = false;
  }

 checkedCallback() {
		this.checkedBackThree.emit(this.dataSet1);
	}

  tabs3GetData(params){
    this.loadOperationParamData(params);
  }
  // tabs3GetData2(){
  //   // this.loadOperationParamData();
  // }
 ngOnInit(){
	this.loadOperationParamData()
 }


}

