import { Component, OnInit, OnDestroy } from '@angular/core';
import { TreeNodeInterface } from './treeModeInterFace';
import { Router , ActivatedRoute, NavigationEnd} from '@angular/router';
import { TagService } from "./tag.service";
import { LocalStorage } from '../core/common/local.storage';
import { DataService } from "../DataService";
@Component({
    selector:'tag-index',
    templateUrl:'./tag-index.component.html',
    styleUrls:['./tag.component.less','./tag-index.component.less'],
    providers: [ TagService ]
})

export class TagIndexComponent implements OnInit, OnDestroy {
    height:any;
    
    data:any;
    allDataList:any;
    monitorCount =  [];
    alarmCount = [];
    waitConfirmCount = [];
    alarmHCount = [];
    getAlarmStatus = [];
    time:string;
    timer:any;
    isBack:boolean;
    constructor(
      private router: Router, 
      private tagService:TagService,
      private store:LocalStorage,
      private activeRoute: ActivatedRoute,
      private dataService:DataService
      ){
      this.height = (document.body.clientHeight-180)+"px";
      this.activeRoute.queryParams.subscribe(params => {
          let time  = params['time'];    
          if(this.time!=time) {
            this.timer &&  clearInterval(this.timer);
            this.getEqtTree();
          } 
          this.time = time;

      });

      this.dataService.isTAabBack.subscribe(message =>{
        if(message==true) {
          this.timer &&  clearInterval(this.timer);
          this.getAlarmList();
          this.dataService.changeTagBack(false);
        }
      });
 
    }

    ngOnInit(): void {
    
    }

    ngAfterViewInit(){
      // 监听路由变化
      this.isBack = false;

      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (event.url && event.url.indexOf('/tag/index') > -1) {
            if (this.isBack && this.activeRoute.snapshot.queryParams.time == this.time) {
              this.timer && clearInterval(this.timer);
              this.isBack = false;
              this.getAlarmList();
            }
          } else {
            this.timer && clearInterval(this.timer);
          }  
        }
      })
       
  }

    ngOnDestroy(): void {

    }
     expandDataCache = {};
    
      collapse(array: any[], data: any, $event: boolean): void {
        console.log(data);
        if ($event === false) {
          if (data.children) {
            data.children.forEach(d => {
              const target = array.find(a => a.id === d.id);
              target.expand = false;
              this.collapse(array, target, false);
            });
          } else {
            return;
          }
        }
      }

      stop($event) {
        let tagName = $event.target.tagName ;
        if(tagName=="span" || tagName=="SPAN") {
          $event.stopPropagation();
        }
       
      }
    
      convertTreeToList(root: object): TreeNodeInterface[] {
        const stack = [];
        const array = [];
        const hashMap = {};
        stack.push({ ...root, level: 0, expand: true });
      
        while (stack.length !== 0) {
          const node = stack.pop();
          this.visitNode(node, hashMap, array);
          if (node.children) {
            for (let i = node.children.length - 1; i >= 0; i--) {
             if(0 == node.level||node.level==1){
              stack.push({ ...node.children[ i ], level: node.level + 1, expand: true, parent: node });
             }else{
              stack.push({ ...node.children[ i ], level: node.level + 1, expand: false, parent: node });
             }
            //  stack.push({ ...node.children[ i ], level: node.level + 1, expand: false, parent: node });
            }
          }
        }
  
        return array;
      }
    
      visitNode(node: any, hashMap: object, array: TreeNodeInterface[]): void {
        if (!hashMap[ node.id ]) { 
          hashMap[ node.id ] = true;
          array.push(node);
        }
      }
    
     
      getEqtTree():void {
        let userInfo = this.store.get("userInfo");
        this.tagService.getRoleEqtTree(userInfo.user.id).then((result: any) => {
          if(result.code==1) {
            this.allDataList = result.data;
            this.data = this.getChildData(null);
            this.data.forEach(item => {
              this.expandDataCache[ item.id ] = this.convertTreeToList(item);
            });
            this.getAlarmList();
          } 
        })
      }

      getAlarmList():void {
        this.tagService.getAlarmList().then((result: any) => {
          if(result.code==1) {
            this.handData(result);
          } 
        },()=>{
          this.timer = setTimeout(()=>{
            this.getAlarmList();
          },5000)
        })
      }

      handData(alarmList):void {
        this.monitorCount = [];
        this.alarmCount = [];
        this.waitConfirmCount = [];
        this.alarmHCount = [];
        this.getAlarmStatus = [];
        alarmList.monitorCount && alarmList.monitorCount.forEach(item=> {
          this.monitorCount[item.eqt_id] = item.count;
        })
        alarmList.alarmCount && alarmList.alarmCount.forEach(item=> {
          this.alarmCount[item.eqt_id] = item.count;
        })
        alarmList.waitConfirmationAlarmHCount && alarmList.waitConfirmationAlarmHCount.forEach(item=> {
          this.waitConfirmCount[item.eqt_id] = item.count;
        })
        alarmList.alarmHCount && alarmList.alarmHCount.forEach(item=> {
          this.alarmHCount[item.eqt_id] = item.count;
        })

        alarmList.getAlarmStatus && alarmList.getAlarmStatus.forEach(item=> {
          this.getAlarmStatus[item.eqt_id] = item.formula_value;
        })

        
       
        this.allDataList.forEach(item => {
          item.monitorCount = this.monitorCount[item.id];
          item.alarmCount = this.alarmCount[item.id];
          item.waitConfirmCount =this.waitConfirmCount[item.id];
          item.alarmHCount =this.alarmHCount[item.id];
          item.getAlarmStatus  = this.getAlarmStatus[item.id];

          item.selfMonitorCount = this.monitorCount[item.id];
          item.selfAlarmCount = this.alarmCount[item.id];
          item.selfWaitConfirmCount =this.waitConfirmCount[item.id];
          item.selfAlarmHCount =this.alarmHCount[item.id];
        })

        this.dataService.changeEqtTree(this.allDataList);

        // this.allDataList.forEach(item => {
          
        //   let showTotal = this.getChildCount(item.id);
        //   showTotal.monitorCount && (item.monitorCount=showTotal.monitorCount);
        //   showTotal.alarmCount &&  (item.alarmCount=showTotal.alarmCount);
        //   showTotal.waitConfirmCount && (item.waitConfirmCount=showTotal.waitConfirmCount) ;
        //   showTotal.alarmHCount && (item.alarmHCount=showTotal.alarmHCount);
        // })
   
        this.data.forEach(item => {
          this.showTotal(this.expandDataCache[item.id]);
        });
    

        this.timer= setTimeout(()=>{
          this.getAlarmList();
        },5000)
      }

      showTotal(data:any) {
        data.forEach(item => {
          this.getCurrentCount(item);
          let showTotal = this.getChildCount(item.id);
          // showTotal.monitorCount && (item.monitorCount=showTotal.monitorCount);

          if (showTotal.monitorCount) {
            if (item.monitorCount>=0) {
              item.monitorCount += showTotal.monitorCount
            } else {
              item.monitorCount = showTotal.monitorCount
            }
          }
          showTotal.alarmCount &&  (item.alarmCount=showTotal.alarmCount);
          showTotal.waitConfirmCount && (item.waitConfirmCount=showTotal.waitConfirmCount) ;
          showTotal.alarmHCount && (item.alarmHCount=showTotal.alarmHCount);
          if(item.children) {
            this.showTotal(item.children)
          }
        })
      }

      getCurrentCount(item) {
        this.allDataList.forEach(value => {
          if (value.id == item.id) {
            item.monitorCount =  value.monitorCount;  
            item.alarmCount = value.alarmCount;
            item.waitConfirmCount = value.waitConfirmCount; 
            item.alarmHCount = value.alarmHCount; 
            item.getAlarmStatus = value.getAlarmStatus; 
          }
        });
      }

      getChildCount(id) {
        let obj = {
          monitorCount:0,
          alarmCount:0,
          waitConfirmCount:0,
          alarmHCount:0
        }
        this.allDataList.forEach(value => {
          if (value.upper_eqt_id == id) {
            value.monitorCount && (obj.monitorCount+=value.monitorCount);
            value.alarmCount &&  (obj.alarmCount+=value.alarmCount);
            value.waitConfirmCount && (obj.waitConfirmCount+=value.waitConfirmCount) ;
            value.alarmHCount && (obj.alarmHCount+=value.alarmHCount);
           
           let childCount =  this.getChildCount(value.id)
           childCount.monitorCount && (obj.monitorCount+=childCount.monitorCount);
           childCount.alarmCount &&  (obj.alarmCount+=childCount.alarmCount);
           childCount.waitConfirmCount && (obj.waitConfirmCount+=childCount.waitConfirmCount) ;
           childCount.alarmHCount && (obj.alarmHCount+=childCount.alarmHCount);
          }
        });
        return obj;
      }

      getChildData(id): any {
        let childrenList = [];
        this.allDataList.forEach(value => {
          if (value.upper_eqt_id == id) {
            //判断是否有子集
            let isChild = false;
            //循环是否有子菜单
            this.allDataList.forEach(d => {
              if (value.id == d.upper_eqt_id) {
                isChild = true;
              }
            })
            //是否有子菜单
            if (isChild) {
              childrenList.push({
                id: value.id,
                eqt_name: value.eqt_name,
                upper_eqt_id: value.upper_eqt_id,
                eqt_type_name: value.eqt_type_name,
                eqt_type_id:value.eqt_type_id,
                monitorCount: value.monitorCount,
                alarmCount: value.alarmCount,
                waitConfirmCount:value.waitConfirmCount,
                alarmHCount: value.alarmHCount,
                eqt_detail:value.eqt_detail,
                category_type:value.category_type,
                children: this.getChildData(value.id),
              })
            } else {
              childrenList.push({
                id: value.id,
                eqt_name: value.eqt_name,
                upper_eqt_id: value.upper_eqt_id,
                eqt_type_id:value.eqt_type_id,
                eqt_type_name: value.eqt_type_name,
                monitorCount: value.monitorCount,
                alarmCount: value.alarmCount,
                waitConfirmCount:value.waitConfirmCount,
                alarmHCount: value.alarmHCount,
                eqt_detail:value.eqt_detail,
                category_type:value.category_type,
              })
            }
            
          }
        });
        return childrenList;
      }

      jumpDetail(item):void {
          let obj = {
            id: item.id,
            eqt_name: item.eqt_name,
            upper_eqt_id: item.upper_eqt_id,
            eqt_type_id:item.eqt_type_id,
            eqt_type_name: item.eqt_type_name,
            monitorCount: item.monitorCount,
            alarmCount: item.alarmCount,
            waitConfirmCount:item.waitConfirmCount,
            alarmHCount: item.alarmHCount,
            eqt_detail:item.eqt_detail,
            category_type:item.category_type,
          }

          
          this.dataService.changeEqtType(obj);
        
          if(item.children) {
            this.dataService.changeEqtList(item.children);
          } else {
            this.dataService.changeEqtList(item.children);
          }
          this.timer &&  clearInterval(this.timer);
          this.isBack = true;
          this.store.set('larmTab','');
         
          this.router.navigate(['/tag/tab'],{
            queryParams:{
              'id':item.id,
              'eqt_name':item.eqt_name,
              'number':item.alarmCount,
              "category_type":item.category_type
            }
          });
    }
}