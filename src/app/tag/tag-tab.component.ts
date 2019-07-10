import { Component, OnInit, OnDestroy, } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params } from '@angular/router';
import { TagService } from "./tag.service";
import { LocalStorage } from '../core/common/local.storage';
import { DataService } from "../DataService";

@Component({
    selector:'tag-tab',
    templateUrl:'./tag-tab.component.html',
    styleUrls:['./tag.component.less'],
    providers: [ TagService ]
})

export class TagTabComponent implements OnInit, OnDestroy {
    id:any;
    eqt_name:string;
    number:string;
    switchValue:boolean;
    type:string;
    moduleList= [];
    tabs = [];
    isShow3d:boolean;
    nzSelectedIndex = 0;
    eqtList = [];
    timer:any;
    constructor(   
        private activeRoute: ActivatedRoute,
        private store:LocalStorage, 
        private router: Router,
        private tagService:TagService,
        private data: DataService){
       
        let userInfo = this.store.get("userInfo");
        let parent_module_id = '';
        userInfo.moduleList.forEach(value => {
            //获取他的父菜单
            if (value.url == '/tag/index') {
                parent_module_id = value.id;
            }
        })

        userInfo.moduleList.forEach((value, index) => {
            //获取他的父菜单
            if (value.parent_module_id == parent_module_id) {
                if (value.class_name == "T_3D") {
                    this.isShow3d = true;
                } else {
                    this.tabs.push(value);
                }
            }
        })

        this.activeRoute.queryParams
        .subscribe((params:Params) => {
            this.id ="";
            this.eqt_name = "";
            this.number = "";
            this.setTab();
            this.id = params['id'];
            this.eqt_name = params['eqt_name'];
            this.number = params['number']; 
            this.eqtList = this.data.getEqtIdList(this.id);
            this.eqtList.push(this.id);

             

        });

        // this.activeRoute.queryParams.subscribe(params => {

            
        //     this.id = params['id'];    
        //     this.eqt_name =  params['eqt_name'];
        //     this.number =  params['number']; 
 
        // });
        this.switchValue = false;

       

    }

    setTab() {
       
        let tabType = this.store.get("larmTab");
        this.tabs.forEach((value, index) => {
            if (tabType && tabType == value.class_name) {
                this.nzSelectedIndex = index;
            }
        })


        if (this.tabs.length > 0) {
            if (tabType) {
                this.type = tabType;
            } else {
                this.type = this.tabs[0].class_name;
            }
            this.store.set("larmTab", this.type);
        }
    }

    getEqtAlarm() {
        this.tagService.getEqtAlarm(this.eqtList.join(',')).then((result: any) => {
            if(result.code==1) {
                this.number = result.data.count;
            }
            this.setTime();
        },()=>{
            this.setTime();
        })
    }
    ngAfterViewInit(){
        // 监听路由变化
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (this.switchValue == true) {
                    this.switchValue = false;
                }
                
            }
        })
    }
 
    ngOnDestroy(): void {
        this.timer &&  clearInterval(this.timer);
        this.store.set("larmTab","");
    }
    

    typeChage(type) {
        if(type=='T_Overview') {
            this.nzSelectedIndex = 0;
            this.data.changeMessage("监控与报警/概览信息");
        } else {
            this.data.changeMessage("监控与报警/详细信息");
        }
      
        this.type =type;
        this.store.set("larmTab",this.type);
    }

    ngOnInit(): void {
        // this.data.currentAlarmNum.subscribe(number =>{
        //     if(number) {
        //         this.number =   number;
        //     }
        // });
        // this.eqtList = this.data.getEqtIdList(this.id);
        // this.eqtList.push(this.id);
        this.getEqtAlarm();

        this.data.customized.subscribe(message =>{
            if(message.index) {
               this.store.set("message",message);
               this.nzSelectedIndex = 1;
               this.typeChage('T_Detail');
            }
        });
    }

    setTime() {
        this.timer = setTimeout(()=>{
            this.getEqtAlarm();
        },5000)
    }
    


    log(args: any[]): void {
        console.log(args);
      }

    back() {
        // this.switchValue = true;
        history.back();
    }
}