import { Component, OnInit, OnDestroy } from '@angular/core';
import { Format } from '../core/common/format.service';
import { BaseService } from './base.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Verify } from '../core/common/verify.service';
 
@Component({
    selector:'emp-index',
    templateUrl:'./emp.component.html',
    styleUrls:['./emp.component.less'],
    providers: []
})

export class EmpComponent implements OnInit, OnDestroy {
    pageIndex = 1;
    pageSize = 10;
    total = 1;
    dataSet = [];
    loading = true;
    isAddEmp = false;
    isUpdateEmp = false;

    search = {
        emp_no:'',
        employee_name:''
    }
    add:any;
    update:any;
    constructor(
        private baseService: BaseService,  
        private format: Format,
        private message: NzMessageService,
        private modalService: NzModalService,
        private verify:Verify){
        this.setInit();
    }
    
    ngOnInit(): void {
        this.searchData();
    }

    setInit() {
        this.add = {
            emp_no:'',
            employee_name:'',
            mobile_phone:'',
            biz_phone:'',
            email:'',
            last_update_by:'1'
        }
        this.update = {
            id:'',
            emp_no:'',
            employee_name:'',
            mobile_phone:'',
            biz_phone:'',
            email:'',
            last_update_by:'1'
        }
    }

    ngOnDestroy(): void {

    }
    resetForm(): void {
        this.search = {
            emp_no:'',
            employee_name:''
        }
        this.searchData(true);
    }

    searchSubmit():void {
        this.searchData(true);
    }

    searchData(reset: boolean = false):void {
        if (reset) {
            this.pageIndex = 1;
        }
        this.loading = true;
        this.baseService.getEmpList(this.search.emp_no, this.search.employee_name,this.pageIndex, this.pageSize).then(result=>{
            if(result.code == 1) {
                this.dataSet = result.list;
                this.total = result.count;
            }
            this.loading = false;
        }, err=>{
            this.loading = false;
        })
    }

    showAddEmpModule() {
        this.isAddEmp = true;
        this.setInit();
    } 

    hideAddEmpModule() {
        this.isAddEmp = false;
        this.setInit();
    }
    addEmpSubmit() {
        if(this.verify.empty(this.add.emp_no)) {
            this.message.create('warning', '员工编号不能为空');
        } else if( this.verify.empty(this.add.employee_name)) {
            this.message.create('warning', '员工名称不能为空');
        }  else {
            this.baseService.addEmp(this.add).then(result=>{
                if(result.code == 1) {
                    this.isAddEmp = false;
                    this.message.create('success', '添加成功');
                    this.searchData(true);
                    this.setInit();
                } else {
                    this.message.create('error', result.msg); 
                }
            })
        }
    }

    showUpdateEmpModule(data) {
        this.isUpdateEmp = true;
        this.update = this.format.extend(true, {}, data);
    }

    hideUpdateEmpModule() {
        this.isUpdateEmp = false;
    }

    updateEmpSubmit() {
        if(this.verify.empty(this.update.emp_no)) {
            this.message.create('warning', '员工编号不能为空');
        } else if( this.verify.empty(this.update.employee_name)) {
            this.message.create('warning', '员工名称不能为空');
        }  else {
            this.baseService.updateEmp(this.update).then(result=>{
                if(result.code == 1) {
                    this.isUpdateEmp = false;
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
                this.baseService.deleteEmp(id).then(result=>{
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