import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
@Component({
    selector:'brewing-index',
    templateUrl:'./brewing.component.html',
  
    providers: []
})

export class BrewingComponent implements OnInit {
    public orbitUrl: string;
    constructor(       private sanitizer: DomSanitizer, ){
            
    }
    
    ngOnInit(): void {
        this.orbitUrl = this.transform('assets/ltw//bill.html'); 
    }

    //Angular 2 中提供的 DomSanitizer 服务，可以让url变得安全
    transform(url): any {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
   
}