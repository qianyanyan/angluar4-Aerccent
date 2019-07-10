import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';
import { ResourceService } from "../resource/resource.service";
import { LocalStorage } from '../../core/common/local.storage';
import { DataService } from "../../DataService";

@Component({
  selector: 'bom-tab',
  templateUrl: './bom-tab.component.html'
})

export class BomTabComponent implements OnInit, OnDestroy {
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
        if(type=='BOM配置') {
            this.data.changeMessage("BOM/BOM配置");
        } else if(type=='BOM组件') {
            this.data.changeMessage("BOM/BOM组件");
        } else if(type=='BOM步骤') {
            this.data.changeMessage("BOM/BOM步骤");
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