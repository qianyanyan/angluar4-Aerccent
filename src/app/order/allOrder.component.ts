import { Component, OnInit, OnDestroy } from '@angular/core';
import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';
import { Format } from "../core/common/format.service";
import { ViewChild } from '@angular/core';
registerLocaleData(zh);
import { LocalStorage } from '../core/common/local.storage';
import { DataService } from "../DataService";
import { OrderReviewComponent } from './order-review/order-review.component';
import { InputOutputComponent } from './input-output/input-output.component';
import { AllOrderService } from './allOrder.service';
import { Verify } from '../core/common/verify.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { OrderDataService } from './orderDataService';

@Component({
  selector: 'allOrder-order',
  templateUrl: './allOrder.component.html',
  styleUrls: ['./allOrder.component.less'],
  providers: []
})

export class AllOrderComponent implements OnInit {
  isVisible = false;
  isConfirmLoading = false;
  boxTitle: string;
  type: string;
  gigrDate = null;
  orderDate = null;
  dateFormat = 'yyyy/MM/dd';
  search = {
    plantCode: null,
    shopOrderTypeId: null,
    workCenterId: null,
    scadaOrderId: '',
    matlId: null,
    orderStartDate: '',
    orderEndDate: '',
    shiftCategoryId: null,
    gigrStartDate: '',
    gigrEndDate: '',
  }
  dataSet = [];
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = true;

  @ViewChild(OrderReviewComponent)
  private orderReview: OrderReviewComponent;
  @ViewChild(InputOutputComponent)
  private inputOutput: InputOutputComponent;

  listPlantOption = [];
  listOrderTypeOption = [];
  listWorkCenterOption = [];
  listPlantMatlOption = [];
  listShiftCategoryOption = [];
  isShowSerach = true;
  constructor(
    private store: LocalStorage,
    private data: DataService,
    private format: Format, 
    private message: NzMessageService,
    private allOrderService: AllOrderService,
    private orderDataService: OrderDataService
  ) {
    this.type = '订单总览'; 
    this.gigrDate = [this.format.nowTime(), this.format.nowTime()];
    this.orderDate = [this.format.nowTime(), this.format.nowTime()];
  
  }

  

  ngOnInit(): void {
    this.getSelectPlantOption();
    this.getSelectShopOrderTypeOption();
    this.getSelectUnitList(); 
 
    
  }

   

  resetForm(): void {
    let plantCode = this.search.plantCode;
    let shopOrderTypeId = this.search.shopOrderTypeId;
    this.search = {
      plantCode: plantCode,
      shopOrderTypeId: shopOrderTypeId,
      workCenterId: null,
      scadaOrderId: '',
      matlId: null,
      orderStartDate: '',
      orderEndDate: '',
      shiftCategoryId: null,
      gigrStartDate: '',
      gigrEndDate: '',
    }
    this.gigrDate = [this.format.nowTime(), this.format.nowTime()];
    this.orderDate = [this.format.nowTime(), this.format.nowTime()];
    this.orderReview.clearData();
    this.inputOutput.clearData(); 
  }

  

  typeChage(type) {
    if (type == '订单总览') {
      this.data.changeMessage("批量订单查询/订单总览");
    } else if (type == '订单投入产出') {
      this.data.changeMessage("批量订单查询/订单投入产出");
    }
    this.type = type;
    this.store.set("orderTab", this.type);
  }

  getSelectPlantOption() {
    this.allOrderService.selectPlantOption().then(result => {
      if (result.code == 200) {
        result.data.forEach(item => {
          this.listPlantOption.push({
            label: item.label,
            value: item.keyValue
          })
          if(item.keyValue=="CN54") {
            this.search.plantCode = item.keyValue;
            this.selectPlant(this.search.plantCode);
          }
        });
        this.orderDataService.changePlantList(this.listPlantOption);
        // if (this.listPlantOption.length > 0) {
        //   this.search.plantCode = this.listPlantOption[0].value;
        //   this.selectPlant(this.search.plantCode);
        // }
      }  
    })
  }

  getSelectShopOrderTypeOption() {
    this.allOrderService.selectShopOrderTypeOption().then(result => {
      if (result.code == 200) {
        result.data.forEach(item => {
          this.listOrderTypeOption.push({
            label: item.label,
            value: item.keyValue
          }) 
          if (item.keyValue=="10") {
            this.search.shopOrderTypeId = item.keyValue;
            this.getSelectPlantMatlOption(this.search.plantCode, this.search.shopOrderTypeId);
          }
        });
        this.orderDataService.changeShopOrderTypeList(this.listOrderTypeOption);
        // if (this.listOrderTypeOption.length>0) {
        //   this.search.shopOrderTypeId = this.listOrderTypeOption[0].value;
        //   this.getSelectPlantMatlOption(this.search.plantCode, this.search.shopOrderTypeId);
        // } 
      }
    })
  }
  selectPlant(value) { 
    this.getSelectWorkCenterOption(value);
    this.getSelectShiftCategoryOption(value);
   // this.getSelectScadaOpRunIdOption(value);
    if(this.search.shopOrderTypeId) {
      this.getSelectPlantMatlOption(value, this.search.shopOrderTypeId);
    }
  }
  
  selectOrderType(value) { 
    this.getSelectPlantMatlOption(this.search.plantCode,value);
  }

  getSelectWorkCenterOption(plantCode:string ) {
    this.listWorkCenterOption = [];
    this.search.workCenterId = null;
    this.allOrderService.selectWorkCenterOption(plantCode).then(result => {
      if (result.code == 200) {
        result.data.forEach(item => {
          this.listWorkCenterOption.push({
            label: item.label,
            value: item.keyValue
          })
        });
        this.orderDataService.changeWorkCenterList(this.listWorkCenterOption);
      }
    })
  }

  getSelectPlantMatlOption(plantCode: string, shopOrderTypeId:string) {
    if(plantCode && shopOrderTypeId) {
      this.listPlantMatlOption = [];
      this.search.matlId = null;
      this.allOrderService.selectPlantMatlOption(plantCode, shopOrderTypeId).then(result => {
        if (result.code == 200) {
          result.data.forEach(item => {
            this.listPlantMatlOption.push({
              label: item.label,
              value: item.keyValue
            })
          });

          this.orderDataService.changePlantMatlList(this.listPlantMatlOption);
        }
      })
    }
   
  }

  getSelectUnitList() {
   let listUnitOption = [];
    this.allOrderService.selectUnitList().then(result => {
      if (result.code == 200) {
        result.data.forEach(item => {
          listUnitOption.push({
            label: item.label,
            value: item.keyValue
          })
        });
        this.orderDataService.changeUnitList(listUnitOption);
      }
    })
  }

  getSelectShiftCategoryOption(plantCode: string) {
    this.listShiftCategoryOption = [];
    this.search.shiftCategoryId = null;
    this.allOrderService.selectShiftCategoryOption(plantCode).then(result => {
      if (result.code == 200) {
        result.data &&  result.data.data.forEach(item => {
          this.listShiftCategoryOption.push({
            label: item.label,
            value: item.keyValue
          })
        }); 
        this.orderDataService.changeShiftCategoryList(this.listShiftCategoryOption);
        if (result.data && result.data.defaultValue) {
          this.search.shiftCategoryId = result.data.defaultValue+"";
        }
        
        // if (this.listShiftCategoryOption.length>0) {
        //    this.search.shiftCategoryId = this.listShiftCategoryOption[0].value;
        // }
      }
    })
  }

   

  searchSubmit(): void {  
    if (this.orderDate != null && this.orderDate.length>1) {
      this.search.orderStartDate = this.format.dateFormat(this.orderDate[0]);
      this.search.orderEndDate = this.format.dateFormat(this.orderDate[1]);
    } else {
      this.search.orderStartDate = '';
      this.search.orderEndDate = '';
    }
    if (this.gigrDate != null && this.gigrDate.length > 1) {
      this.search.gigrStartDate = this.format.dateFormat(this.gigrDate[0]);
      this.search.gigrEndDate = this.format.dateFormat(this.gigrDate[1]);
    } else {
      this.search.gigrStartDate = '';
      this.search.gigrEndDate = '';
    }

    if (this.search.plantCode==null) {
      this.message.create('warning', '请选择工厂');
      return;
    }

    if (this.search.shopOrderTypeId == null) {
      this.message.create('warning', '请选择订单类型');
      return;
    }

    // if (this.gigrDate == null) {
    //   this.message.create('warning', '记账日期');
    //   return;
    // }
    this.isShowSerach = false;
    this.orderReview.searchData(); 
    this.inputOutput.searchData(); 
  }

  ngOnDestroy(): void {
    this.store.set("orderTab", "");
  }
}
