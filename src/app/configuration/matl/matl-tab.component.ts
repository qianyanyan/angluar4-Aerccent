import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';
import { MatlService } from "./matl.service";
import { LocalStorage } from '../../core/common/local.storage';
import { DataService } from "../../DataService";

@Component({
    selector:'matl-tab',
    templateUrl:'./matl-tab.component.html',
    styleUrls:['./matl-tab.component.less'],
    providers: [ MatlService ]
})

export class MatlTabComponent implements OnInit, OnDestroy {
    type:string;
    moduleList= [];
    tabs = []; 
    nzSelectedIndex = 0;
    constructor(   
        private activeRoute: ActivatedRoute,
        private store:LocalStorage, 
        private router: Router,
        private data: DataService){
        let userInfo = store.get("userInfo");
        let parent_module_id = '';
        let tabType = store.get("matlTab");
        userInfo.moduleList.forEach((value,index) => {
            //获取他的父菜单
            if(value.class_name=='T_Matl') {
                parent_module_id = value.id;
            }
        })
        userInfo.moduleList.forEach(value => {
            //获取他的父菜单
            if(value.parent_module_id==parent_module_id) {
                this.tabs.push(value)
                console.log( this.tabs)
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

        this.store.set("matlTab",this.type);
    }

    ngOnDestroy(): void {
        this.store.set("matlTab","");
    }

    typeChage(type) {
        if(type=='T_MatlBaseInfo') {
            this.data.changeMessage("物料/基本信息");
        } else if(type=='T_MatlPlant') {
            this.data.changeMessage("物料/物料工厂");
        } else if(type=='T_Brand') {
            this.data.changeMessage("物料/品牌");
        } else if(type=='T_MatlOther') {
            this.data.changeMessage("物料/其他信息");
        } 
        this.type =type;
        this.store.set("matlTab",this.type);
    }

    ngOnInit(): void {
     
    }
    
    log(args: any[]): void {
        console.log(args);
    }
 
}