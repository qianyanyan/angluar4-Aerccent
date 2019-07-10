import { Component, OnInit, OnDestroy } from '@angular/core';
import { Format } from '../core/common/format.service';
import { BaseService } from './base.service';
import { NzFormatEmitEvent, NzMessageService, NzTreeNodeOptions, NzModalService } from 'ng-zorro-antd';
 
@Component({
    selector:'module-index',
    templateUrl:'./module.component.html',
    styleUrls:['./module.component.less'],
    providers: []
})

export class ModuleComponent implements OnInit, OnDestroy {
    height:any;
    data:any;
    allDataList:any;
    expandDataCache = {};
    listRoleOption = [];
    isAddModule = false;
    isUpdateModule = false;
    add = {
        module_name:'',
        module_type:'',
        class_name:'',
        sort:'',
        url:'',
        parent_module_id:'0',
        parent_module_name:'根目录',
        last_update_by:'1'
    }

    update = {
        id:'',
        module_name:'',
        module_type:'',
        class_name:'',
        sort:'',
        url:'',
        parent_module_name:'',
        parent_module_id:'',
        last_update_by:'1'
    }
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
        private modalService: NzModalService){
        this.height = (document.body.clientHeight-240)+"px";
        this.listRoleOption = [{
            label:'菜单',
            value:'1'
        },{
            label:'选项卡',
            value:'2'
        },{
            label:'按钮',
            value:'3'
        }]
        this.isShowTree =false;
    }
    
    ngOnInit(): void {
        this.getModuleList();
    }

    ngOnDestroy(): void {

    }

    showUpdateModule(data): void {
        this.isUpdateModule = true;
        this.update = this.format.extend(true, {}, data);
        this.nodes  = [ {
            title   : '根目录',
            key     : '0',
            expanded: true,
            children: this.getTreeData(0) 
        }];
        //获取上级目录
        this.defaultSelectedKeys = [ data.parent_module_id ];
             //获取上级名称
        if(data.parent_module_id=='0') {
            this.update.parent_module_name = '根目录';
        } else {
            this.allDataList.forEach(value => {
                if(value.id == data.parent_module_id) {
                    this.update.parent_module_name = value.module_name;
                }
            })
        }
    }

    hideUpdateModule():any{
        this.isUpdateModule = false;
    }

    updateSubmit():any{
        this.baseService.updateModule(this.update).then(result=>{
            if(result.code == 1) {
                this.isUpdateModule = false;
                this.message.create('success', '更新成功');
                this.getModuleList();
                this.update = {
                    id:'',
                    sort:'',
                    module_name:'',
                    module_type:'',
                    class_name:'',
                    url:'',
                    parent_module_name:'',
                    parent_module_id:'',
                    last_update_by:'1'
                }
            } else {
                this.message.create('error', result.msg); 
            }
        })
    }

    showAddModule(): void {
        this.isAddModule = true;
        this.nodes  = [ {
            title   : '根目录',
            key     : '0',
            expanded: true,
            children: this.getTreeData(0) }
        ];
        this.defaultSelectedKeys = [ '0' ];
    }

    hideAddModule() {
        this.add = {
            module_name:'',
            module_type:'',
            class_name:'',
            sort:'',
            url:'',
            parent_module_id:'0',
            parent_module_name:'根目录',
            last_update_by:'1'
        }
        this.isAddModule = false;
    }

    addSubmit(): void {
        this.baseService.addModule(this.add).then(result=>{
            if(result.code == 1) {
                this.isAddModule = false;
                this.message.create('success', '添加成功');
                this.getModuleList();
                this.add = {
                    module_name:'',
                    module_type:'',
                    class_name:'',
                    url:'',
                    sort:'',
                    parent_module_id:'0',
                    parent_module_name:'根目录',
                    last_update_by:'1'
                }
            } else {
                this.message.create('error', result.msg); 
            }
        })
    }

    deleteModule(id:any) {
        this.modalService.confirm({
            nzTitle  : '<i>您确定要删除这条信息吗?</i>',
            nzOnOk   : () => {
                this.deleteModuleCheck(id);
            }
        });
    }

    deleteModuleCheck(id:any) {
        let isChild  = false;
        this.allDataList.forEach(value => {
            if(id == value.parent_module_id) {
                isChild = true;
            }
        })
        if(isChild) {
            this.modalService.error({
                nzTitle: '请先删除子模块',
              });
        } else {
            this.baseService.deleteModule(id).then(result=>{
                if(result.code == 1) {
                    this.message.create('success', '删除成功');
                    this.getModuleList();
                    
                } else {
                    this.message.create('error', result.msg); 
                    return false;
                }
            })
        }
    }
  
    nzClick(event: NzFormatEmitEvent): void {
        this.add.parent_module_id = event.keys[0];
        this.add.parent_module_name = event.node.title;
        this.update.parent_module_id = event.keys[0];
        this.update.parent_module_name = event.node.title;
        this.isShowTree = false;
    }
 
    getModuleList():void {
        this.loading = true;
        this.baseService.getModuleList().then((result: any) => {
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
          if (value.parent_module_id == id) {
            //判断是否有子集
            let isChild = false;
            //循环是否有子菜单
            this.allDataList.forEach(d => {
              if (value.id == d.parent_module_id) {
                isChild = true;
              }
            })
            //是否有子菜单
            if (isChild) {
                value.children = this.getTreeData(value.id);
            }  
            childrenList.push({
                title:value.module_name,
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
          if (value.parent_module_id == id) {
            //判断是否有子集
            let isChild = false;
            //循环是否有子菜单
            this.allDataList.forEach(d => {
              if (value.id == d.parent_module_id) {
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