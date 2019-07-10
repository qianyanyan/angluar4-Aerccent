import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ViewChild, OnChanges,SimpleChanges } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd';
 
@Component({
    selector:'eqt-select',
    templateUrl:'./eqt-select.component.html',
    styleUrls:['./eqt-select.component.less'],
    providers: []
})

export class EqtSelectComponent implements OnInit, OnDestroy, OnChanges {
    @Output() changeEqt: EventEmitter<any> = new　EventEmitter();//创建实力
    @Input() set selectEqtList(selectEqtList:string[]) {
      this.defaultSelectedKeys  = selectEqtList;
    }

    @Input() eqtList;
    
    // @Input() set eqtList( eqtList: any) {
    //     this.allDataList = eqtList;
    //     this.nodes  = this.getTreeData(null);
        
    // }
    @ViewChild('treeCom') treeCom;   
    allDataList:any;
    
    defaultSelectedKeys = [ ];
    nodes: NzTreeNodeOptions[] = [];
    isloadNode =false;
    constructor(){
         
    }
    
    ngOnInit(): void {
   
    }

    ngOnDestroy(): void {

    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['eqtList'] && this.eqtList.length>0) {
            console.log(this.eqtList);
                 
                this.nodes  = this.getTreeData(null);
        }
    }
    
    nzCheck(event: NzFormatEmitEvent): void {
        if (!this.isloadNode) {
           
            this.changeEqt.emit(this.getAll(event.node));
        } else {
            this.getChildren(event.node);
            if (event.node.isChecked == true) {
                this.getParent(event.node)
            }
            this.changeEqt.emit(this.getCheck(this.treeCom.getCheckedNodeList()));
        }
       
   
    }

    getAll(node) {
        let list = [];
        if (node.isChecked) {
            this.eqtList.forEach(value => {
                list.push(value.id)
            });
        }
        console.log(list)
        return list;
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

    nzEvent(event:any): void {
         
        if (event.eventName === 'expand') {
            const node = event.node;
             
            if (node && node.getChildren().length === 0 && node.isExpanded) {
                this.loadNode(node.key).then(data => {
                    node.addChildren(data);
                });
                this.isloadNode = true;
            }
        }
    }

    loadNode(id): Promise<NzTreeNodeOptions[]> {
        
       let list  =  this.getTreeDatas(id);
        console.log(this.defaultSelectedKeys)
        return new Promise(resolve => {
            setTimeout(() => resolve(list),
                1000);
         
        });
         
    }

    getTreeDatas(id): any {
        let childrenList = [];
        this.eqtList.forEach(value => {
            if (value.upper_eqt_id == id) {
                //判断是否有子集
                let isChild = false;
                //循环是否有子菜单
                this.eqtList.forEach(d => {
                    if (value.id == d.upper_eqt_id) {
                        isChild = true;
                    }
                })
                //是否有子菜单
                if (isChild) {
                    value.children = this.getTreeDatas(value.id);
                }
                //检查是否选择
                let checked = false;
                this.defaultSelectedKeys.forEach(d=>{
                    if (value.id == d) {
                        checked = true;
                    }
                })  
                childrenList.push({
                    title: value.eqt_name,
                    key: value.id,
                    children: value.children,
                    checked: checked
                })
            }
        });
        return childrenList;
    }
 

    getTreeData (id): any {
        let childrenList = [];
        this.eqtList.forEach(value => {
          if (value.upper_eqt_id == id) {
            //判断是否有子集
            let isChild = false;
            //循环是否有子菜单
              this.eqtList.forEach(d => {
              if (value.id == d.upper_eqt_id) {
                isChild = true;
              }
            })
            //是否有子菜单
            // if (isChild) {
            //     value.children = this.getTreeData(value.id);
            // }  
            childrenList.push({
                title:value.eqt_name,
                key:value.id,
                children:value.children 
            })
          }
        });
        return childrenList;
    }
}