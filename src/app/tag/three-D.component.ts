import { Component, OnInit, OnDestroy,  ElementRef, ViewChild, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { TagService } from "./tag.service";

import { DataService } from "../DataService";
import { LocalStorage } from './../core/common/local.storage';
declare let $:any; 

@Component({
    selector:'three-D',
    templateUrl:'./three-D.component.html',
    styleUrls:['./tag.component.less','./three-D.component.less']
})

export class ThreeDComponent implements OnInit, OnDestroy {
    @Input() id: any;
    @Input() eqt_name:any;
    imgSrc:any;
    imgWidth:any;
    imgHeight:any;
    viewHeight: number;
    viewWidth: number;
    pro: number;
    pOldTop:number;
    pOldLeft:number;
    pNowTop:any;
    pNowLeft:any;
    imgDataList= [];
    alarmEqtListA:any;
    alarmEqtListB:any;
    height:any;
    counts;
    proHeight; 
    boxHight;
    proWidth;
    heightRight:any;
    equalsIcon;
    eqtstuts;
    itemName;
    showType = 1;
    eqtList = [];
    category_type:string;
    @ViewChild('mainScreen') elementView: ElementRef;
    @ViewChild('signbox') signboxView: ElementRef;
    @ViewChild('mainBox') mainBoxView: ElementRef;
    
    constructor( 
        private router: Router, 
        private store:LocalStorage,  
        private tagService:TagService, 
        private dataService:DataService,
        private activeRoute: ActivatedRoute,
        ){
        this.height = (document.body.clientHeight-200)+"px";
        this.heightRight = (document.body.clientHeight-368)/2+"px";
        this.activeRoute.queryParams.subscribe(params => {
          
            this.category_type =  params['category_type']; 
        });
    }
 
    ngOnDestroy(): void {
        this.eqtList = this.dataService.getEqtIdList(this.id);
    }

    ngOnInit(): void {
        this.getEqtPosition();
       
    }
    
    chartClick(itemName,event,indexs){
        let index = indexs;
        if(this.category_type=="pkg") {
            //包装
            if(indexs==1) {
                index = 1;
            } else  if(indexs==2) {
                index = 2;
            }

        } else if(this.category_type=='uty') {
              //动力
            if(indexs==3) {
                index = 1;
            }  else  if(indexs==1) {
                index = 2;
            }  else  if(indexs==2) {
                index = 3;
            } 

          
        } else if(this.category_type=="brew") {
            //酿造
            if(indexs==1) {
                index = 2;
            }  else  if(indexs==3) {
                index = 1;
            } else  if(indexs==4) {
                index = 2;
            }   else  if(indexs==5) {
                index = 2;
            } 
        }

        this.dataService.setCustomized({
            itemName:itemName,
            index: index,
            id: event,
        })
    }

    getEqtPosition():void {
        let eqtItem = this.dataService.eqtItem.value;
        let eqtList = this.dataService.eqtList.value;
        let eqt_id = this.id;
        if (eqtItem && eqtItem.eqt_type_id =='8') {
            this.showType = 2;
            let list =  [this.id];
            eqtList.forEach(item=>{
                if(item.alarmCount)
                list.push(item.id);
            })
    
            eqt_id = list.join(',');
        }
        this.tagService.getEqtPosition(eqt_id).then((result: any) => {
            this.eqtList = [];
            if( result.list.length>0) {
                result.list.forEach(item => {
                    this.eqtList.push(item);
                });
                this.imgSrc  = this.eqtList[0].img_src_url;
                this.imgWidth =  Number(this.eqtList[0].img_width);
                this.imgHeight = Number(this.eqtList[0].img_height);
                // this.pOldTop = Number(result.data.top_offset || -2000);
                // this.pOldLeft = Number(result.data.left_offset || -2000);
            }
            
        })
        this.getAlarmEqtListA(eqt_id);
        this.getAlarmEqtListB(eqt_id);
    }

    imgLoad($event){
        let viewHeight = this.elementView.nativeElement.offsetHeight;
        let viewWidth = this.elementView.nativeElement.offsetWidth;
        $(this.mainBoxView.nativeElement).css("width",viewWidth+"px");
        let proHeight =  viewHeight / this.imgHeight;
        let proWidth =  viewWidth / this.imgWidth;
        if(this.showType==1) {
            this.getAlarmTypeNumber(proHeight, proWidth);
            this.eqtstuts = this.store.get('eqt_name_pj');
            this.eqtstuts.forEach((items)=>{
                if(items.top_offset && items.left_offset) {
                    items.pNowTop =  items.top_offset * proHeight+"px";
                    items.pNowLeft = items.left_offset * proWidth+"px";
                } else {
                    items.pNowTop =   "-2000px";
                    items.pNowLeft = "-2000px";
                }
            })
        } else {
            this.eqtstuts = this.store.get('eqt_name_pj');
            this.eqtstuts.forEach((items)=>{
                if(items.top_offset && items.left_offset) {
                    items.pNowTop =  items.top_offset * proHeight+"px";
                    items.pNowLeft = items.left_offset * proWidth+"px";
                } else {
                    items.pNowTop =   "-2000px";
                    items.pNowLeft = "-2000px";
                }
            })

            this.eqtList.forEach((item)=>{
                if(item.top_offset && item.left_offset) {
                    item.pNowTop =  item.top_offset * proHeight+"px";
                    item.pNowLeft =  item.left_offset * proWidth+"px";
                } else {
                    item.pNowTop =   "-2000px";
                    item.pNowLeft = "-2000px";
                }
               
            })
        }
        
    }

    showInfo(item) {
        // this.dataService.changeEqtType(item);
        // this.router.navigate(['/tag/tab'],{
        //     queryParams:{
        //       'id':item.eqt_id,
        //       'eqt_name':item.eqt_name,
        //       'number':item.alarmCount 
        //     }
        //   });
        this.itemName = item.eqt_name;
        this.showType = 3;
        this.eqt_name = item.eqt_name;
        this.imgDataList = [];
        this.pNowTop =  parseFloat(item.pNowTop)- 94+"px";
        this.pNowLeft =   parseFloat(item.pNowLeft)+"px";
        this.tagService.getCustomizedType(item.eqt_id,this.category_type).then((result: any) => {
            if(result.code==1) {
                result.list.forEach(item => {
                    item.length>0 && item.forEach(li=>{
                        this.imgDataList.push(li);
                    })
                    this.imgDataList.push(item);
                });
                let  num  =  this.imgDataList.length%2;
                if(num==1) {
                    num+=(this.imgDataList.length-1)/2;
                } else {
                    num+=this.imgDataList.length/2;
                }
                setTimeout(()=>{
                    this.pNowTop =  parseFloat(item.pNowTop)- $(".sign-box").height()+"px";
                    this.pNowLeft =   parseFloat(item.pNowLeft)+"px";
                },100)
            }
        })
    }

    getAlarmTypeNumber(proHeight:any,proWidth:any):any {
      //产线和设备区分
        this.tagService.getCustomizedType(this.id,this.category_type).then((result: any) => {
            if(result.code==1) {
                if(result.list.length==0) {
                    this.counts = result.list.length;
                    result.list = [{
                        rule_type_item_name:'质量',
                        count:'0'
                    },{
                        rule_type_item_name:'成本',
                        count:'0'
                    },{
                        rule_type_item_name:'效率',
                        count:'0'
                    },{
                        rule_type_item_name:'安全',
                        count:'0'
                    }];
                } 
                
                result.list.forEach(item => {
                    item.length>0 && item.forEach(li=>{
                        this.imgDataList.push(li);
                    });
                    this.imgDataList.push(item);
                });
                setTimeout(()=>{
                    let boxHight =  this.signboxView.nativeElement.offsetHeight;
                    this.pNowTop =  this.eqtList[0].top_offset * proHeight -boxHight  +"px";
                    this.pNowLeft =  this.eqtList[0].left_offset * proWidth +"px";
                   if( this.counts == 0){
                    this.proHeight=proHeight; 
                    this.boxHight= boxHight;
                    this.proWidth=proWidth;
                   }
                },1000)

            }
          })
    }

    getAlarmEqtListA(eqt_id) {
        this.tagService.getAlarmEqtList('',"",eqt_id,'1', null).then((result: any) => {
          if(result.code==1) {
            this.alarmEqtListA = result.list;
          } 
        })
    }

    getAlarmEqtListB(eqt_id) {
        this.tagService.getAlarmEqtList('',"",eqt_id,'2', null).then((result: any) => {
          if(result.code==1) {
            this.alarmEqtListB = result.list;
       
          } 
        })
    }
}