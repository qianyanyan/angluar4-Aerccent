import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
@Component({
    selector:'packing-index',
    templateUrl:'./packing.component.html',
    providers: []
})

export class PackingComponent implements OnInit {
    public orbitUrl: string;
    constructor(private sanitizer: DomSanitizer){
            
    }
    
    ngOnInit(): void {
        this.orbitUrl = this.transform('assets/ltw//BZ.html'); 
    }

    //Angular 2 中提供的 DomSanitizer 服务，可以让url变得安全
    transform(url): any {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
   
}