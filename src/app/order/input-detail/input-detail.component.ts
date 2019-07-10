import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Format } from "../../core/common/format.service";
import { NzMessageService, NzModalService,UploadFile } from 'ng-zorro-antd';
import { Verify } from "../../core/common/verify.service";
import { InputDetailService } from "./input-detail.service";
import { LocalStorage } from "../../core/common/local.storage";
import { EXPORT_MATL } from "../../app.constants";
import { AllOrderService } from '../allOrder.service';
import { OrderDataService } from '../orderDataService';
@Component({
  selector: "input-detail",
  templateUrl: "./input-detail.component.html",
  styleUrls: ["./input-detail.component.less"],
  providers: [InputDetailService]
})

export class InputDetailComponent implements OnInit, OnDestroy {
  @Input() search: any;
  @Input() isQuantity: Boolean; 
  @Input() optionNum:Number;
  @Input() activeGi:boolean;
  @Input() set selectList(selectList: string[]) {
    
    this.dataSet = selectList;
    //每次遍历，看有未同步
    this.syncList = [];
    this.dataSet.forEach(item => {
      if (item.sapSyncStatus != 1) {
        this.syncList.push(item.id);
      } 
    });
  }
  dataSet = [];
  @Output() changeGi: EventEmitter<any> = new EventEmitter();//创建实力
  add: any;
  isAdd = false;
  update: any;
  isUpdate = false;
  listPlantMatlOption = [];
  listUintOption = []; 
  listPlantOption = [];
  listShiftCategoryOption = [];
  listResourceOption = [];
  listWorkCenterOption = [];
  listOrderTypeOption = [];
  listScadaOpRunIdGiOption = [];
  listScadaOpRunIdGrOption = [];
  listErpBatchGiOption = [];
  listErpBatchGrOption = [];
  syncList = [];
  listOfTagOptions = null;
  dateFormat = 'yyyy/MM/dd';
  shopOrderTypeId = null;
  constructor(
    private modalService: NzModalService,
    private allOrderService: AllOrderService,
    private message: NzMessageService,
    private format: Format,
    private orderDataService: OrderDataService,
    private verify: Verify
  ) {
    this.setInit();
  }

   

  ngOnInit(): void {
    
  }

  setInit() { 
    this.add = {
      plantCode: null, //工厂
      unitId: null,  //单位
      og: '',    //原浓\浸出率
      quantity: '',//数量
      issuedResourceId: null, //投入资源
      producingResourceId: null, // 产出资源
      issuedScadaOpRunId: null, //投入scadaid
      producingScadaOpRunId: null, //产出scadaid
      issuedMatlId: null,  //投入物料
      producingMatlId: null, //产出物料
      issuedErpBatchNumber: null, // 投入erp批次
      issuedErpBatchNumberList:[],
      producingErpBatchNumber: null, //生产erp批次
      producingErpBatchNumberList: [], //生产erp批次
      shiftDate: null,  //记账日期
      shiftCategoryId: null, //班次 
      time:""
    }
    this.update = {
      id:'',
      plantCode: null, //工厂
      unitId: null,  //单位
      og: '',    //原浓\浸出率
      quantity: '',//数量
      issuedResourceId: null, //投入资源
      producingResourceId: null, // 产出资源
      issuedScadaOpRunId: null, //投入scadaid
      producingScadaOpRunId: null, //产出scadaid
      issuedMatlId: null,  //投入物料
      producingMatlId: null, //产出物料
      issuedErpBatchNumber: null, // 投入erp批次
      issuedErpBatchNumberList: [],
      producingErpBatchNumber: null, //生产erp批次
      producingErpBatchNumberList: [], //生产erp批次
      shiftDate: null,  //记账日期
      shiftCategoryId: null, //班次 
      time: ""
    }
  }

  ngOnDestroy(): void {}
  showAdd() { 
    // this.message.create('warning', '新增功能暂未开放');
    // return
    //每次添加的时候把之前的数据带过来
    this.add.plantCode = this.search.plantCode;
    this.shopOrderTypeId = this.search.shopOrderTypeId;
    this.listPlantOption = this.orderDataService.plantList;
    this.listPlantMatlOption = this.orderDataService.matlPlantList;
    this.listUintOption = this.orderDataService.unitList;
    this.listShiftCategoryOption = this.orderDataService.shiftCategoryList;
    this.listWorkCenterOption = this.orderDataService.workCenterList;
    this.listOrderTypeOption  = this.orderDataService.shopOrderTypeList;
    this.getSelectResourceOption(this.add.plantCode);
    this.isAdd = true;
  }

  hideAdd() {
    this.isAdd = false;
    this.setInit();
  }

  addSubmit() {
   //转化手写批次
    if (this.add.issuedErpBatchNumberList.length > 0) {
      this.add.issuedErpBatchNumber = this.add.issuedErpBatchNumberList[0]
    }
    if (this.add.producingErpBatchNumberList.length > 0) {
      this.add.producingErpBatchNumber = this.add.producingErpBatchNumberList[0];
    }

    if(this.check(this.add)) {
      this.add.time = new Date(this.add.shiftDate).getTime();
        this.allOrderService.addGi(this.add).then(result => {
          if (result.code == 200) {
            this.isAdd = false;
            this.changeGi.emit();
          } 
          this.message.create('success', result.msg); 
        }, error =>{
            this.message.create('error', error);
        })
    }
  }

  check(params: any) {
    if (params.unitId == null) {
        this.message.create('warning', '请选择单位');
      return
    } else if (this.verify.empty(params.og)) {
      this.message.create('warning', '原浓\浸出率不能为空');
      return;
    } else if (!this.verify.number(params.og)) {
      this.message.create('warning', '原浓\浸必须输入数字');
      return;
    } else if (params.issuedResourceId  == null) {
      this.message.create('warning', '请选择投入资源');
      return;
    } else if (params.producingResourceId == null) {
      this.message.create('warning', '请选择产出资源');
      return;
    } else if (params.issuedScadaOpRunId == null) {
      this.message.create('warning', '请选择投入scadaid');
      return;
    } else if (params.producingScadaOpRunId == null) {
      this.message.create('warning', '请选择产出scadaid');
      return;
    } else if (params.issuedMatlId == null) {
      this.message.create('warning', '请选择投入物料');
      return;
    }
    //  else if (params.producingMatlId == null) {
    //   this.message.create('warning', '请选择产出物料');
    //   return;
    // } 
    else if (this.verify.empty(params.issuedErpBatchNumber))   {
      this.message.create('warning', '请输入投入erp批次');
      return;
    }else if (this.verify.empty(params.quantity)) {
      this.message.create('warning', '数量不能为空');
      return;
    } else if (!this.verify.number(params.quantity)) {
      this.message.create('warning', '数量必须输入数字');
      return;
    }else if (params.shiftDate == null) {
      this.message.create('warning', '记账日期不能为空');
      return;
    } else if (params.shiftCategoryId == null) {
      this.message.create('warning', '班次不能为空');
      return;
    } 
    // else if (params.producingErpBatchNumber == null) {
    //   this.message.create('warning', '请输入生产erp批次');
    //   return;
    // }  
    return true;
  }

  showUpdate(id: any) {
    // this.message.create('warning', '修改功能暂未开放');
    // return
    this.setInit();
    this.isUpdate = true;
    this.shopOrderTypeId = this.search.shopOrderTypeId;
    this.toUpdateGi(id);
    this.listPlantOption = this.orderDataService.plantList;
    this.listUintOption = this.orderDataService.unitList;
    this.listOrderTypeOption = this.orderDataService.shopOrderTypeList;
  }

  toUpdateGi(id: any) {
    this.allOrderService.toUpdateGi(id).then(result => {
      if (result.code == 200) {
          if(result.data) {
            this.update = {
              id: result.data.id && result.data.id.toString(),//id
              plantCode: result.data.plantCode, //工厂
              unitId: result.data.unitId && result.data.unitId.toString(),  //单位
              og: result.data.og,    //原浓\浸出率
              quantity: result.data.quantity && result.data.quantity.toString(),//数量
              issuedResourceId: result.data.issuedResourceId && result.data.issuedResourceId.toString(), //投入资源
              producingResourceId: result.data.producingResourceId && result.data.producingResourceId.toString(), // 产出资源
              issuedScadaOpRunId: result.data.issuedScadaOpRunId && result.data.issuedScadaOpRunId.toString(), //投入scadaid
              producingScadaOpRunId: result.data.producingScadaOpRunId && result.data.producingScadaOpRunId.toString(), //产出scadaid
              issuedMatlId: result.data.issuedMatlId && result.data.issuedMatlId.toString(),  //投入物料
              producingMatlId: result.data.producingMatlId && result.data.producingMatlId.toString(), //产出物料
              issuedErpBatchNumberList: result.data.issuedErpBatchNumber ? [result.data.issuedErpBatchNumber]:[],
              producingErpBatchNumberList: result.data.producingErpBatchNumber ? [result.data.producingErpBatchNumber] : [], //生产erp批次
              shiftDate: result.data.shiftDate && this.format.timestampFormat(result.data.shiftDate),  //记账日期
              shiftCategoryId: result.data.shiftCategoryId && result.data.shiftCategoryId.toString(), //班次 
            } 
          }
        this.getSelectResourceOption(this.update.plantCode);
        this.getSelectScadaOpRunIdOption(this.update.plantCode, this.update.issuedResourceId, 1);
        this.getSelectScadaOpRunIdOption(this.update.plantCode, this.update.producingResourceId, 2);
        this.getSelectShiftCategoryOption(this.update.plantCode);
        this.getSelectErpBatchNumberOption(this.update.issuedResourceId,this.update.issuedMatlId,1);
        this.getSelectErpBatchNumberOption(this.update.producingResourceId, this.update.producingMatlId, 1);
      }
    })
  }

  hideUpdate() {
    this.isUpdate = false;
    this.setInit();
  }
  
  updateSubmit() { 
    //转化手写批次
    if (this.update.issuedErpBatchNumberList.length > 0) {
      this.update.issuedErpBatchNumber = this.update.issuedErpBatchNumberList[0]
    }
    if (this.update.producingErpBatchNumberList.length > 0) {
      this.update.producingErpBatchNumber = this.update.producingErpBatchNumberList[0];
    }
    if (this.check(this.update)) {
      this.update.time = new Date(this.update.shiftDate).getTime();
      this.allOrderService.updateGi(this.update).then(result => {
        if (result.code == 200) {
          this.isUpdate = false;
          this.changeGi.emit();
          this.setInit();
        }
        this.message.create('success', result.msg);
      }, error => {
        this.message.create('error', error);
      })
    }
  }

  syncSap() { 
    if (this.syncList.length>0) {
      this.allOrderService.syncGiSap(this.syncList.join()).then(result => {
        if (result.code == 200) {
          this.message.create('success', result.msg);
          this.changeGi.emit();
          this.setInit();
        } else {
          this.message.create('error', result.msg);
          return false;
        }
      })
    } else {
      this.message.create('warning', '没有可同步数据');
    }
  }

  delete(id: any) {
    this.modalService.confirm({
      nzTitle: '<i>您确定要删除这条信息吗?</i>',
      nzOnOk: () => { 
        this.allOrderService.deleteGi(id).then(result => {
          if (result.code == 200) {
            this.message.create('success', '删除成功');
            this.changeGi.emit();
          } else {
            this.message.create('error', result.msg);
            return false;
          }
        })
      }
    });
  }

  selectPlant(plantCode) { 
    //从新拿示物料
    this.getSelectPlantMatlOption(plantCode, this.shopOrderTypeId);
    //从新拿班次
    this.getSelectShiftCategoryOption(plantCode);
    //从新拿资源
    this.getSelectResourceOption(plantCode);
  }

  getSelectResourceOption(plantCode) {
    //清空资源列表
    this.listResourceOption = [];
    this.add.producingResourceId = null;
    this.add.issuedResourceId = null;
    this.allOrderService.selectResourceOption(plantCode).then(result => {
      if(result.code == 200) {
        result.data.forEach(item => {
          this.listResourceOption.push({
            label: item.label,
            value: item.keyValue
          })
        }); 
      }
    })
  }
 
  selectOrderType(value) {
    //改变订单类型是刷新物料
    let plantCode = this.isAdd ? this.add.plantCode : this.update.plantCode;
    this.getSelectPlantMatlOption(plantCode, value);
  }

  selectResource(value,type) {
    //选择资源的时候刷新Scada
    let plantCode = this.isAdd ? this.add.plantCode : this.update.plantCode;
    this.getSelectScadaOpRunIdOption(plantCode, value, type);
  }
   
  selectMatl(value,type) {
    //选择物料的时候，选择不同类型，获取数据
    let issuedResourceId = this.isAdd ? this.add.issuedResourceId : this.update.issuedResourceId;
    let producingResourceId = this.isAdd ? this.add.producingResourceId : this.update.producingResourceId;
    if(type==1) {
      if (issuedResourceId) {
        this.getSelectErpBatchNumberOption(issuedResourceId, value, type);
      }
    } else {
      if (producingResourceId) {
        this.getSelectErpBatchNumberOption(producingResourceId, value, type);
      }
    }
  }
 
  getSelectPlantMatlOption(plantCode: string, shopOrderTypeId:string) {
    //清空物料,获取新的物料列表
    this.listPlantMatlOption = [];
    this.add.producingMatlId = null;
    this.add.issuedMatlId = null;
    this.allOrderService.selectPlantMatlOption(plantCode, shopOrderTypeId).then(result => {
      if (result.code == 200) {
        result.data.forEach(item => {
          this.listPlantMatlOption.push({
            label: item.label,
            value: item.keyValue
          })
        });
      }
    })
  }

  getSelectShiftCategoryOption(plantCode: string) {
    //清空班次,获取新的班次列表
    this.listShiftCategoryOption = [];
    this.add.shiftCategoryId = null;
    this.allOrderService.selectShiftCategoryOption(plantCode).then(result => {
      if (result.code == 200) {
        if(result.data) {
          result.data.data.forEach(item => {
            this.listShiftCategoryOption.push({
              label: item.label,
              value: item.keyValue
            })
          });
        }
      }
    })
  } 

  getSelectScadaOpRunIdOption(plantCode: string, resourceId: string, type) {
    //根据类型，清空Scada,获取新的Scada列表
    this.allOrderService.selectScadaOpRunIdOption(plantCode, resourceId).then(result => {
      if (result.code == 200) {
        if (result.data) {
          let list = [];
          result.data.forEach(item => {
            list.push({
              label: item.label,
              value: item.keyValue
            })
          });
          if (type == 1) {
            this.add.issuedScadaOpRunId = null;
            this.listScadaOpRunIdGiOption = list;
          } else {
            this.add.producingScadaOpRunId = null;
            this.listScadaOpRunIdGrOption = list;
          }
        }
      } 
    })
  }

  getSelectErpBatchNumberOption(resourceId, matlId,type) {
    //根据类型，清空ErpBatch,获取新的ErpBatch列表
    this.allOrderService.selectErpBatchNumberOption(resourceId,matlId).then(result => {
      if (result.code == 200) {
        if (result.data) {
          let list = [];
          result.data.forEach(item => {
            list.push({
              label: item.label,
              value: item.keyValue
            })
          });
          if (type == 1) {
            this.add.issuedErpBatchNumber = null;
            this.listErpBatchGiOption = list;
          } else {
            this.add.producingErpBatchNumber = null;
            this.listErpBatchGrOption = list;
          }
        }
      }
    })
  }
}
