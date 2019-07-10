import { Directive, HostListener,ElementRef, Component, OnInit,Output, EventEmitter } from '@angular/core';

@Directive({
    selector:'.img-acitve',
})
export class ImgDirective {
     el:any;
     @Output() imgLoadEvent: EventEmitter<any> = new　EventEmitter();//创建实力
    constructor(el:ElementRef){
        this.el = el;
    }
    @HostListener('load',['$event'])
    private emitEvent($event:any){
        this.imgLoadEvent.emit('data from child');//通过emit可将需要传递的数据发送给父组件
    }
   
}