import { Component, OnInit, OnDestroy } from '@angular/core';
import { Format } from '../core/common/format.service';
import { OrderService } from './order.service';
import { NzMessageService, NzModalService,UploadFile } from 'ng-zorro-antd';
import { Verify } from '../core/common/verify.service';
import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';
registerLocaleData(zh);
import { LocalStorage } from '../core/common/local.storage';
import {  EXPORT_PRO_PLAN} from '../app.constants';
import { DataService } from "../DataService";
 
@Component({
    selector:'planning-order',
    templateUrl:'./planning.component.html',
    styleUrls:['./planning.component.less'],
    providers: []
})

export class PlanningComponent implements OnInit, OnDestroy {
    dateFormat = 'yyyy/MM/dd';
    pageIndex = 1;
    pageSize = 10;
    total = 1;
    dataSet = [];
    loading = true;
    isAddPlan = false;
    isUpdatePlan = false;
    isAddMatl = false;
    searchStartDate = null;
    searchEndDate = null;

    listEqtOption = [];
    search = {
        eqt_id:'',
        startMin:'',
        startMax:'',
        endMin:'',
        endMax:'' 
    }
    add:any;
    update:any;
    user:any;
    startDate = null;
    endDate = null;
    export:string;
    isImport = false;
    import = {
        is_empty:false
    }
    fileList: UploadFile[] = [];
    uploading = false;
    user_id:String;
    constructor(
        private orderService: OrderService,  
        private format: Format,
        private message: NzMessageService,
        private modalService: NzModalService,
        private store:LocalStorage,
        dataService: DataService,
        private verify:Verify){
            let userInfo = store.get("userInfo");
            this.user = userInfo.user;
            this.export = EXPORT_PRO_PLAN;
            this.user_id = dataService.userInfo.value.user.id;
        this.setInit();
    }
    
    ngOnInit(): void {
        this.searchStartDate = [this.fun_date(-7),this.fun_date(7)];
        if(this.searchStartDate != null) {
            this.search.startMin  = this.format.dateFormat(this.searchStartDate[0]);
            this.search.startMax  = this.format.dateFormat(this.searchStartDate[1]);
        } 
        this.searchData();
        this.getEqtProductLine();
    }

    fun_date(aa){
        var date1 = new Date();
        var date2 = new Date(date1);
        date2.setDate(date1.getDate()+aa);
        var time2 = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
        return time2;
    }

    beforeUpload = (file: UploadFile): boolean => {
        this.fileList = [file];
        return false;
    }

    handleUpload(): void {
        const formData = new FormData();
    
        this.fileList.forEach((file: any) => {
        formData.append('file', file);
         
        });
  
        formData.append('is_empty', this.import.is_empty ? '1' : '0');
     
        
        this.uploading = true;
        this.orderService.handlePlaningUpload(formData).then(result=>{
            this.uploading = false;
            if(result.code == 1) {
                this.isImport = false;
                this.fileList = [];
                this.searchData(true);
                this.message.success('上传成功');
            } else {
                this.message.error(result.msg); 
            }
        },err=>{
            this.uploading = false;
            this.message.error('上传失败');
        })
    }

    setInit() {
        this.startDate = null;
        this.endDate = null;
        this.add = {
            eqt_id:'',
            sap_pror:'',
            sap_bacnb:'',
            erp_matl_code:'',
            matl_name:'',
            prodqty_planned_pc:'',
            prodqty_planned_hl:'',
            brand_id:'',
            remark:'',
            starttime_planned:'',
            endtime_planned:'',
            last_update_by:this.user.id
        }
        this.update = {
            id:'',
            eqt_id:'',
            sap_pror:'',
            sap_bacnb:'',
            erp_matl_code:'',
            matl_name:'',
            prodqty_planned_pc:'',
            prodqty_planned_hl:'',
            brand_id:'',
            remark:'',
            starttime_planned:'',
            endtime_planned:'',
            last_update_by:this.user.id
        }
    }

    ngOnDestroy(): void {

    }
    resetForm(): void {
        this.search = {
            eqt_id:'',
            startMin:'',
            startMax:'',
            endMin:'',
            endMax:'' 
        }
        this.searchStartDate = null;
        this.searchEndDate = null;
        this.searchData(true);
    }

    searchSubmit():void {
        this.search.startMin  = '';
        this.search.startMax = '';
        this.search.endMin  = '';
        this.search.endMax = '';
        if(this.searchStartDate != null) {
            this.search.startMin  = this.format.dateFormat(this.searchStartDate[0]);
            this.search.startMax  = this.format.dateFormat(this.searchStartDate[1]);
        } 
        if(this.searchEndDate != null) {
            this.search.endMin = this.format.dateFormat(this.searchEndDate[0]);
            this.search.endMax = this.format.dateFormat(this.searchEndDate[1]);
        } 
        this.searchData(false);
    }

    searchData(reset: boolean = false):void {
        if (reset) {
            this.pageIndex = 1;
        }
    
        this.loading = true;
        this.orderService.getProductionPlanList(
            this.search.eqt_id, 
            this.search.startMin,
            this.search.startMax,
            this.search.endMin,
            this.search.endMax,
            this.pageIndex, 
            this.pageSize).then(result=>{
            if(result.code == 1) {
                this.dataSet = result.list;
                this.total = result.count;
            }
            this.loading = false;
        }, err=>{
            this.loading = false;
        })
    }

    getEqtProductLine() {
        this.orderService.getEqtProductLine().then(result=>{
            if(result.code == 1) {
                console.log(result);
                this.listEqtOption = result.list;
            }
        } )
    }
    showAddMatlModule() {
        this.isAddMatl =true;
    }

    hideAddMatlModule() {
        this.isAddMatl =false;
    }

    matlChange(data:any) {
        // if(data) {
        //     this.add.erp_matl_code = data.erp_matl_code
        //     this.add.matl_name =  data.matl_name
        //     this.update.erp_matl_code = data.erp_matl_code
        //     this.update.matl_name =  data.matl_name
        //     this.isAddMatl =false;
        // }
    }

    showAddPlanModule() {
        this.isAddPlan = true;
        this.setInit();
    } 

    hideAddPlanModule() {
        this.isAddPlan = false;
        this.setInit();
    }
    addPlanSubmit() {
        if(this.check(this.add)) {
            //生产订单号
            let short_name = '';
            this.listEqtOption.forEach(item=>{
                if(item.id == this.add.eqt_id) {
                    short_name = item.short_name;
                }
            })
            
            this.add.starttime_planned =  this.format.dateFormat(this.startDate);
            let dateTinme = new Date(this.startDate);
            let y = dateTinme.getFullYear()+"";
            let m = (dateTinme.getMonth()+1)>10 ?  (dateTinme.getMonth()+1) :"0"+(dateTinme.getMonth()+1);
            let d = (dateTinme.getDate()+1)>10 ? dateTinme.getDate() :"0"+dateTinme.getDate();
            let time = y+m+d;
            this.add.sap_pror =  short_name+this.add.erp_matl_code+time;
            this.add.endtime_planned =  this.format.dateFormat(this.endDate);
            this.orderService.addProductionPlan(this.add).then(result=>{
                if(result.code == 1) {
                    this.isAddPlan = false;
                    this.message.create('success', '添加成功');
                    this.searchData(true);
                    this.setInit();
                } else {
                    this.message.create('error', result.msg); 
                }
            })
        }
    }

    check(params:any) {
        if(this.verify.empty(params.eqt_id)) {
            this.message.create('warning', '位置不能为空');
            return;
        } else if( this.verify.empty(params.erp_matl_code)) {
            this.message.create('warning', '物料号不能为空');
            return;
        }  else if( this.verify.empty(params.matl_name)) {
            this.message.create('warning', '物料描述不能为空');
            return;
        }  else if(this.verify.empty(params.prodqty_planned_pc)) {
            this.message.create('warning', '计划产量（PC）不能为空');
            return;
        } else if( this.verify.empty(params.prodqty_planned_hl)) {
            this.message.create('warning', '计划产量（HL）不能为空');
            return;
        }  else if( this.verify.empty(params.brand_id)) {
            this.message.create('warning', '品牌不能为空');
            return;
        }  else if(this.startDate == null ) {
            this.message.create('warning', '计划开始时间不能为空');
            return;
        }  
        return true;
    }

    showUpdatePlanModule(data:any) {
        this.setInit();
        this.isUpdatePlan = true;
        this.update = this.format.extend(true, {}, data);
        this.startDate =  this.update.starttime_planned
        this.endDate =  this.update.endtime_planned
        this.update.last_update_by =  this.user.id;
    }

    hideUpdatePlanModule() {
        this.isUpdatePlan = false;
    }

    updatePlanSubmit() {
        if(this.check(this.update)) {
            this.update.starttime_planned =  this.format.dateFormat(this.startDate);
            this.update.endtime_planned =  this.format.dateFormat(this.endDate);
            this.orderService.updateProductionPlan(this.update).then(result=>{
                if(result.code == 1) {
                    this.isUpdatePlan = false;
                    this.message.create('success', '更新成功');
                    this.searchData(true);
                    this.setInit();
                } else {
                    this.message.create('error', result.msg); 
                }
            })
        }
    }

    deleteEmpModule(id:any) {
        this.modalService.confirm({
            nzTitle  : '<i>您确定要删除这条信息吗?</i>',
            nzOnOk   : () => {
                this.orderService.deleteProductionPlan(id).then(result=>{
                    if(result.code == 1) {
                        this.message.create('success', '删除成功');
                        this.searchData(true);
                    } else {
                        this.message.create('error', result.msg); 
                        return false;
                    }
                })
            }
        });
    }
}