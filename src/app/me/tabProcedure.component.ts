import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ElementRef } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import { MEService } from "./me.service";
import { Format } from "../core/common/format.service";
import zh from "@angular/common/locales/zh";
//import GXCJComponent from "./GXCJ.component";
// import * as $ from 'jquery';
declare var $: any;
registerLocaleData(zh);
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { CommonUtil } from "../core/common/common-util.service";
import { Http, URLSearchParams } from "@angular/http";
import { WH_XQEXCEL_SERVICE } from "../app.constants";
import {
  exportOperationMX
} from "../app.constants";
@Component({
  selector: "tab-procedure",
  templateUrl: "./tab-procedure.component.html",
  styleUrls: ["./GXCJ.component.less"],
  providers: []
})
export class TabProcedure implements OnInit {
  @Input() eqtId: string;
  @Input() startDate: string;
  @Input() endDate: string;
  @Input() plantId: string;
  @Input() queryParam1;

  @Input() XFQYId1: string;
  @Input() startDate1: string;
  @Input() endDate1: string;

  //向父组件传值
  @Output("checkedTwo") checkedBackTwo = new EventEmitter<any>();
  //物料
  TWL = "";
  //机台
  TJT = "";
  //班次
  TBC = "";
  // 订单
  TDD = "";
  pageNum = 1;
  pageSize = 10;
  orderBatchSet2 = [];
  dataSet = [];
  total;
  loading = false;
  orderBy2 = null;
  queryParamsMain = [];
  queryParamsXZDB = {};
  constructor(
    private el: ElementRef,
    private router: Router,
    private meService: MEService,
    private format: Format,
    private activatedRoute: ActivatedRoute,
    private messageService: NzMessageService
  ) {}

  getParamsMain(params) {
    this.queryParamsMain = [
      {
        eqtId: params ? params.xfqyId : this.eqtId,
        startDate: params ? params.startDate :this.startDate,
        endDate:  params ? params.endDate :this.endDate,
        matlName: this.TWL,
        eqtName: this.TJT,
        shiftCategoryName: this.TBC,
        orderBatch: this.TDD,
        resultType: "条件A"
      }
    ];
  }
  getOrderParams(params) {
    this.getParamsMain(params);
    this.queryParamsXZDB = {
      eqtId: this.XFQYId1,
      startDate: this.startDate1,
      endDate: this.endDate1,
      matlName: this.TWL,
      eqtName: this.TJT,
      shiftCategoryName: this.TBC,
      orderBatch: this.TDD,
      resultType: "条件B"
    };
    if (this.queryParam1) {
      this.queryParamsMain.push(this.queryParamsXZDB);
    }

    return JSON.stringify(this.queryParamsMain);
  }
  loadOperationData(params?) {
    this.loading = true;
    //获取tab2数据
    this.meService
      .getTab2MultiData(
        this.getOrderParams(params),
        this.pageNum,
        this.pageSize,
        this.orderBy2
      )
      .then(
        result => {
          if (result.code == "200") {
            if (result.data) {
              this.dataSet = result.data.list;
              this.total = result.data.total;
              this.checkedCallback();
            }
          }
          this.loading = false;
        },
        err => {
          this.loading = false;
          console.log("err");
        }
      );
  }

  searchOperationData(reset: boolean = false): void {
    if (reset) {
      this.pageNum = 1;
    }
    this.loadOperationData();
  }
  loadOrderNumber(param) {
    this.meService
      .selectOrderTab1(param.xfqyId, param.startDate, param.endDate)
      .then(
        result => {
          if (result && result.code == "200") {
            this.orderBatchSet2 = result.data;
          }
        },
        err => {
          console.log("err");
        }
      );
  }
  //查询按钮
  tab2Search() {
    this.loadOperationData();
  }
  //清空按钮
  clear() {
    this.TWL = "";
    this.TJT = "";
    this.TBC = "";
    this.TDD = "";
    this.pageNum = 1;
    this.pageSize = 10;
    this.loadOperationData();
  }

  sortTable(event, sortArr, sortType) {
    this.orderBy2 = `${
      event.target.parentElement.parentElement.id
    } ${sortType}`;
    this.loadOperationData();
  }
    //下载excel
    downloadMXFile(url, plantId,startDate,endDate) {
      //定义一个form表单,通过form表单来发送请求
      var form = $("<form>");
  
      //设置表单状态为不显示
      form.attr("style", "display:none");
  
      //method属性设置请求类型为post
      form.attr("method", "post");
  
      //action属性设置请求路径,
      //请求类型是post时,路径后面跟参数的方式不可用
      //可以通过表单中的input来传递参数
      form.attr("action", url);
      // form.attr("enctype", 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      $("body").append(form); //将表单放置在web中
  
      //在表单中添加input标签来传递参数
      //如有多个参数可添加多个input标签
      var input1 = $("<input>");
      input1.attr("type", "hidden"); //设置为隐藏域
      var queryParamMX = JSON.stringify({
        plantId:plantId,
        startDate:startDate,
        endDate:endDate
      });
      // input1.attr("queryParam", queryParam); //设置参数名称
      input1.attr("name", "queryParam"); //设置参数名称
      input1.attr("value", queryParamMX); //设置参数值
      form.append(input1); //添加到表单中
  
      form.submit(); //表单提交
      return false;
    }
  
    DownLoadMXExcel() {
        if (this.plantId == undefined) {
          alert("请选择工厂");
          return;
        }
        if (this.queryParamsMain[0].startDate == undefined ) {
          alert("请选择开始日期");
          return;
        }
        if (this.queryParamsMain[0].endDate == undefined) {
          alert("请选择结束日期");
          return;
        }
    
        this.downloadMXFile(
          exportOperationMX,
          this.plantId,
          this.queryParamsMain[0].startDate,
          this.queryParamsMain[0].endDate
        );
   
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
  //      prop.indexOf("ruleInstCode") > -1 ||
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
    orderBatch: {
      isShow: false,
      data: [],
      choosed: []
    }
  };
  GetTextFilterArray(type: string) {
    this.Filter[type].isShow = true;
  }
  SelectAll(e, data) {
    for (const item of data) {
      item["IsSelected"] = e.target.checked ? true : false;
    }
  }

  IsAll(e, item, data) {
    console.log("重新排序1");
    console.log(item.orderBatch);
    item["IsSelected"] = e.target.checked;
    console.log(item["IsSelected"]);
    console.log(e.target.checked);
    const len = data.filter(x => {
      return x["IsSelected"];
    }).length;
    console.log(len);
    len === data.length
      ? (document.getElementById("c_all")["checked"] = true)
      : (document.getElementById("c_all")["checked"] = false);
  }

  checkedCallback() {
    this.checkedBackTwo.emit(this.dataSet);
    console.log(this.dataSet);
  }
  tabs2GetData(params) {
    this.loadOperationData(params);
  }
  // tabs2GetData2(){
  //   // this.loadOperationData();
  // }
  ngOnInit() {
    this.loadOperationData();
  }
}
