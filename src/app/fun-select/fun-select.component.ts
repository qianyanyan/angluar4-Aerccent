import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from '../core/common/local.storage';


@Component({
    selector:'fun-select',
    templateUrl:'./fun-select.component.html',
    styleUrls:['./fun-select.component.less']
})

export class FunSelectComponent implements OnInit, OnDestroy {
    moduleList = [];
    constructor(private router: Router,private store:LocalStorage){
     
        let userInfo = store.get("userInfo");
        userInfo.moduleList.forEach(value => {
            if(value.parent_module_id=='0') {
                if(value.url=='/base' || value.url=='/tag/index'  || value.url=='/me'   || value.url=='/configuration' || value.url=='/order'  || value.url=='/statistics-report') {
                    value.isOpen = true;
                } else {
                    value.isOpen = false;
                }
                this.moduleList.push(value);
            }
        });
       
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {

    }

    getModule(data):void {
     
        if(data.isOpen) {
            this.router.navigate([data.url],{
                queryParams:{
                    'id':data.id,
                    'time': new Date().getTime() 
                }
            });
        }
       
    }
}