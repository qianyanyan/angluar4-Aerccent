import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { Format } from '../core/common/format.service';
import { Verify } from '../core/common/verify.service';
import { BaseService } from './base.service';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
 
@Component({
    selector:'user-index',
    templateUrl:'./user.component.html',
    styleUrls:['./user.component.less'],
    providers: []
})

export class UserComponent implements OnInit, OnDestroy {
    allChecked = false;
    displayData = [];
    indeterminate = false;
    dateFormat = 'yyyy/MM/dd';
    monthFormat = 'yyyy/MM';
    listRoleOption = [];
    listRoleOptions = [];
    listDetOption = [];
    listDepOptions = [];
    selectDate = null;
    addDate = null;
    pageIndex = 1;
    pageSize = 10;
    total = 1;
    dataSet = [];
    loading = true;
    isAddUser = false;
    isUpdateUser = false;
    isAddEmp = false;
    isSetRole = false;
    isSetDept = false;
    add:any;
    update:any;
    search = {
        account_name:'',
        emp_no:'',
        employee_name:'',
        role_name:'',
        add_start_date:'',
        add_end_date:'',
        dept_name:'',
        dep_id: '',
        role_id: ''
    }
    
    addRoleList =[];
    selectDepList = [];
    constructor(
        private message: NzMessageService,
        private format: Format, 
        private baseService: BaseService,
        private modalService: NzModalService,
        private verify:Verify
        ){
        this.listDetOption = [{}]
        this.listRoleOption = [];
    }
    
    ngOnInit(): void {
        this.setInit();
        this.searchData();
        this.getRoleList();
        this.getDepList();
    }

    setInit() {
       this.add = {
            account_name:'',
            password:'',
            emp_id:'',
            emp_no:'',
            employee_name:'',
            dept_id:'',
            role_id:'',
            expire_date:'',
            is_locked:0,
            last_update_by:'1'
        }

        this.update = {
            id:'',
            account_name:'',
            password:'',
            emp_id:'',
            emp_no:'',
            employee_name:'',
            dept_id:'',
            role_id:'',
            expire_date:'',
            is_locked:0,
            last_update_by:'1'
        }
        this.addDate = null;
        this.addRoleList = [];
        this.selectDepList= [];
    }

    setDept():void {
        let list = [];
        this.dataSet.forEach(data => {
            if(data.checked==true){
                list.push(data.id);
            }
        });
        
        if(list.length==0) {
            this.modalService.confirm({
                nzTitle  : '<i>请选择列表</i>',
            });
        } else {
            this.isSetDept  = true;
        }
    }

    getRoleList() {
        this.baseService.getRoleList(null,  1, 100000).then(result=>{
            if(result.code == 1) {
                let list = result.list;
                this.listRoleOption = [];
                list.forEach(value => {
                    this.listRoleOption.push({
                        label:value.role_name,
                        value:value.id
                    })
                });
            }  
        })
    }

    getDepList() {
        this.baseService.getDeptList().then(result=>{
            if(result.code == 1) {
                let list = result.list;
                this.listDetOption = [];
                list.forEach(value => {
                    this.listDetOption.push({
                        label:value.dept_name,
                        value:value.id,
                        id:value.id,
                        dept_name:value.dept_name,
                        parent_dept_id:value.parent_dept_id
                    })
                });
            }  
        })
    }

    setDeptSubmit() {
        let list = [];
        this.dataSet.forEach(data => {
            if(data.checked==true){
                list.push(data.id);
            }
        });
        let user_id = list.join(',');
        this.baseService.setDept(user_id,this.add.dept_id).then(result=>{
            if(result.code == 1) {
                this.isSetDept = false;
                this.message.create('success', '设置部门成功');
                this.searchData(true);
                this.setInit();
            } else {
                this.message.create('error', result.msg); 
            }
        })
    }
    hideDeptModule():void {
        this.isSetDept  = false;
    }

    setRole():void {
        let list = [];
        this.dataSet.forEach(data => {
            if(data.checked==true){
                list.push(data.id);
            }
        });
        
        if(list.length==0) {
            this.modalService.confirm({
                nzTitle  : '<i>请选择列表</i>',
            });
        } else {
            this.isSetRole  = true;
        }
    }
    setRoleSubmit() {
        let list = [];
        this.dataSet.forEach(data => {
            if(data.checked==true){
                list.push(data.id);
            }
        });
        let user_id = list.join(',');
        let role_id = this.addRoleList.join(',');
        this.baseService.setRole(user_id,role_id).then(result=>{
            if(result.code == 1) {
                this.isSetRole = false;
                this.message.create('success', '设置角色成功');
                this.searchData(true);
                this.setInit();
            } else {
                this.message.create('error', result.msg); 
            }
        })
    }

    hideRoleModule():void {
        this.isSetRole  = false;
    }

    addUserSubmit() {
        if(this.verify.empty(this.add.account_name)) {
            this.message.create('warning', '用户名不能为空');
        } else if( this.verify.empty(this.add.password)) {
            this.message.create('warning', '用户密码不能为空');
        } else if(this.add.password.length<4) {
            this.message.create('warning', '密码最少4位数');
        }else if(this.addDate==null) {
            this.message.create('warning', '过期日期不能为空');
        }  else {
            this.add.role_id = this.addRoleList.join(',');
            this.add.expire_date =  this.format.dateFormat(this.addDate);
            this.baseService.addUser(this.add).then(result=>{
                if(result.code == 1) {
                    this.isAddUser = false;
                    this.message.create('success', '添加成功');
                    this.searchData(true);
                    this.setInit();
                } else {
                    this.message.create('error', result.msg); 
                }
            })
        }
    }

    updateUserSubmit() {
        this.update.role_id = this.addRoleList.join(',');
        this.update.expire_date =  this.format.dateFormat(this.addDate);
        this.baseService.updateUser(this.update).then(result=>{
            if(result.code == 1) {
                this.isUpdateUser = false;
                this.message.create('success', '更新成功');
                this.searchData(true);
                this.setInit();
            } else {
                this.message.create('error', result.msg); 
            }
        })
    }

    deleteUser(id:any):void {
        this.modalService.confirm({
            nzTitle  : '<i>您确定要删除这条信息吗?</i>',
            nzOnOk   : () => {
                this.baseService.deleteUser(id).then(result=>{  
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

    empChange($event) { 
        this.add.emp_no = $event.emp_no;
        this.add.employee_name = $event.employee_name;
        this.add.emp_id = $event.id;
        this.update.emp_no = $event.emp_no;
        this.update.employee_name = $event.employee_name;
        this.update.emp_id = $event.id;
        if($event.emp_no) {
            this.isAddEmp = false;
        }
    }

    selectDepchange($event) {
        this.add.dept_id = $event.join(',');
        this.update.dept_id = $event.join(',');
    }

    resetForm(): void {
        this.search = {
            account_name:'',
            emp_no:'',
            employee_name:'',
            role_name:'',
            add_start_date:'',
            add_end_date:'',
            dept_name:'',
            dep_id:'',
            role_id:''
        }
        this.listRoleOptions = [];
        this.listDepOptions = [];
        this.selectDate = null;
        this.searchData(true);
    }

    searchSubmit():void {
        if(this.selectDate != null) {
            this.search.add_start_date  = this.format.dateFormat(this.selectDate[0]);
            this.search.add_end_date = this.format.dateFormat(this.selectDate[1]);
        } else {
            this.search.add_start_date  = '';
            this.search.add_end_date = '';
        }
        
        this.search.role_id = this.listRoleOptions.join(',');
        this.search.dep_id = this.listDepOptions.join(',');
        this.searchData(false);
    }
     
    searchData(reset: boolean = false):void {
        this.allChecked = false;
        this.indeterminate = false;
        if (reset) {
            this.pageIndex = 1;
        }
    
        this.loading = true;
        this.baseService.getUserList(this.search, this.pageIndex, this.pageSize).then(result=>{
            if(result.code == 1) {
                this.dataSet = result.list;
                this.total = result.count;
            }
            this.loading = false;
        }, err=>{
            this.loading = false;
        })
    }

    checkAll(value: boolean): void {
        this.dataSet.forEach(data => data.checked = value);
    }

    refreshStatus() {
        const allChecked = this.dataSet.every(value => value.checked === true);
        const allUnChecked = this.dataSet.every(value => !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
    }

    ngOnDestroy(): void {

    }

    showAddUserModule() {
        this.isAddUser = true;
    }

    hideAddUserModule() {
        this.isAddUser = false;
        this.setInit();
    }

    showUpdateUserModule(data) {
        this.isUpdateUser = true;
        this.update = this.format.extend(true, {}, data);
        this.update.is_locked = Number(this.update.is_locked);
        this.addDate = this.update.expire_date;
        if(this.update.dept_id) {
            this.selectDepList =  this.update.dept_id.split(',');
        }
        
        if(this.update.role_id) {
            this.addRoleList = this.update.role_id.split(',')
        }
    }

    hideUpdateUserModule() {
        this.setInit();
        this.isUpdateUser = false;
    }

    showAddEmpModule() {
        this.isAddEmp = true;
    }
    hideAddEmpModule() {
        this.isAddEmp = false;
    }
}