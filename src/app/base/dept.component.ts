import { Component, OnInit, OnDestroy } from '@angular/core';
import { Format } from '../core/common/format.service';
import { BaseService } from './base.service';
import { NzFormatEmitEvent, NzMessageService, NzTreeNodeOptions, NzModalService } from 'ng-zorro-antd';
import { Verify } from '../core/common/verify.service';
 
@Component({
    selector:'dept-index',
    templateUrl:'./dept.component.html',
    styleUrls:['./dept.component.less'],
    providers: []
})

export class DeptComponent implements OnInit, OnDestroy {
    height:any;
    data:any;
    allDataList:any;
    expandDataCache = {};
    listRoleOption = [];
    isAddDept = false;
    isUpdateDept = false;
    add :any;
    update:any;
    defaultSelectedKeys = [ '0' ];
    nodes: NzTreeNodeOptions[] = [ {
      title   : '根目录',
      key     : '0',
    }];
    isShowTree: boolean;
    loading = true;
    constructor( 
        private baseService: BaseService, 
        private format: Format,    
        private message: NzMessageService,
        private verify:Verify,
        private modalService: NzModalService){
        this.height = (document.body.clientHeight-240)+"px";
        this.isShowTree =false;
        this.setInit();
    }
    
    ngOnInit(): void {
        this.getDeptList();
    }

    ngOnDestroy(): void {

    }

    setInit() {
        this.add = {
            plant_code:'',
            dept_code:'',
            dept_name:'',
            parent_dept_id:'0',
            parent_dept_name:'根目录',
            sort:'0',
            last_update_by:'1'
        }
        this.update = {
            id:'',
            plant_code:'',
            dept_code:'',
            dept_name:'',
            parent_dept_id:'0',
            parent_dept_name:'根目录',
            sort:'0',
            last_update_by:'1'
        }
    }

    showUpdateDept(data): void {
        this.isUpdateDept = true;
        this.update = this.format.extend(true, {}, data);
        this.nodes  = [ {
            title   : '根目录',
            key     : '0',
            expanded: true,
            children: this.getTreeData(0) 
        }];
        //获取上级目录
        this.defaultSelectedKeys = [ data.parent_dept_id ];
             //获取上级名称
        if(data.parent_dept_id=='0') {
            this.update.parent_dept_name = '根目录';
        } else {
            this.allDataList.forEach(value => {
                if(value.id == data.parent_dept_id) {
                    this.update.parent_dept_name = value.dept_name;
                }
            })
        }
    }

    hideUpdateDept():any{
        this.setInit();
        this.isUpdateDept = false;
    }
    updateSubmit():any{
        if(this.verify.empty(this.update.dept_code)) {
            this.message.create('warning', '部门编号不能为空');
        } else if( this.verify.empty(this.update.dept_name)) {
            this.message.create('warning', '部门名称不能为空');
        }  else {
            this.baseService.updateDept(this.update).then(result=>{
                if(result.code == 1) {
                    this.isUpdateDept = false;
                    this.message.create('success', '更新成功');
                    this.getDeptList();
                    this.setInit();
                } else {
                    this.message.create('error', result.msg); 
                }
            })
        }
    }

    showAddDept(): void {
        this.isAddDept = true;
        this.nodes  = [ {
            title   : '根目录',
            key     : '0',
            expanded: true,
            children: this.getTreeData(0) }
        ];
        this.defaultSelectedKeys = [ '0' ];
    }

    hideAddDept() {
        this.setInit();
        this.isAddDept = false;
    }

    addSubmit(): void {
        if(this.verify.empty(this.add.dept_code)) {
            this.message.create('warning', '部门编号不能为空');
        } else if( this.verify.empty(this.add.dept_name)) {
            this.message.create('warning', '部门名称不能为空');
        }  else {
            this.baseService.addDept(this.add).then(result=>{
                if(result.code == 1) {
                    this.isAddDept = false;
                    this.message.create('success', '添加成功');
                    this.getDeptList();
                    this.setInit();
                } else {
                    this.message.create('error', result.msg); 
                }
            })
        }
       
    }

    deleteDept(id:any) {
        this.modalService.confirm({
            nzTitle  : '<i>您确定要删除这条信息吗?</i>',
            nzOnOk   : () => {
                this.deleteDeptCheck(id);
            }
        });
    }

    deleteDeptCheck(id:any) {
        let isChild  = false;
        this.allDataList.forEach(value => {
            if(id == value.parent_dept_id) {
                isChild = true;
            }
        })
        if(isChild) {
            this.modalService.error({
                nzTitle: '请先删除子部门',
              });
        } else {
            this.baseService.deleteDept(id).then(result=>{
                if(result.code == 1) {
                    this.message.create('success', '删除成功');
                    this.getDeptList();
                    
                } else {
                    this.message.create('error', result.msg); 
                    return false;
                }
            })
        }  
    }
  
    nzClick(event: NzFormatEmitEvent): void {
        this.add.parent_dept_id = event.keys[0];
        this.add.parent_dept_name = event.node.title;
        this.update.parent_dept_id = event.keys[0];
        this.update.parent_dept_name = event.node.title;
        this.isShowTree = false;
    }
 
    getDeptList():void {
        this.loading = true;
        this.baseService.getDeptList().then((result: any) => {
            if(result.code==1) {
                this.allDataList = result.list;
                this.data = this.getChildData(0);
                this.data.forEach(item => {
                    this.expandDataCache[ item.id ] = this.convertTreeToList(item);
                });
            } 
            this.loading = false;
        }, err=>{
            this.loading = false;
        })
    }

    treeState(state):void {
        this.isShowTree = state;
    }

    getTreeData (id): any {
        let childrenList = [];
        this.allDataList.forEach(value => {
          if (value.parent_dept_id == id) {
            //判断是否有子集
            let isChild = false;
            //循环是否有子菜单
            this.allDataList.forEach(d => {
              if (value.id == d.parent_dept_id) {
                isChild = true;
              }
            })
            //是否有子菜单
            if (isChild) {
                value.children = this.getTreeData(value.id);
            }  
            childrenList.push({
                title:value.dept_name,
                key:value.id,
                children:value.children 
            })
          }
        });
        return childrenList;
    }

    getChildData(id): any {
        let childrenList = [];
        this.allDataList.forEach(value => {
          if (value.parent_dept_id == id) {
            //判断是否有子集
            let isChild = false;
            //循环是否有子菜单
            this.allDataList.forEach(d => {
              if (value.id == d.parent_dept_id) {
                isChild = true;
              }
            })
            //是否有子菜单
            if (isChild) {
                value.children = this.getChildData(value.id);
            } 
            childrenList.push(value)
          }
        });
        return childrenList;
    }


    collapse(array: any[], data: any, $event: boolean): void {
        if ($event === false) {
            if (data.children) {
                data.children.forEach(d => {
                    const target = array.find(a => a.id === d.id);
                    target.expand = false;
                    this.collapse(array, target, false);
                });
            } else {
                return;
            }
        }
    }

    convertTreeToList(root: object): any[] {
        const stack = [];
        const array = [];
        const hashMap = {};
        stack.push({ ...root, level: 0, expand: false });
        
        while (stack.length !== 0) {
            const node = stack.pop();
            this.visitNode(node, hashMap, array);
            if (node.children) {
                for (let i = node.children.length - 1; i >= 0; i--) {
                    stack.push({ ...node.children[ i ], level: node.level + 1, expand: false, parent: node });
                }
            }
        }
        return array;
    }
    
    visitNode(node: any, hashMap: object, array: any[]): void {
        if (!hashMap[ node.id ]) { 
            hashMap[ node.id ] = true;
            array.push(node);
        }
    }
}