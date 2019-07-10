import { Component, OnInit, OnDestroy,Output,EventEmitter, Input } from '@angular/core';
import { Format } from '../core/common/format.service';
import { BaseService } from './base.service';
import { NzFormatEmitEvent, NzMessageService, NzTreeNodeOptions, NzModalService } from 'ng-zorro-antd';
 
@Component({
    selector:'dept-select',
    templateUrl:'./dept-select.component.html',
    styleUrls:['./dept-select.component.less'],
    providers: []
})

export class DeptSelectComponent implements OnInit, OnDestroy {
    @Output() change: EventEmitter<any> = new　EventEmitter();//创建实力
    @Input() set selectDepList(selectDepList:string[]) {
      this.defaultSelectedKeys  = selectDepList;
    }
    
    @Input() set depList( selectDepList: any) {
        this.allDataList = selectDepList;
        this.nodes  = this.getTreeData(0);
    }   
    allDataList:any;
    loading = false;
    defaultSelectedKeys = [ '0' ];
    nodes: NzTreeNodeOptions[] = [ {
      title   : '根目录',
      key     : '0',
    }];
  
    constructor( private baseService: BaseService){
    }
    
    ngOnInit(): void {

    }

    ngOnDestroy(): void {

    }
    
    nzCheck(event: NzFormatEmitEvent): void {
        this.change.emit(event.keys);//通过emit可将需要传递的数据发送给父组件
    }
 
    getDeptList():void {
        this.loading = true;
        this.baseService.getDeptList().then((result: any) => {
            if(result.code==1) {
                this.allDataList = result.list;
              
                this.nodes  = this.getTreeData(0);
                this.defaultSelectedKeys = this.selectDepList;
            } 
            this.loading = false;
        }, err=>{
            this.loading = false;
        })
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
             
                childrenList.push({
                    title:value.dept_name,
                    key:value.id,
                    children:this.getTreeData(value.id)
                })
            } else {
                childrenList.push({
                    title:value.dept_name,
                    key:value.id,
                })
            } 
            
          }
        });
        return childrenList;
    }
 
}