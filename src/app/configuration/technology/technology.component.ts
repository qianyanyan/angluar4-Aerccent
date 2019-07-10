import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';
import { deployService } from "./deploy.service";
import { LocalStorage } from '../../core/common/local.storage';
import { DataService } from "../../DataService";

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.less'],
  providers: [ deployService ]
})
export class TechnologyComponent implements OnInit , OnDestroy{
  type:string;
  moduleList= [];
  tabs = []; 
  nzSelectedIndex = 0;
  constructor(   
    private activeRoute: ActivatedRoute,
    private store:LocalStorage, 
    private router: Router,
    private data: DataService){
    let userInfo = store.get("userInfo");
    let parent_module_id = '';
    let tabType = store.get("matlTab");
    userInfo.moduleList.forEach((value,index) => {
        //获取他的父菜单
        if(value.class_name=='T_Router') {
            parent_module_id = value.id;
        }
    })
    userInfo.moduleList.forEach(value => {
      //获取他的父菜单
      if(value.parent_module_id==parent_module_id) {
          this.tabs.push(value)
      }
  })
  this.tabs.forEach((value,index) => {
      if(tabType && tabType == value.class_name) {
          this.nzSelectedIndex = index;
      }
  })

  
  if(this.tabs.length>0) {
      if(tabType) {
          this.type = tabType;
      } else {
          this.type =this.tabs[0].class_name;
      }
  }

  this.store.set("matlTab",this.type);
}

ngOnDestroy(): void {
  this.store.set("matlTab","");
}

typeChage(type) {
  if(type=='T_Router') {
      this.data.changeMessage("工艺/工艺配置");
  } else if(type=='T_Router_setp') {
      this.data.changeMessage("工艺/工艺步骤");
  } else if(type=='T_Router_next_step') {
      this.data.changeMessage("工艺/工艺顺序");
  }
  this.type =type;
  this.store.set("matlTab",this.type);
}

ngOnInit(): void {

}

log(args: any[]): void {
  console.log(args);
}


}

