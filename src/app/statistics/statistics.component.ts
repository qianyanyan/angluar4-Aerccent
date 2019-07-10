import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router,    NavigationEnd,  ActivatedRoute } from '@angular/router';
import { LocalStorage } from '../core/common/local.storage';
 
@Component({
    selector:'statistics-index',
    templateUrl:'./statistics.component.html',
    styleUrls:['./statistics.component.less'],
    providers: []
})

export class StatisticsComponent implements OnInit, OnDestroy {
    side:boolean;
    moduleList=[];
    constructor(private router: Router,  private activeRoute: ActivatedRoute,private store:LocalStorage ){
        let userInfo = store.get("userInfo");
        let parent_module_id = '';
        userInfo.moduleList.forEach(value => {
                //获取他的父菜单
            if(value.url=='/statistics-report') {
                parent_module_id = value.id;
            }
        })

        userInfo.moduleList.forEach(value => {
            //获取他的父菜单
            if(value.parent_module_id==parent_module_id) {
                this.moduleList.push(value);
            }
        })

         let  urlList = this.router.url.split("?");
        if(urlList[0] &&  urlList[0]=="/statistics-report") {
            this.side = true;
        } else {
            this.side = false;
        }
        
         // 监听路由变化
         this.router.events.subscribe((event:NavigationEnd) => {
            let  urlList = this.router.url.split("?");
            if(urlList[0] &&  urlList[0]=="/statistics-report") {
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
        this.router.navigateByUrl(url);
        this.side = false;
    }
}