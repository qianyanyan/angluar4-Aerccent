import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Format } from '../core/common/format.service';
import { BaseService } from './base.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Verify } from '../core/common/verify.service';
 
@Component({
    selector:'role-index',
    templateUrl:'./role.component.html',
    styleUrls:['./role.component.less'],
    providers: []
})

export class RoleComponent implements OnInit, OnDestroy {
    pageIndex = 1;
    pageSize = 10;
    total = 1;
    dataSet = [];
    loading = true;
    isAddRole = false;
    isUpdateRole = false;
    isShowUser = false;
    search = {
        role_name:'',
    }
    add :any;
    update :any;
    selectModuleList= [];
    moduleList = [];
    eqtList = [];
    selectEqtList= [];
    selectEqtBtnList = [];
    eqtBtnList = [];
    roleId:string;
    isFirst = true;
    constructor(
        private router: Router, 
        private baseService: BaseService,  
        private format: Format,
        private message: NzMessageService,
        private verify:Verify,
        private modalService: NzModalService){
        this.getEqtTree();
        this.setInit();
    }
    
    ngOnInit(): void {
       
    }

    ngAfterViewInit():void {
        this.searchData();
        this.getModuleList();
       
    }
    setInit() {
        this.add = {
            role_name:'',
            description:'',
            module_id:'',
            eqt_id:'',
            eqt_btn_id:'',
            last_update_by:'1'
        }
        this.update = {
            id:'',
            role_name:'',
            description:'',
            module_id:'',
            eqt_id:'',
            eqt_btn_id:'',
            last_update_by:'1'
        }
    }

    selectModulechange($event) {
        this.add.module_id = $event.join(',');
        this.update.module_id = $event.join(',');
      
    }

    selectEqtchange($event) {
        this.add.eqt_id =   $event.join(',');
        this.update.eqt_id  =  $event.join(',');
    }

    selectBtnEqtchange($event) {
        this.add.eqt_btn_id =   $event.join(',');
        this.update.eqt_btn_id  =  $event.join(',');
    }

    showUser(roleId:string) {
        this.roleId =  roleId;
        this.isShowUser = true;
    }

    hideUser() {
        this.isShowUser = false;
    }

    ngOnDestroy(): void {

    }

    resetForm(): void {
        this.search = {
            role_name:'',
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
        this.baseService.getRoleList(this.search.role_name, this.pageIndex, this.pageSize).then(result=>{
            if(result.code == 1) {
                this.dataSet = result.list;
                this.total = result.count;
            }
            this.loading = false;
        }, err=>{
            this.loading = false;
        })
    }

    showAddRoleModule() {
        this.setInit();
        this.isAddRole = true;
        this.selectModuleList = [];
        this.selectEqtList = [];
        this.selectEqtBtnList = [];
    }

    hideAddRoleModule() {
        this.isAddRole = false;
    }
    addRoleSubmit() {
        if(this.verify.empty(this.add.role_name)) {
            this.message.create('warning', '角色名称不能为空');
        } else if( this.verify.empty(this.add.description)) {
            this.message.create('warning', '角色描述不能为空');
        } else {
            this.baseService.addRole(this.add).then(result=>{
                if(result.code == 1) {
                    this.isAddRole = false;
                    this.message.create('success', '添加成功');
                    this.searchData(true);
                    this.setInit();
                } else {
                    this.message.create('error', result.msg); 
                }
            })
        }
    }

    showUpdateRoleModule(data,$event) {
        $event.stopPropagation();
        this.setInit();
        this.update = this.format.extend(true, {}, data);
        this.baseService.getRoleDetailInfo(data.id).then(result=>{
            if(result.code == 1) {
                let selectModuleList = [];
                result.moduleRole.forEach(value => {
                    selectModuleList.push(value.module_id);
                });
                this.selectModuleList = selectModuleList;
                let selectEqtList= [];
                result.DataRolePermission.forEach(value => {
                    selectEqtList.push(value.data_right_id);
                });
                this.selectEqtList = selectEqtList;

                let selectEqtBtnList = [];
                result.BtnRolePermission.forEach(value => {
                    selectEqtBtnList.push(value.data_right_id);
                });
                this.selectEqtBtnList = selectEqtBtnList;

                this.update.module_id = selectModuleList.join(',');
                this.update.eqt_id  = selectEqtList.join(',');
                this.update.eqt_btn_id =  selectEqtBtnList.join(',');
                this.isUpdateRole = true;
            } else {
                this.message.create('error', result.msg); 
            }
        })
    }

    hideUpdateRoleModule() {
        this.setInit();
        this.isUpdateRole = false;
    }

    updateRoleSubmit() {
        if(this.verify.empty(this.update.role_name)) {
            this.message.create('warning', '角色名称不能为空');
        } else if( this.verify.empty(this.update.description)) {
            this.message.create('warning', '角色描述不能为空');
        } else {
            this.baseService.updateRole(this.update).then(result=>{
                if(result.code == 1) {
                    this.isUpdateRole = false;
                    this.message.create('success', '更新成功');
                    this.searchData(true);
                    this.setInit();
                } else {
                    this.message.create('error', result.msg); 
                }
            })
        }
    }

    deleRoleModule(id:any,$event) {
        $event.stopPropagation();
        this.modalService.confirm({
            nzTitle  : '<i>您确定要删除这条信息吗?</i>',
            nzOnOk   : () => {
                this.baseService.deleteRole(id).then(result=>{
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

    getModuleList():void {
        this.baseService.getModuleList().then((result: any) => {
            if(result.code==1) {
                this.moduleList = result.list;
            } 
        })
    }

    getEqtTree():void {
        this.baseService.getEqtTree().then((result: any) => {
            let list = [];
            if(result.code==1) {
                result.data.forEach((item,index)=>{
                    
                    list.push({
                        id: item.id,
                        eqt_name: item.eqt_name,
                        eqt_type_id:item.eqt_type_id,
                        eqt_type_name:item.eqt_type_name,
                        upper_eqt_id:item.upper_eqt_id
                    })
                })
            } 
 
            this.eqtList = list;
            this.eqtBtnList = list;
        })
    }
}