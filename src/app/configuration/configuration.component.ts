import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router,    NavigationEnd,  ActivatedRoute } from '@angular/router';
import { LocalStorage } from '../core/common/local.storage';
 
@Component({
    selector:'configuration-index',
    templateUrl:'./configuration.component.html',
    styleUrls:['./configuration.component.less'],
    providers: []
})

export class ConfigurationComponent implements OnInit, OnDestroy {
    side:boolean;
    time:string;
    moduleList=[];
    constructor(private router: Router,  private activeRoute: ActivatedRoute,private store:LocalStorage ){
        let userInfo = store.get("userInfo");
        let parent_module_id = '';
        console.log(userInfo.moduleList);
        userInfo.moduleList.forEach(value => {
                //获取他的父菜单
            if(value.url=='/configuration') {
                parent_module_id = value.id;
                console.log(parent_module_id);
            }
        })

        userInfo.moduleList.forEach(value => {
            //获取他的父菜单
            if(value.parent_module_id==parent_module_id) {
                this.moduleList.push(value);
            }
        })

        let  urlList = this.router.url.split("?");
        if(urlList[0] &&  urlList[0]=="/configuration") {
            this.side = true;
        } else {
            this.side = false;
        }
        
         // 监听路由变化
         this.router.events.subscribe((event:NavigationEnd) => {
            let  urlList = this.router.url.split("?");
            if(urlList[0] &&  urlList[0]=="/configuration") {
                this.side = true;
            } else {
                this.side = false;
            }
        });

        
    }
 
    
    ngOnInit(): void {
      
    }

    ngOnDestroy(): void {

    }

    toggle(side:boolean) {
        this.side = !side;
    }

    jump(url) {
        this.store.set('eqtTab','');
        this.router.navigate([url],{
            queryParams:{
                'time': new Date().getTime() 
            }
        });
        this.side = false;
    }
}