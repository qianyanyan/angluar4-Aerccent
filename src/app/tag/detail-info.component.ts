import { Component, OnDestroy, OnInit, Input, ViewChild  } from '@angular/core';
import { LocalStorage } from '../core/common/local.storage';
@Component({
    selector:'detail-info',
    templateUrl:'./detail-info.component.html',
    styleUrls:['./tag.component.less']
})

export class DetailInfoComponent implements OnInit, OnDestroy {
    @Input() id: any;
    @Input() eqt_name: any;
    trendSize:string;
    height:string;
    constructor(   private store:LocalStorage, ){
        this.height = (document.body.clientHeight-240)+"px";
        let larmTabTab =  this.store.get("larmTabTab");
        if(larmTabTab) {
            this.trendSize = larmTabTab;
        } else {
            this.trendSize = "bj";
        }
        
        this.store.set("larmTabTab",this.trendSize);
    }

    ngOnDestroy(): void {
        this.store.set("larmTabTab","");
    }

    ngOnInit(): void {
        
    }

    checkChange(): void {
        setTimeout(()=>{
            this.store.set("larmTabTab",this.trendSize);
        },500)
    }
}