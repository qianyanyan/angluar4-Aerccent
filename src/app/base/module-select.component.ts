import { Component, OnInit, OnDestroy,Output,EventEmitter, Input,ViewChild } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd';
import { DataService } from "../DataService";
 
@Component({
    selector:'module-select',
    templateUrl:'./module-select.component.html',
    styleUrls:['./module-select.component.less'],
    providers: []
})

export class ModuleSelectComponent implements OnInit, OnDestroy {
    @Output() changeModule: EventEmitter<any> = new　EventEmitter();//创建实力
    @Input() set selectModuleList(selectModuleList:string[]) {
      this.defaultSelectedKeys  = selectModuleList;
    }
    
    @Input() set moduleList( moduleList: any) {
        this.allDataList = moduleList;
        this.nodes  = this.getTreeData(0);
        this.defaultSelectedKeys = moduleList;
    }   

    @ViewChild('treeCom') treeCom;
    allDataList:any;
    
    defaultSelectedKeys = [];
    nodes: NzTreeNodeOptions[] = [];
    account_name:string;
    constructor( dataService: DataService){
        this.account_name =  dataService.userInfo.value.user.account_name;
    }
    
    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
       
    }
    
    nzCheck(event: NzFormatEmitEvent): void {
        this.getChildren(event.node);
        if(event.node.isChecked == true) {
            this.getParent(event.node)
        }
        this.changeModule.emit(this.getCheck(this.treeCom.getCheckedNodeList()));//通过emit可将需要传递的数据发送给父组件
    }

    getCheck(node) {
        let list = [];
        node.forEach(value=>{
            if(value.isChecked==true) {
                list.push(value.key)
            }
            if(value.children) {
                this.getCheck(value.children);
            }
           
        })
        return list;
    }

    getChildren(node) {
       if(node.children) {
            node.children.forEach(value=>{
                value.isChecked = node.isChecked;
                this.getChildren(value);
            })
        }
    }
  
    getParent(node):any {
       if(node.parentNode) {
            node.parentNode.isChecked = true;
            this.getParent(node.parentNode);
       }
    }
    getTreeData (id): any {
        let childrenList = [];
        this.allDataList.forEach(value => {

            if(this.account_name) {
                // if( this.account_name !='sadmin' && (value.class_name=='T_Module' || value.class_name=="F_Configuration")) {
              
            } else {
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
                        childrenList.push({
                            title:value.module_name,
                            key:value.id,
                            children:this.getTreeData(value.id)
                        })
                    }  else {
                        childrenList.push({
                            title:value.module_name,
                            key:value.id
                        })
                    }
                }
            }
           
        });
        return childrenList;
    }
}