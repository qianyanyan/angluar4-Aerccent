import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Format } from "../../core/common/format.service";
import { NzMessageService, NzModalService,UploadFile } from 'ng-zorro-antd';
import { Verify } from "../../core/common/verify.service";
import { OutputDetailService } from "./output-detail.service";
import { AllOrderService } from '../allOrder.service';
import { OrderDataService } from '../orderDataService';

@Component({
  selector: "output-detail",
  templateUrl: "./output-detail.component.html",
  styleUrls: ["./output-detail.component.less"],
  providers: [OutputDetailService]
})

export class OutputDetailComponent implements OnInit, OnDestroy {
  @Input() search: any;
  trendSize:string;
  height:string;
  optionNum = 1;
  loading = false;
  pages = 1;
  plantCode:'';
  erpOrder:'';
  scadaOrderId:'';
  @Input() isQuantity: Boolean;
  @Input() activeGr: boolean;
  @Input() isGowhere: boolean;
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
  @Output() changeGr: EventEmitter<any> = new EventEmitter();//创建实力
  
  //声明事件发射器
  @Output() checkEmitter = new EventEmitter<boolean>();
  dataSet = [];
  add: any;
  isAdd = false;
  update: any;
  isUpdate = false;
  listPlantOption = [];
  listUintOption = [];
  listOrderTypeOption = [];
  listResourceOption = [];
  listPlantMatlOption = [];
  listShiftCategoryOption = [];
  listScadaOpRunIdOption = [];
  listErpBatchOption = [];
  syncList = [];
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

  }
 
 
  ngOnInit(): void {
    this.setInit();
  }


  setInit() {
    this.add = {
      plantCode: null,  //工厂
      unitId: null, //单位
      og: '',  // 原浓
      quantity: '', //数量
      receiptResourceId: null,  //收货订单资源
      receiptScadaOpRunId: null, //收货订单
      receiptMatlId: null, //收货物料
      receiptErpBatchNumber: null, //收货erp批次
      receiptErpBatchNumberList: [],  //收货erp批次手输
      shiftDate: null, //记账日期
      shiftCategoryId: null, //班次
    }
    this.update = {
      plantCode: null,  //工厂
      unitId: null, //单位
      og: '',  // 原浓
      quantity: '', //数量
      receiptResourceId: null,  //收货订单资源
      receiptScadaOpRunId: null, //收货订单
      receiptMatlId: null, //收货物料
      receiptErpBatchNumber: null, //收货erp批次
      receiptErpBatchNumberList: [],  //收货erp批次手输
      shiftDate: null, //记账日期
      shiftCategoryId: null, //班次
    }
  }

  showAdd() {
    // this.message.create('warning', '新增功能暂未开放');
    // return
    //每次添加的时候把之前的数据带过来
    this.listPlantOption = this.orderDataService.plantList;
    this.listPlantMatlOption = this.orderDataService.matlPlantList;
    this.listUintOption = this.orderDataService.unitList;
    this.listShiftCategoryOption = this.orderDataService.shiftCategoryList; 
    this.listOrderTypeOption = this.orderDataService.shopOrderTypeList;
    this.add.plantCode = this.search.plantCode;
    this.shopOrderTypeId = this.search.shopOrderTypeId;
    this.isAdd = true;
    this.getSelectResourceOption(this.add.plantCode);
  }

  toggle() {
    this.checkEmitter.emit(this.isGowhere);
  }


  hideAdd() {
    this.isAdd = false;
    this.setInit();
  }

  addSubmit() {
    //转化手写批次
    if (this.add.receiptErpBatchNumberList.length > 0) {
        this.add.issuedErpBatchNumber = this.add.receiptErpBatchNumberList[0]
    }
    if (this.check(this.add)) {
      //时间转化
      this.add.time = new Date(this.add.shiftDate).getTime();
      this.allOrderService.addGr(this.add).then(result => {
        if (result.code == 200) {
          this.isAdd = false;
          this.changeGr.emit();
        }
        this.message.create('success', result.msg);
      }, error => {
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
    } else if (params.receiptResourceId == null) {
      this.message.create('warning', '请选择收货订单资源');
      return;
    } else if (params.receiptScadaOpRunId == null) {
      this.message.create('warning', '请选择收货订单');
      return;
    } else if (params.receiptMatlId == null) {
      this.message.create('warning', '请选择收货物料');
      return;
    } else if (this.verify.empty(params.issuedErpBatchNumber)) {
      this.message.create('warning', '请输入投入erp批次');
      return;
    } else if (this.verify.empty(params.quantity)) {
      this.message.create('warning', '数量不能为空');
      return;
    } else if (!this.verify.number(params.quantity)) {
      this.message.create('warning', '数量必须输入数字');
      return;
    } else if (params.shiftDate == null) {
      this.message.create('warning', '记账日期不能为空');
      return;
    } else if (params.shiftCategoryId == null) {
      this.message.create('warning', '班次不能为空');
      return;
    } 

    return true;
  }
  showUpdate(id: any) {
    // this.message.create('warning', '修改功能暂未开放');
    // return
    this.setInit();
    this.isUpdate = true;
    this.shopOrderTypeId = this.search.shopOrderTypeId;
    this.listPlantOption = this.orderDataService.plantList;
    this.listUintOption = this.orderDataService.unitList;
    this.listOrderTypeOption = this.orderDataService.shopOrderTypeList;
    this.toUpdateGr(id);
  }

  toUpdateGr(id: any) {
    this.allOrderService.toUpdateGr(id).then(result => {
      if (result.code == 200) {
        if (result.data) {
          this.update = {
            id: result.data.id && result.data.id.toString(),//id
            plantCode: result.data.plantCode, //工厂
            unitId: result.data.unitId && result.data.unitId.toString(),  //单位
            og: result.data.og, //原浓\浸出率
            quantity: result.data.quantity && result.data.quantity.toString(),//数量
            receiptResourceId: result.data.receiptResourceId && result.data.receiptResourceId.toString(),  //收货订单资源
            receiptScadaOpRunId: result.data.receiptScadaOpRunId && result.data.receiptScadaOpRunId.toString(), //收货订单
            receiptMatlId: result.data.receiptMatlId && result.data.receiptMatlId.toString(), //收货物料
            receiptErpBatchNumber: null, //收货erp批次
            receiptErpBatchNumberList: result.data.receiptErpBatchNumber ? [result.data.receiptErpBatchNumber] : [],  //收货erp批次手输
            shiftDate: result.data.shiftDate && this.format.timestampFormat(result.data.shiftDate),  //记账日期
            shiftCategoryId: result.data.shiftCategoryId && result.data.shiftCategoryId.toString(), //班次 
          }
        }
        this.getSelectResourceOption(this.update.plantCode);  //拿当前工厂的资源
        this.getSelectScadaOpRunIdOption(this.update.plantCode, this.update.issuedResourceId);  //拿当前工厂的收货订单
        this.getSelectErpBatchNumberOption(this.update.issuedResourceId, this.update.issuedMatlId);  //拿当前工厂的收货erp批次手输
        this.getSelectShiftCategoryOption(this.update.plantCode)  //拿当前工厂的班次
      }
    })
  }

  hideUpdate() {
    this.isUpdate = false;
    this.setInit();
  }

  updateSubmit() {
    this.message.create('warning', '修改功能暂未开放');
  }

  syncSap() {
    if (this.syncList.length > 0) {
      this.allOrderService.syncGrSap(this.syncList.join()).then(result => {
        if (result.code == 200) {
          this.message.create('success', result.msg);
          this.changeGr.emit();
        } else {
          this.message.create('error', result.msg);
          return false;
        }
      })
    } else {
      this.message.create('warning', '没有可同步数据');
    }

  }

  ngOnDestroy(): void {}

  clearData() {

  }
  delete(id: any) {
    this.modalService.confirm({
      nzTitle: '<i>您确定要删除这条信息吗?</i>',
      nzOnOk: () => {  
        this.allOrderService.deleteGr(id).then(result => {
          if (result.code == 200) {
            this.message.create('success', '删除成功');
            this.changeGr.emit();
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
  selectOrderType(value) {
    //改变订单类型是刷新物料
    let plantCode = this.isAdd ? this.add.plantCode : this.update.plantCode;
    this.getSelectPlantMatlOption(plantCode, value);
  }

  selectResource(value) {
    //选择资源的时候刷新Scada
    let plantCode = this.isAdd ? this.add.plantCode : this.update.plantCode;
    this.getSelectScadaOpRunIdOption(plantCode, value);
  }

  getSelectPlantMatlOption(plantCode: string, shopOrderTypeId: string) {
    //清空物料,获取新的物料列表
    this.listPlantMatlOption = [];
    this.add.receiptMatlId = null;
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

  getSelectResourceOption(plantCode) {
    //清空资源列表
    this.listResourceOption = [];
    this.add.receiptResourceId = null; 
    this.allOrderService.selectResourceOption(plantCode).then(result => {
      if (result.code == 200) {
        result.data.forEach(item => {
          this.listResourceOption.push({
            label: item.label,
            value: item.keyValue
          })
        });
      }
    })
  }

  getSelectScadaOpRunIdOption(plantCode: string, resourceId: string) {
    //根据类型，清空Scada,获取新的Scada列表
    this.add.receiptScadaOpRunId = null;
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
          this.listScadaOpRunIdOption = list;
        }
      }
    })
  }

  selectMatl(value) {
    //选择物料的时候，选择不同类型，获取数据
    let receiptResourceId = this.isAdd ? this.add.receiptResourceId : this.update.receiptResourceId;
    if (receiptResourceId) {
      this.getSelectErpBatchNumberOption(receiptResourceId, value);
    }
  }

  getSelectErpBatchNumberOption(resourceId, matlId) {
    //根据类型，清空ErpBatch,获取新的ErpBatch列表
    this.add.receiptErpBatchNumberList = null;
    this.allOrderService.selectErpBatchNumberOption(resourceId, matlId).then(result => {
      if (result.code == 200) {
        if (result.data) {
          let list = [];
          result.data.forEach(item => {
            list.push({
              label: item.label,
              value: item.keyValue
            })
          });
          this.listErpBatchOption = list;
        }
      }
    })
  }

  getSelectShiftCategoryOption(plantCode: string) {
    //清空班次,获取新的班次列表
    this.listShiftCategoryOption = [];
    this.add.shiftCategoryId = null;
    this.allOrderService.selectShiftCategoryOption(plantCode).then(result => {
      if (result.code == 200) {
        if (result.data) {
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
}
