

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';
import { ResourceService } from "./resource.service";
import { LocalStorage } from '../../core/common/local.storage';
import { DataService } from "../../DataService";

@Component({
  selector: 'resource-tab',
  templateUrl: './resource-tab.component.html',
    providers: [ ResourceService]
})

export class ResourceTabComponent implements OnInit, OnDestroy {
    type:string;
    constructor(   
        private activeRoute: ActivatedRoute,
        private store:LocalStorage, 
        private router: Router,
        private data: DataService){
    }

    ngOnDestroy(): void {
        this.store.set("resourceTab","");
    }

    typeChage(type) {
        if(type=='资源配置') {
            this.data.changeMessage("资源/资源配置");
        } else if(type=='工作中心') {
            this.data.changeMessage("资源/工作中心");
        } else if(type=='资源组配置') {
            this.data.changeMessage("资源/资源组配置");
        } else if(type=='资源组分配') {
            this.data.changeMessage("资源/资源组分配");
        } 
        this.type =type;
        this.store.set("resourceTab",this.type);
    }

    ngOnInit(): void {
     
    }
    
    log(args: any[]): void {
        console.log(args);
    }
 
}