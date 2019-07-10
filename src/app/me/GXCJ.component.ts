import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ElementRef } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import { MEService } from "./me.service";
import { Format } from "../core/common/format.service";
import zh from "@angular/common/locales/zh";
import { TabFromcomponent } from "./tabForm.component";
import { TabGYcomponent } from "./tabGY.component";
import { TabProcedure } from "./tabProcedure.component";
//import * as jq from 'jquery';
declare var $: any;
//var $: any;
registerLocaleData(zh);
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { CommonUtil } from "../core/common/common-util.service";
import { Http, URLSearchParams } from "@angular/http";
import {
  exportAddressOrder,
  exportOperation,
  exportOperationParam
} from "../app.constants";

@Component({
  selector: "GXCJ",
  templateUrl: "./GXCJ.component.html",
  styleUrls: ["./GXCJ.component.less"],
  providers: []
})
export class GXCJComponent implements OnInit {
  @ViewChild("bigBtn1")
  bigBtn1: TabFromcomponent;

  @ViewChild("bigBtn2")
  bigBtn2: TabProcedure;

  @ViewChild("bigBtn3")
  bigBtn3: TabGYcomponent;
  TabIndex = 1;
  searchCode = 1;
  //测导航栏时间选择
  dateFormat = "yyyy-MM-dd";
  startValue = null;
  endValue = null;
  endOpen: boolean = false;
  Start;
  End;
  startDate: string;
  endDate: string;
  startValue1 = null;
  endValue1 = null;
  startDate1: string;
  endDate1: string;
  endOpen1: boolean = false;
  Start1;
  End1;
  dataSet = [];
  loading = false;
  loading2 = false;
  dataSet2 = [];
  dataSet1 = [];
  //用于存储订单号订单tab
  orderBatchSet2 = [];
  XFQYId;
  XFQYId1;
  loading1 = false;

  TlossRatio = "0";
  TlossSum = "0";
  TinputExtractSum = "0";
  TlossRatio1 = "0";
  TlossSum1 = "0";
  TinputExtractSum1 = "0";
  nzOptions;
  zzjgResult = {};
  nzOptions1;
  nzOptions2;
  xfqyResult2 = {};
  nzOptions3;
  xfqyResult3 = {};
  abc3;
  abc2;
  abc1;
  abc;
  plantId: string;
  plantId1: string;
  zzjg = "";
  zzjg1 = "";
  zfqy = "";
  zfqy2 = "";
  lossRatio = "0";
  lossSum = "0";
  inputExtractSum = "0";
  queryParam;
  queryParam1;
  constructor(
    private el: ElementRef,
    private router: Router,
    private meService: MEService,
    private format: Format,
    private activatedRoute: ActivatedRoute,
    private messageService: NzMessageService
  ) {
    //接受传过来的参数
    this.activatedRoute.queryParams.subscribe(params => {
      this.plantId = params["plantId"];
      this.XFQYId = params["id"];
      this.startDate = params["startT"];
      this.endDate = params["endT"];
      this.zfqy = params["zfqy"];
      this.abc2 = params["zfqy"];
    });
    this.startValue = this.startDate;
    this.endValue = this.endDate;
  }

  initStartDate() {
    const initStartDate = new Date();
    initStartDate.setDate(1);
    const startDate = this.format.dateFormat(initStartDate);
    return {
      Start: startDate,
      startDate: startDate
    };
  }
  initEndDate() {
    const endDate = this.format.dateFormat(new Date());
    return {
      End: endDate,
      endDate: endDate
    };
  }
  getQueryParam() {
    let param = {};
    if (this.startValue) {
      this.startDate = this.format.dateFormat(this.startValue);
    } else {
      this.startDate = null;
    }
    if (!this.startDate || this.startDate == "1970-01-01") {
      let start = this.initStartDate();
      this.startDate = start.startDate;
      this.Start = start.Start;
    }
    if (this.endValue) {
      this.endDate = this.format.dateFormat(this.endValue);
    } else {
      this.endDate = null;
    }
    if (!this.endDate || this.endDate == "1970-01-01") {
      let end = this.initEndDate();
      this.End = end.End;
      this.endDate = end.endDate;
    }
    return {
      xfqyId: this.XFQYId,
      startDate: this.startDate,
      endDate: this.endDate,
      resultType: "A"
    };
  }
  getQueryParam1() {
    let param = {};
    if (this.startValue1) {
      this.startDate1 = this.format.dateFormat(this.startValue1);
    } else {
      this.startDate1 = null;
    }
    if (!this.startDate1 || this.startDate1 == "1970-01-01") {
      let start = this.initStartDate();
      this.startDate1 = start.startDate;
      this.Start1 = start.Start;
    }
    if (this.endValue1) {
      this.endDate1 = this.format.dateFormat(this.endValue1);
    } else {
      this.endDate1 = null;
    }
    if (!this.endDate1 || this.endDate1 == "1970-01-01") {
      let end = this.initEndDate();
      this.End1 = end.End;
      this.endDate1 = end.endDate;
    }
    return {
      xfqyId: this.XFQYId1,
      startDate: this.startDate1,
      endDate: this.endDate1,
      resultType: "B"
    };
  }
  //	tabs切换

  //接收子组件传过得值
  //tab1
  checkedBackOne(event) {
    this.dataSet2 = event;
  }
  back() {
       
    history.back();
}
  //tab2
  checkedBackTwo(event) {
    this.dataSet1 = event;
  }
  //tab3
  checkedBackThree(event) {
    this.dataSet = event;
  }

  //	this.cd.detectChanges()
  tabsNum(type) {
    if (type == 1) {
      this.TabIndex = 1;
    } else if (type == 2) {
      this.TabIndex = 2;
    } else if (type == 3) {
      this.TabIndex = 3;
    }
  }
  //下载excel
  downloadFile(url, params) {
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
    var queryParam = JSON.stringify(params);
    // input1.attr("queryParam", queryParam); //设置参数名称
    input1.attr("name", "queryParam"); //设置参数名称
    input1.attr("value", queryParam); //设置参数值
    form.append(input1); //添加到表单中

    form.submit(); //表单提交
    return false;
  }

  DownLoadExcel() {
    if (this.TabIndex == 1) {
      if (this.XFQYId == undefined || this.dataSet2 == undefined) {
        alert("请先查询数据");
        return;
      }
      if (this.dataSet2 == [] || this.dataSet2.length <= 0) {
        alert("暂无数据");
        return;
      }
      let param = this.queryParam;
      this.downloadFile(
        exportAddressOrder,
        this.bigBtn1.queryParamsMain
      );
    } else if (this.TabIndex == 2) {
      if (this.XFQYId == undefined || this.dataSet1 == undefined) {
        alert("请先查询数据");
        return;
      }
      if (this.dataSet1 == [] || this.dataSet1.length <= 0) {
        alert("暂无数据");
        return;
      }
      let param = this.queryParam;
      this.downloadFile(
        exportOperation,
        this.bigBtn2.queryParamsMain
      );
    } else if (this.TabIndex == 3) {
      if (this.XFQYId == undefined || this.dataSet == undefined) {
        alert("请先查询数据");
        return;
      }
      if (this.dataSet == [] || this.dataSet.length <= 0) {
        alert("暂无数据");
        return;
      }
      let param = this.queryParam;
      this.downloadFile(
        exportOperationParam,
        this.bigBtn3.queryParamsMain
      );
    }
  }

  //千分位格式化
  forMat(num) {
    var reg = /\d{1,3}(?=(\d{3})+$)/g;
    return (num + "").replace(reg, "$&,");
  }
  //组织架构
  public values: any[] = null;
  getEqtType(eqtid) {
    let item = this.zzjgResult[eqtid];
    if (item) {
      return item.eqtType;
    }
    return null;
  }
  public zzjgOnChanges(values: any): void {
    this.xfqyChange1();
    this.plantId = null;
    const leg = values.length - 1;
    var plantId = values[leg];
    if (!plantId) {
      this.messageService.error("请选择组织架构");
      return;
    }
    let eqtType = this.getEqtType(plantId);

    if (!eqtType || eqtType != "Plant") {
      this.messageService.error("请选择工厂级别");
      return;
    }
    let item = this.zzjgResult[plantId];
    if (item) {
      // this.abc = item.shortName;
      this.zzjg = item.shortName;
    }
    this.xfqyTreeData1(plantId);
    console.log(plantId);
    this.plantId = plantId;
  }

  xfqyTreeData1(plantId) {
    if (!plantId) {
      this.messageService.error("请选择组织架构");
      return;
    }
    this.queryXfQy(
      plantId,
      result => {
        var av2 = CommonUtil.setTreeData(
          result,
          "id",
          "upperEqtId",
          "children",
          plantId
        );
        this.nzOptions2 = av2;
        console.log(this.nzOptions2);
        if (result) {
          for (let i = 0, item; (item = result[i]); i++) {
            if (item) {
              this.xfqyResult2[item.id] = item;
            }
          }
        }
      },
      err => {
        this.messageService.error("查询细分区域失败");
      }
    );
  }

  xfqyTreeData2(plantId) {
    if (!plantId) {
      this.messageService.error("请选择组织架构");
      return;
    }
    this.queryXfQy(
      plantId,
      result => {
        var av3 = CommonUtil.setTreeData(
          result,
          "id",
          "upperEqtId",
          "children",
          plantId
        );
        this.nzOptions3 = av3;
        if (result) {
          for (let i = 0, item; (item = result[i]); i++) {
            if (item) {
              this.xfqyResult3[item.id] = item;
            }
          }
        }
      },
      err => {
        this.messageService.error("查询细分区域失败");
      }
    );
  }

  queryXfQy(plantId, successFun, failFun) {
    //获取细分区域树状结构
    this.meService.getXFQY(plantId).then(
      result => {
        if (successFun && typeof successFun == "function") {
          successFun(result);
        }
      },
      err => {
        console.log("err");
        failFun(err);
      }
    );
  }

  //细分区域
  public values2: any[] = null;

  public xfqyOnChanges2(values: any): void {
    this.XFQYId = null;
    const leg = values.length - 1;
    let xfqyId = values[leg];
    let item = this.xfqyResult2[xfqyId];
    if (item) {
      this.zfqy = item.shortName;
    }
    this.XFQYId = xfqyId;
  }
  //选择对比细分区域
  public values3: any[] = null;

  public xfqyOnChanges3(values3: any): void {
    const leg = values3.length - 1;
    let xfqyId1 = values3[leg];
    this.XFQYId1 = null;
    let item = this.xfqyResult3[xfqyId1];
    if (item) {
      this.zfqy2 = item.shortName;
    }
    this.XFQYId1 = xfqyId1;
  }
  //选择对比组织架构
  public values1: any[] = null;
  public xfqyChange1() {
    this.abc2 = undefined;
    this.zfqy = null;
    this.XFQYId = null;
  }
  public xfqyChange2() {
    this.abc3 = undefined;
    this.zfqy2 = null;
    this.XFQYId1 = null;
  }

  /**
   * 对比条件组织架构选项改变事件
   * @param values1
   */
  public zzjgOnChanges1(values: any): void {
    this.xfqyChange2();
    this.plantId1 = null;
    const leg = values.length - 1;
    let plantId1 = values[leg];
    if (!plantId1) {
      this.messageService.error("请选择组织架构");
      return;
    }
    let eqtType = this.getEqtType(plantId1);

    if (!eqtType || eqtType != "Plant") {
      this.messageService.error("请选择工厂级别");
      return;
    }
    let item = this.zzjgResult[plantId1];
    if (item) {
      this.zzjg1 = item.shortName;
    }
    this.xfqyTreeData2(plantId1);
    this.plantId1 = plantId1;
  }

  //开始结束时间
  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  onStartChange(date: Date): void {
    this.startValue = date;
  }

  onEndChange(date: Date): void {
    this.endValue = date;
  }

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endOpen = true;
    }
  }

  handleEndOpenChange(open: boolean): void {
    this.endOpen = open;
  }
  //选择对比开始结束时间
  disabledStartDate1 = (startValue1: Date): boolean => {
    if (!startValue1 || !this.endValue1) {
      return false;
    }
    return startValue1.getTime() > this.endValue1.getTime();
  };

  disabledEndDate1 = (endValue1: Date): boolean => {
    if (!endValue1 || !this.startValue1) {
      return false;
    }
    return endValue1.getTime() <= this.startValue1.getTime();
  };

  onStartChange1(date: Date): void {
    this.startValue1 = date;
  }

  onEndChange1(date: Date): void {
    this.endValue1 = date;
  }

  handleStartOpenChange1(open1: boolean): void {
    if (!open) {
      this.endOpen1 = true;
    }
  }

  handleEndOpenChange1(open1: boolean): void {
    this.endOpen1 = open1;
  }
  isShow = false;
  isSliderShow = false;
  isSider = false;
  xzdb() {
    this.isSliderShow = true;
  }
  qx1() {
    this.isSliderShow = false;
  }
  showSlider() {
    this.isSider = !this.isSider;
  }
  qx() {
    this.isSider = false;
    this.isSliderShow = false;
  }
  qd() {
    let param = this.getQueryParam();
    let flg = this.validateParam(param);
    if (!flg) {
      return;
    }

    this.isSider = false;
    this.isSliderShow = false;
    this.queryParam = param;
    // this.queryParam1 = null;
    this.searchHeadSum(param);
    this.bigBtn1.tabs1GetData(this.queryParam);
    this.bigBtn2.tabs2GetData(this.queryParam);
    this.bigBtn3.tabs3GetData(this.queryParam);
  }
  //点击对比项确定按钮显示对比项并进行查询
  qd1() {
    let param = this.getQueryParam1();
    let flg = this.validateParam(param);
    if (!flg) {
      return;
    }
    // this.bigBtn1.tabs1GetData2();
    // this.bigBtn2.tabs2GetData2();
    // this.bigBtn3.tabs3GetData2();
    this.isShow = true;
    this.isSliderShow = false;
    //获取选择对比头部明细数据
    this.queryParam1 = param;
    // console.log(this.queryParam1)
    this.searchHeadSum1(param);
  }

  validateParam(param) {
    if (!param) {
      this.messageService.error("查询参数不能为空");
      return false;
    }
    if (!param.xfqyId) {
      this.messageService.error("请选择细分区域");
      return false;
    }
    if (!param.startDate) {
      this.messageService.error("请选择开始时间");
      return false;
    }
    if (!param.endDate) {
      this.messageService.error("请选择结束时间");
      return false;
    }
    return true;
  }

  queryTBMXData(param, successFun, failFun) {
    if (!param) {
      this.messageService.error("查询参数不能为空");
      return;
    }
    let flg = this.validateParam(param);
    if (!flg) {
      return;
    }
    this.meService
      .getTBMXData(param.xfqyId, param.startDate, param.endDate)
      .then(
        result => {
          if (result.code == "200") {
            if (successFun && typeof successFun == "function") {
              successFun(result.data);
            } else {
              failFun(result);
            }
          }
        },
        err => {
          console.log("err");
        }
      );
  }

  searchHeadSum(param) {
    this.queryTBMXData(
      param,
      data => {
        (this.TlossRatio = "0"),
          (this.TlossSum = "0"),
          (this.TinputExtractSum = "0");
        if (data) {
          this.TlossRatio = data.lossRatio || "0";
          this.TlossSum = this.forMat(data.lossSum) || "0";
          this.TinputExtractSum = this.forMat(data.inputExtractSum) || "0";
        }
      },
      err => {
        this.messageService.error("查询失败," + err.msg);
      }
    );
  }

  searchHeadSum1(param) {
    this.queryTBMXData(
      param,
      data => {
        (this.TlossRatio1 = "0"),
          (this.TlossSum1 = "0"),
          (this.TinputExtractSum1 = "0");
        if (data) {
          this.TlossRatio1 = data.lossRatio || "0";
          this.TlossSum1 = this.forMat(data.lossSum) || "0";
          this.TinputExtractSum1 = this.forMat(data.inputExtractSum) || "0";
        }
      },
      err => {
        this.messageService.error("查询失败," + err.msg);
      }
    );
  }

  getCommonParams() {
    let params = [this.queryParam];
    if (this.queryParam1) params.push(this.queryParam1);

    params.forEach(item => {
      item.eqtId = item.xfqyId;
    });
    return params;
  }

  initZzjg() {
    this.meService.getZZJG().then(
      result => {
        let av = CommonUtil.setTreeData(
          result,
          "id",
          "upperEqtId",
          "children",
          ""
        );
        this.nzOptions = av;
        this.nzOptions1 = av;
        if (result) {
          for (let i = 0, item; (item = result[i]); i++) {
            if (item) {
              if (item.id == this.plantId) {
                this.zzjg = item.shortName;
                this.abc = item.shortName;
              }
              this.zzjgResult[item.id] = item;
            }
          }
        }
      },
      err => {
        console.log("err");
      }
    );
  }

  ngOnInit() {
    this.initZzjg();
    if (this.plantId) {
      this.xfqyTreeData1(this.plantId);
    }
    let startP = this.initStartDate();
    let endP = this.initEndDate();
    if (startP) {
      this.Start = startP.Start;
    }
    if (endP) {
      this.End = endP.End;
    }

    let param = this.getQueryParam();
    this.queryParam = param;
    this.searchHeadSum(param);
  }
}
