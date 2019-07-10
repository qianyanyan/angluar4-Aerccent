import { Component, OnInit, OnDestroy, HostBinding,TemplateRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, ActivationEnd} from '@angular/router';
import {NzMessageService, NzDropdownContextComponent, NzDropdownService, NzMenuItemDirective } from 'ng-zorro-antd';
import { LocalStorage } from '../core/common/local.storage';
import { Title } from '@angular/platform-browser';
import { DataService } from "../DataService";
import { Verify } from '../core/common/verify.service';
import { FullLayoutService} from './full-layout.service';
@Component({
    selector:'app-dashboard',
    templateUrl:'./full-layout.component.html',
    styleUrls:['./full-layout.component.less'],
    providers: [FullLayoutService]
})
export class FullLayoutComponent implements OnInit, OnDestroy {
    isVisible=false;
    isFun;
    moduleList = [];
    titleList  = [];
    listTip = false;
    threeTips = false;
    closeTopone = false;
    twoTip=[];
    threeTip=[];
    userHeader;
    headerSize:any;
    title:string; 
    outOfBounds = { top: false, bottom: true, right: false, left: false }
    textBorder = ['text-border_active','text-border_active','text-border_active','text-border_active','text-border_active'];
    userName:string;
    isModify = false;
    password = {
        current_password:'',
        new_password:'',
        confirm_password:'',

    }
    pathUrl:any='首页';
    DeatilUrl :any;
    firstUrl:any;
    secondUrl:any;
    threeUrl:any;
    isNav;
    private dropdown: NzDropdownContextComponent;

    inBounds = true;
    edge = {
        top: true,
        bottom: true,
        left: true,
        right: true
    };
    alarmList = [];
    timer = null;
    isTag;
    isMaxTag = true;
    constructor(

        private router: Router,
        private activeRoute: ActivatedRoute,
        private nzDropdownService: NzDropdownService,
        private store:LocalStorage,
        private titleService: Title,
        private data: DataService,
        private verify:Verify,
        private msg: NzMessageService,
        private fullLayoutService:FullLayoutService
        ) {
            this.titleList = [];
            this.getChild(this.activeRoute.snapshot)
            this.title =   this.titleList.join('/');
            let userInfo = store.get("userInfo");
            this.pathUrl= store.get("pathUrl");
            this.DeatilUrl =store.get("DeatilUrl");
            this.userName = userInfo.user.account_name;
            this.userHeader = userInfo; 
            userInfo.moduleList.forEach(value => {
                if(value.parent_module_id=='0') {
                    this.moduleList.push(value);
                   
                }
            });
        if(this.router.url &&  this.router.url.indexOf('fun-select')>-1) {
            this.isFun = false;
            this.isNav= false;
        } else {
            this.isFun = true;
            this.isNav= true;
        }
        
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                 
                this.titleList = [];
                this.getChild(this.activeRoute.snapshot)
                this.title = this.titleList.join('/');
                this.timer && clearInterval(this.timer);
                if (event.url && event.url.indexOf('/tag') > -1) {
                     this.getHAlarmList();
                } else {
                    this.isTag = false;
                }
            }
        });
         
    }

    ngOnInit() {
        this.data.currentMessage.subscribe(message =>{
            if(message) {
                this.title =   message;
            }
        });
        this.getHAlarmList();
    }

    ngOnDestroy(): void {
        this.timer && clearInterval(this.timer);
    }

    getChild(snapshot) {
        if(snapshot.data.title){
            this.titleList.push(snapshot.data.title)
        }
        if(snapshot.children.length>0) {
            this.getChild(snapshot.children[0])
        }
    }

    ngAfterViewInit(){
        
    }

    personal($event: MouseEvent, template: TemplateRef<void>): void {
        this.dropdown = this.nzDropdownService.create($event, template);
    }

    closePersonal(e: NzMenuItemDirective): void {
        this.dropdown.close();
    }

    logout():void {
        this.router.navigateByUrl('login');
        this.dropdown.close();
    }

    modify():void {
        this.password = {
            current_password:'',
            new_password:'',
            confirm_password:'',
        }
        this.isModify = true;
    }

    submitModify():void {

        if(this.verify.empty(this.password.current_password)) {
            this.msg.create('warning', '当前密码不能为空');
            return;
        }  else if(this.verify.empty(this.password.new_password)) {
            this.msg.create('warning', '新密码不能为空');
            return;
        } else if(this.password.new_password.length<6) {
            this.msg.create('warning', '新密码最少6位数');
            return;
        }  else if(this.password.confirm_password != this.password.new_password) {
            this.msg.create('warning', '新密码和确认密码不相同');
            return;
        }

        this.fullLayoutService.modifyPassword(this.password).then(result=>{
            if(result.code == 1) {
                this.isModify = false;
                this.msg.create('success', '修改密码成功');
                this.password = {
                    current_password:'',
                    new_password:'',
                    confirm_password:'',
                }
            } else {
                this.msg.create('error', result.msg);
            }
        })
    }


    showModal(): void {
        this.isVisible = true;
    }

    handleOk(): void {
        this.isVisible = false;
    }
    touchIndex = [];
    indext;
    getModule(data):void { 
        this.firstUrl =data.module_name;
        this.closeTopone = false;
        this.isVisible = false;
        this.listTip = true;
        this.moduleList.forEach(value => {
            value.isOpen=false
        }); 
        data.isOpen =true;
        this.threeTips = false;
        this.headerSize =  (document.body.clientWidth-320)+"px";
            if(this.twoTip.length > 0){
                this.twoTip=[]; 
            }
            for(var i =0;i<this.userHeader.moduleList.length;i++){
                if(data.id == this.userHeader.moduleList[i].parent_module_id){
                     this.twoTip.push(this.userHeader.moduleList[i]);
                }
            }
    }

    closeMe(){
        this.listTip = false;
        this.threeTips = false;
        this.headerSize =  (document.body.clientWidth-140)+"px";
    }

    closeThree(){
        this.closeTopone = true;
        this.listTip = false;
        this.threeTips = false;
        this.headerSize =  (document.body.clientWidth-140)+"px";
    }

    getnavRouter(threeTipDate){
        this.listTip = false;
        this.threeTips = false;
        this.threeUrl =threeTipDate.module_name
        this.userHeader.moduleList.forEach(value => {
            if(threeTipDate.id == value.id) {
                if(value.url != '/login' ){
                    this.pathUrl =this.firstUrl +'/'+this.secondUrl
                    this.DeatilUrl = ' / ' +this.threeUrl
                    this.store.set("pathUrl", this.pathUrl);
                    this.store.set("DeatilUrl", this.DeatilUrl);
                    this.router.navigate([value.url],{ 
                        queryParams:{
                            'id':value.id,
                            'time': new Date().getTime()
                        }
                    });
                  
                }
                this.headerSize =  (document.body.clientWidth-140)+"px";  
            }
        });
        
    }

    getthreeTip(threeTip){
        this.twoTip.forEach(value => {
            value.isOpen=false
        });
        threeTip.isOpen =true;
        this.secondUrl = threeTip.module_name
       this.closeTopone = true;
            if(this.threeTip.length > 0){
               this.threeTip=[]; 
            }   
            for(var i =0;i<this.userHeader.moduleList.length;i++){
                if(threeTip.id == this.userHeader.moduleList[i].parent_module_id){
                    this.threeTip.push(this.userHeader.moduleList[i]);
                }
            }
            // if(this.threeTip.length == 0){
             if(threeTip.url !="/login"){
                this.threeTips =false;
                this.listTip =false; 
                this.userHeader.moduleList.forEach(value => {
                    if(threeTip.id == value.id) {
                        if(value.url != '/login'){
                            this.pathUrl =this.firstUrl +' / '+this.secondUrl
                            this.DeatilUrl="";
                            this.store.set("pathUrl", this.pathUrl);
                            this.store.set("DeatilUrl", this.DeatilUrl);
                            this.router.navigate([value.url],{
                                queryParams:{
                                    'id':value.id,
                                    'time': new Date().getTime()
                                }
                            });
                        }
                        this.headerSize =  (document.body.clientWidth-140)+"px";
                    }
                });
            }else{
                if(this.threeTip.length > 0){
                    this.headerSize =  (document.body.clientWidth-500)+"px";
                    this.threeTips =true;
                }else{
                    this.listTip = false;
                   this.threeTips = false;
                }
            }
    }

    getHAlarmList():void { 
        this.timer && clearInterval(this.timer);
        if (this.router.url && this.router.url.indexOf('/tag') > -1) {
             this.isTag = true
            this.fullLayoutService.getHAlarmList().then(result => {
                if (result.code == 1) {
                    this.alarmList = result.list;
                }
                this.setTime();
            }, eror => {
                this.setTime();
            })
        }
       
    }

    setTime() {
        this.timer = setTimeout(() => {
            this.getHAlarmList();
        }, 5000)
    }

    alarmshowState(isMaxTag:boolean):void {
        if(isMaxTag) {
            this.getHAlarmList();
        } else {
            this.timer && clearInterval(this.timer);
        }
         
        // this.alarmList = [];
        this.isMaxTag = isMaxTag;
    }

    

    jumpAletInfo(item):void {
        this.store.set("larmTab", "T_Detail");
        this.router.navigate(['/tag/tab'], {
            queryParams: {
                'id': item.eqt_id,
                'eqt_name': item.eqt_name,
                'number': 0,
                "category_type": item.category
            }
        });
    }

}
