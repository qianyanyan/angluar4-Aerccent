import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';
import { EqtService } from "./eqt.service";
import { LocalStorage } from '../../core/common/local.storage';
import { DataService } from "../../DataService";

@Component({
    selector:'eqt-tab',
    templateUrl:'./eqt-tab.component.html',
    styleUrls:['./eqt-tab.component.less'],
    providers: [ EqtService ]
})

export class EqtTabComponent implements OnInit, OnDestroy {
    type:string;
    moduleList= [];
    tabs = []; 
    id:String;
    nzSelectedIndex = 0;
    category_type:string;
    constructor(   
        private activeRoute: ActivatedRoute,
        private store:LocalStorage, 
        private router: Router,
        private data: DataService){
        let userInfo = store.get("userInfo");
        let parent_module_id = '';
        userInfo.moduleList.forEach(value => {
            //获取他的父菜单
            if(value.class_name=='T_Eqt') {
                parent_module_id = value.id;
            }
        })

        let tabType = store.get("eqtTab");
     

        userInfo.moduleList.forEach((value,index) => {
            //获取他的父菜单
            if(value.parent_module_id== parent_module_id) {
                this.tabs.push(value)
            }
        })
        this.tabs.forEach((value,index) => {
            if(tabType && tabType == value.class_name) {
                this.nzSelectedIndex = index;
            }
        })
        
        if(this.tabs.length>0) {
            if(tabType) {
                this.type = tabType;
            } else {
                this.type =this.tabs[0].class_name;
            }
        }
        this.store.set("eqtTab",this.type);
        this.activeRoute.queryParams.subscribe(params => {
            this.id = params['id'];    
            this.category_type = params['category_type'];   
        });
    }

    ngOnDestroy(): void {
        this.store.set("eqtTab","");
    }

    typeChage(type) {
        if(type=='T_MatlBaseInfo') {
            this.data.changeMessage("配置与初始化/设备资产/基本信息");
        } else if(type=='T_EqtPropInst') {
            this.data.changeMessage("配置与初始化/设备资产/属性");
        } else if(type=='T_EqtRuleInst') {
            this.data.changeMessage("配置与初始化/设备资产/计算规则");
        } else if(type=='T_Action'){
            this.data.changeMessage("配置与初始化/设备资产/行动方案");
        }
        this.type =type;
        this.store.set("eqtTab", this.type);
    }

    ngOnInit(): void {
     
    }
    
    log(args: any[]): void {
    
    }

    back() {
       
        history.back();
    }
 
}