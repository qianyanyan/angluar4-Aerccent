import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { NzMessageService, NzModalService, UploadFile } from "ng-zorro-antd";
import { Format } from "../core/common/format.service";
import { MEService } from "./me.service";
import { CommonUtil } from "../core/common/common-util.service";
import zh from "@angular/common/locales/zh";
import { registerLocaleData } from "@angular/common";
registerLocaleData(zh);
import { LocalStorage } from "../core/common/local.storage";

@Component({
  selector: "me-index",
  templateUrl: "./me-index.component.html",
  styleUrls: ["./me-index.component.less"],
  providers: [MEService]
})
export class MEIndexComponent implements OnInit {
  //工厂默认id
  WHID;
  pageIndex = 1;
  pageSize = 10;
  role_name = "";
  dateFormat = "yyyy-MM-dd";
  startValue = null;
  endValue = null;
  endOpen: boolean = false;
  startDate: string;
  endDate: string;
  nzOptions;
  zzjgTreeResult = {};
  factory;
  factoryDQZ = "0";
  factoryMTD = "0";
  factoryYTD = "0";
  factoryYTDMBZ = "0";
  factoryBZZL = "0";
  factoryBZZLYTD = "0";
  nzb = "0";
  bzb = "0";
  nzrq = "0";
  nzlq = "0";

  abc: string;
  eqtId: string;
  zzjgName: string;
  Start;
  End;
  isSider = false;
  side = true;
  width = 200;
  constructor(
    private router: Router,
    private meService: MEService,
    private messageService: NzMessageService,
    private format: Format
  ) {
    // 监听路由变化
    this.router.events.subscribe((event: NavigationEnd) => {
      let urlList = this.router.url.split("?");
      //          console.log(urlList)
      if (urlList[0] && urlList[0] == "/me") {
        this.side = true;
      } else {
        this.side = false;
      }
    });
    //存储组织机构信息
    //加载组织架构
    this.meService.getZZJG().then(
      result => {
        var av = CommonUtil.setTreeData(
          result,
          "id",
          "upperEqtId",
          "children",
          ""
        );
        this.nzOptions = av;
        console.log(this.nzOptions);
        if (result) {
          for (let i = 0, item; (item = result[i]); i++) {
            if (item) {
              this.zzjgTreeResult[item.id] = item;
            }
          }
        }
      },
      err => {
        console.log("err");
      }
    );
  }

  public values: any[] = null;

  /**
   * tree 改变事件
   * @param values
   */
  public onChanges(values: any): void {
    this.values = values;
    const leg = values.length - 1;
    this.eqtId = values[leg];
    let item = this.zzjgTreeResult[this.eqtId];
    if (item) {
      this.zzjgName = item.shortName;
    }
    this.eqtId = values[leg];
  }

  //测导航栏时间选择
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

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endOpen = true;
    }
  }

  handleEndOpenChange(open: boolean): void {
    this.endOpen = open;
  }

  getEqtType(eqtid) {
    let item = this.zzjgTreeResult[eqtid];
    if (item) {
      return item.eqtType;
    }
    return null;
  }

  goToSecondByArea(zfqyName, zfqyType) {
    let eqtType = this.getEqtType(this.eqtId);
    if (eqtType && eqtType == "Plant") {
      let plantId = this.eqtId;
      this.meService.selectEqtId(plantId, zfqyType, "Area").then(
        result => {
          this.gotoSuccess(plantId, zfqyName, result);
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.messageService.error("请选择工厂级别");
    }
  }

  gotoSuccess(plantId, zfqyName, result) {
    let gotoEqtId;
    if (result != null && result.code == "200") {
      gotoEqtId = result.data;
    }
    if (gotoEqtId) {
      this.gotoSecond(
        plantId,
        gotoEqtId,
        zfqyName,
        this.startDate,
        this.endDate
      );
      this.side = false;
    } else {
      this.messageService.error(
        "该[" + zfqyName + "]为找到信息不能查看详情明细"
      );
      return;
    }
  }

  gotoSecond(plantId, eqtId, zfqyName, startT, endT) {
    this.router.navigate(["/me/GXCJ"], {
      queryParams: {
        plantId: plantId,
        id: eqtId,
        zfqy: zfqyName,
        startT: startT,
        endT: endT
      }
    });
  }
  goToSecondBySubArea(zfqyName, zfqyType) {
    let eqtType = this.getEqtType(this.eqtId);
    if (eqtType && eqtType == "Plant") {
      let plantId = this.eqtId;
      this.meService.selectEqtId(plantId, zfqyType, "SubArea").then(
        result => {
          this.gotoSuccess(plantId, zfqyName, result);
        },
        err => {
          console.log(err);
        }
      );
      this.side = false;
    } else {
      this.messageService.error("请选择工厂级别");
    }
  }

  //是否显示侧筛选栏
  showSlider() {
    this.isSider = !this.isSider;
  }
  //确定按钮
  qd() {
    this.isSider = false;
    let param = this.getQueryParam();
    this.loadData(param);
  }
  ZP00=""
  ZP10=""
  ZP20=""
  ZP40=""
  ZP50=""
  ZP60=""
  ZP70=""
  ZP74=""
  ZP76=""
  ZP00LossRatio = "0";
  ZP00DeviationPiSum = "0";
  ZP00TotalPiSum = "0";
  ZP10LossRatio = "0";
  ZP10DeviationPiSum = "0";
  ZP10TotalPiSum = "0";
  ZP20LossRatio = "0";
  ZP20DeviationPiSum = "0";
  ZP20TotalPiSum = "0";
  ZP50LossRatio = "0";
  ZP50DeviationPiSum = "0";
  ZP50TotalPiSum = "0";
  ZP40LossRatio = "0";
  ZP40DeviationPiSum = "0";
  ZP40TotalPiSum = "0";
  ZP60LossRatio = "0";
  ZP60DeviationPiSum = "0";
  ZP60TotalPiSum = "0";
  ZP74LossRatio = "0";
  ZP74DeviationPiSum = "0";
  ZP74TotalPiSum = "0";
  ZP70LossRatio = "0";
  ZP70DeviationPiSum = "0";
  ZP70TotalPiSum = "0";
  ZP76LossRatio = "0";
  ZP76DeviationPiSum = "0";
  ZP76TotalPiSum = "0";

  getQueryParam() {
    let param = {};
    if (this.startValue) {
      this.startDate = this.format.dateFormat(this.startValue);
    } else {
      this.startDate = null;
    }
    if (!this.startDate || this.startDate == "1970-01-01") {
      this.initStartDate();
    }
    if (this.endValue) {
      this.endDate = this.format.dateFormat(this.endValue);
    } else {
      this.endDate = null;
    }
    if (!this.endDate || this.endDate == "1970-01-01") {
      this.initEndDate();
    }
    return {
      eqtId: this.eqtId,
      startDate: this.startDate,
      endDate: this.endDate
    };
  }

  //加载数据
  loadData(param) {
    let eqtId, startDate, endDate;
    if (param) {
      eqtId = param.eqtId;
      startDate = param.startDate;
      endDate = param.endDate;
    }
    if (!eqtId) {
      this.messageService.error("请选择组织架构");
      return;
    }
    if (!startDate) {
      this.messageService.error("请选择开始时间");
      return;
    }
    if (!endDate) {
      this.messageService.error("请选择结束时间");
      return;
    }
    this.meService.getZTData(eqtId, startDate, endDate).then(
      result => {
        if (result.code == "200") {
          this.factory = result.data.factory;
          this.factoryDQZ = result.data.factory.lossRatio;
          this.factoryMTD = result.data.factory.mtdTargetValue;
          this.factoryYTD = result.data.factory.ytdRatio;
          this.factoryYTDMBZ = result.data.factory.ytdTargetValue;

          if (result.data.nzb) {
            this.nzb = result.data.nzb.lossRatio;
          } else {
            this.nzb = "0";
          }
          if (result.data.bzb) {
            this.bzb = result.data.bzb.lossRatio;
            this.factoryBZZL = this.forMat(result.data.bzb.outputValueSum);
            this.factoryBZZLYTD = this.forMat(result.data.bzb.ytdTargetValue);
          } else {
            this.bzb = "0";
          }
          if (result.data.nzrq) {
            this.nzrq = result.data.nzrq.lossRatio;
          } else {
            this.nzrq = "0";
          }
          if (result.data.nzlq) {
            this.nzlq = result.data.nzlq.lossRatio;
          } else {
            this.nzlq = "0";
          }

          //酿造热区
          if (result.data.ZP00) {
            this.ZP00LossRatio = result.data.ZP00.lossRatio;
            this.ZP00DeviationPiSum = result.data.ZP00.deviationPiSum;
            this.ZP00TotalPiSum = result.data.ZP00.totalPiSum;
          } else {
            this.ZP00LossRatio = "0";
            this.ZP00DeviationPiSum = "0";
            this.ZP00TotalPiSum = "0";
          }
          if (result.data.ZP10) {
            this.ZP10LossRatio = result.data.ZP10.lossRatio;
            this.ZP10DeviationPiSum = result.data.ZP10.deviationPiSum;
            this.ZP10TotalPiSum = result.data.ZP10.totalPiSum;
          } else {
            this.ZP10LossRatio = "0";
            this.ZP10DeviationPiSum = "0";
            this.ZP10TotalPiSum = "0";
          }

          //酿造冷区
          console.log(result.data);
          if (result.data.ZP20) {
            this.ZP20LossRatio = result.data.ZP20.lossRatio;
            this.ZP20DeviationPiSum = result.data.ZP20.deviationPiSum;
            this.ZP20TotalPiSum = result.data.ZP20.totalPiSum;
          } else {
            this.ZP20LossRatio = "0";
            this.ZP20DeviationPiSum = "0";
            this.ZP20TotalPiSum = "0";
          }
          if (result.data.ZP50) {
            this.ZP50LossRatio = result.data.ZP50.lossRatio;
            this.ZP50DeviationPiSum = result.data.ZP50.deviationPiSum;
            this.ZP50TotalPiSum = result.data.ZP50.totalPiSum;
          } else {
            this.ZP50LossRatio = "0";
            this.ZP50DeviationPiSum = "0";
            this.ZP50TotalPiSum = "0";
          }
          if (result.data.ZP40) {
            this.ZP40LossRatio = result.data.ZP40.lossRatio;
            this.ZP40DeviationPiSum = result.data.ZP40.deviationPiSum;
            this.ZP40TotalPiSum = result.data.ZP40.totalPiSum;
          } else {
            this.ZP40LossRatio = "0";
            this.ZP40DeviationPiSum = "0";
            this.ZP40TotalPiSum = "0";
          }
          if (result.data.ZP60) {
            this.ZP60LossRatio = result.data.ZP60.lossRatio;
            this.ZP60DeviationPiSum = result.data.ZP60.deviationPiSum;
            this.ZP60TotalPiSum = result.data.ZP60.totalPiSum;
          } else {
            this.ZP60LossRatio = "0";
            this.ZP60DeviationPiSum = "0";
            this.ZP60TotalPiSum = "0";
          }

          //包装部
          if (result.data.ZP74) {
            this.ZP74LossRatio = result.data.ZP74.lossRatio;
            this.ZP74DeviationPiSum = result.data.ZP74.deviationPiSum;
            this.ZP74TotalPiSum = result.data.ZP74.totalPiSum;
          } else {
            this.ZP74LossRatio = "0";
            this.ZP74DeviationPiSum = "0";
            this.ZP74TotalPiSum = "0";
          }
          if (result.data.ZP70) {
            this.ZP70LossRatio = result.data.ZP70.lossRatio;
            this.ZP70DeviationPiSum = result.data.ZP70.deviationPiSum;
            this.ZP70TotalPiSum = result.data.ZP70.totalPiSum;
          } else {
            this.ZP70LossRatio = "0";
            this.ZP70DeviationPiSum = "0";
            this.ZP70TotalPiSum = "0";
          }
          if (result.data.ZP76) {
            this.ZP76LossRatio = result.data.ZP76.lossRatio;
            this.ZP76DeviationPiSum = result.data.ZP76.deviationPiSum;
            this.ZP76TotalPiSum = result.data.ZP76.totalPiSum;
          } else {
            this.ZP76LossRatio = "0";
            this.ZP76DeviationPiSum = "0";
            this.ZP76TotalPiSum = "0";
          }
        } else {
          this.factory = "0";
          this.factoryDQZ = "0";
          this.factoryMTD = "0";
          this.factoryYTD = "0";
          this.factoryYTDMBZ = "0";
          this.factoryBZZL = "0";
          this.factoryBZZLYTD = "0";
          this.nzb = "0";
          this.bzb = "0";
          this.nzrq = "0";
          this.nzlq = "0";
          this.ZP00LossRatio = "0";
          this.ZP00DeviationPiSum = "0";
          this.ZP00TotalPiSum = "0";
          this.ZP10LossRatio = "0";
          this.ZP10DeviationPiSum = "0";
          this.ZP10TotalPiSum = "0";
          this.ZP20LossRatio = "0";
          this.ZP20DeviationPiSum = "0";
          this.ZP20TotalPiSum = "0";
          this.ZP50LossRatio = "0";
          this.ZP50DeviationPiSum = "0";
          this.ZP50TotalPiSum = "0";
          this.ZP40LossRatio = "0";
          this.ZP40DeviationPiSum = "0";
          this.ZP40TotalPiSum = "0";
          this.ZP60LossRatio = "0";
          this.ZP60DeviationPiSum = "0";
          this.ZP60TotalPiSum = "0";
          this.ZP74LossRatio = "0";
          this.ZP74DeviationPiSum = "0";
          this.ZP74TotalPiSum = "0";
          this.ZP70LossRatio = "0";
          this.ZP70DeviationPiSum = "0";
          this.ZP70TotalPiSum = "0";
          this.ZP76LossRatio = "0";
          this.ZP76DeviationPiSum = "0";
          this.ZP76TotalPiSum = "0";
        }
      },
      err => {
        console.log("err");
      }
    );
  }
  forMat(num) {
    var reg = /\d{1,3}(?=(\d{3})+$)/g;
    return (num + "").replace(reg, "$&,");
  }

  //取消按钮
  qx() {
    this.isSider = false;
  }
  ngOnInit() {
    //获取工厂默认id
    this.meService.getFactoryID("CN54").then(
      result => {
        console.log(result);
        this.eqtId = result.data.id;
        let param = this.getQueryParam();
        this.loadData(param);
        this.zzjgName = result.data.shortName;
        this.abc = result.data.shortName;
      },
      err => {
        console.log("err");
      }
    );
    // this.zzjgName = "武汉工厂";
    // this.abc = "武汉工厂";
    this.initDefaultQuery();
    //    总图订单类型
    this.meService.getShortName().then(result => {
	  console.log(result.data);
	  this.ZP00=result.data.ZP00
	  this.ZP10=result.data.ZP10
	  this.ZP20=result.data.ZP20
	  this.ZP40=result.data.ZP40
	  this.ZP50=result.data.ZP50
	  this.ZP60=result.data.ZP60
	  this.ZP70=result.data.ZP70
	  this.ZP74=result.data.ZP74
	  this.ZP76=result.data.ZP76
    });
  }

  initDefaultQuery() {
    this.initStartDate();
    this.initEndDate();
  }
  initStartDate() {
    const initStartDate = new Date();
    initStartDate.setDate(1);
    const startDate = this.format.dateFormat(initStartDate);
    this.startDate = startDate;
    this.Start = startDate;
  }
  initEndDate() {
    const endDate = this.format.dateFormat(new Date());
    this.endDate = endDate;
    this.End = endDate;
  }
}
