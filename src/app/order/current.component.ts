import { Component, OnInit, OnDestroy } from '@angular/core';
import { Format } from '../core/common/format.service';
import { OrderService } from './order.service';
import { NzMessageService, NzModalService, UploadFile } from 'ng-zorro-antd';
import { Verify } from '../core/common/verify.service';
import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';
registerLocaleData(zh);
import { LocalStorage } from '../core/common/local.storage';
import {  EXPORT_PPRO_CURRENT} from '../app.constants';
import { DataService } from "../DataService";
 
@Component({
    selector:'current-order',
    templateUrl:'./current.component.html',
    styleUrls:['./current.component.less'],
    providers: []
})

export class CurrentComponent implements OnInit, OnDestroy {
    dateFormat = 'yyyy/MM/dd';
    pageIndex = 1;
    pageSize = 10;
    total = 1;
    dataSet = [];
    loading = true;
    isAdd = false;
    isUpdate = false;
    searchStartDate = null;
    searchEndDate = null;
    listProOption = [];
    listEqtOption = [];
    listSapOption = [];
    search = {
        pro_id:'' 
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
        this.setInit();
        this.export = EXPORT_PPRO_CURRENT;
        this.user_id = dataService.userInfo.value.user.id;
      
    }
    
    ngOnInit(): void {
        this.searchData();
        this.getEqtProductLine();
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
        this.orderService.handleCurrentUpload(formData).then(result=>{
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
            pro_id:'',
            eqt_id:'',
            sap_pror:'',
            last_update_by:this.user.id
        }
        this.update = {
            id:'',
            pro_id:'',
            eqt_id:'',
            sap_pror:'',
            is_finished:0,
            last_update_by:this.user.id
        }
    }

    ngOnDestroy(): void {

    }
    resetForm(): void {
        this.search = {
            pro_id:'', 
        }
        this.searchStartDate = null;
        this.searchEndDate = null;
        this.searchData(true);
    }

   
    searchSubmit():void {
        this.searchData(false);
    }

    searchData(reset: boolean = false):void {
        if (reset) {
            this.pageIndex = 1;
        }
    
        this.loading = true;
        this.orderService.getProductionCurrentInfoList(
            this.search.pro_id, 
             
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
                this.listProOption = result.list;
            }
        } )
    }

    getProductLineEqt(pro_id:string, isFirst?:boolean) {
        this.add.pro_id = pro_id;
        this.add.eqt_id = '';
        this.add.sap_pror = '';
        if(!isFirst) {
            this.update.pro_id = pro_id;
            this.update.eqt_id = '';
            this.update.sap_pror = '';
        }
        
        this.orderService.getProductLineEqt(pro_id).then(result=>{
            if(result.code == 1) {
                this.listEqtOption = result.list;
            }
        })
        this.getProductSapPror(pro_id);
    }

    getProductSapPror(pro_id:string) {
        let time =this.format.dateFormat(new Date());
        if(this.update.starttime_actual) {
            time =  this.update.starttime_actual;
        }
        this.orderService.getProductSapPror(pro_id,time).then(result=>{
            if(result.code == 1) {
                this.listSapOption = result.list;
            }
        })
    }

    showAddModule() {
        this.isAdd = true;
        this.setInit();
    } 

    hideAddModule() {
        this.isAdd = false;
        this.setInit();
    }
    addSubmit() {
        if(this.check(this.add)) {
            this.orderService.addProductionCurrentInf(this.add).then(result=>{
                if(result.code == 1) {
                    this.isAdd = false;
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
        if(this.verify.empty(params.pro_id)) {
            this.message.create('warning', '位置不能为空');
            return;
        } else if(this.verify.empty(params.eqt_id)) {
            this.message.create('warning', '设备不能为空');
            return;
        } else if( this.verify.empty(params.sap_pror)) {
            this.message.create('warning', 'SAP订单不能为空');
            return;
        } 
        return true;
    }

    showUpdateModule(data:any) {
        this.setInit();
        this.isUpdate = true;
        this.update = this.format.extend(true, {}, data);
        this.update.is_finished = 0;
        this.getProductLineEqt(this.update.pro_id,true);
    }

    hideUpdateModule() {
        this.isUpdate = false;
    }

    updateSubmit() {
        if(this.check(this.update)) {
            this.orderService.updateProductionCurrentInfo(this.update).then(result=>{
                if(result.code == 1) {
                    this.isUpdate = false;
                    this.message.create('success', '更新成功');
                    this.searchData(true);
                    this.setInit();
                } else {
                    this.message.create('error', result.msg); 
                }
            })
        }
    }

    deleteModule(id:any) {
        this.modalService.confirm({
            nzTitle  : '<i>您确定要删除这条信息吗?</i>',
            nzOnOk   : () => {
                this.orderService.deleteProductionCurrentInfo(id).then(result=>{
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