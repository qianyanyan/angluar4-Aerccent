import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
import {FILE_UPDATE_EQT,FILE_DOWNLOAD_EQT} from '../../app.constants';
import { EqtService } from "./eqt.service";
import { LocalStorage } from '../../core/common/local.storage';

@Component({
    selector:'org-base-info',
    templateUrl:'./org-base-info.component.html',
    styleUrls:['./org-base-info.component.less'],
    providers: []
})

export class OrgBaseInfoComponent implements OnInit, OnDestroy {
    @Input() id: any;
    nzAction= FILE_UPDATE_EQT;
  org = {
        id :'',
        image_url:'',
        org_name:'',
        org_detail:'',
      category_type:'',
      org_type_id:'',
      resource_id:''
    }
    ngOnInit(): void {
      this.getOrgDetail();
    }

    ngOnDestroy(): void {

    }

    loading = false;
    avatarUrl: string;
  
    constructor(  
        private message: NzMessageService,
        private msg: NzMessageService, 
        private eqtService:EqtService,
        private store:LocalStorage) { 
        
    }
    submit() {
   
        this.eqtService.updateOrgDetail(this.org).then(result=>{
            if(result.code == 1) {
                this.message.create('success', '更新成功');
            } 
        })
    }
  getOrgDetail() {
      this.eqtService.getOrgDetail(this.id).then(result=>{
            if(result.code == 1) {
              this.org.id = this.id;
              this.org.image_url = result.data.image_url;
               result.data.image_url &&   (this.avatarUrl = FILE_DOWNLOAD_EQT+"&fileName="+result.data.image_url);
              this.org.org_name = result.data.org_name;
              this.org.category_type = result.data.category_type;
              this.org.org_type_id = result.data.org_type_id;
              this.org.resource_id = result.data.resource_id;
              this.store.set('eqt_name', result.data.org_name);
              this.org.org_detail = result.data.org_detail;
            } 
        })
    }
  
    beforeUpload = (file: File) => {
      return new Observable((observer: Observer<boolean>) => {
        const isJPG = file.type === 'image/jpeg';
         
        const isLt2M = file.size / 1024 / 1024 < 20;
        if (!isLt2M) {
          this.msg.error('Image must smaller than 20MB!');
          observer.complete();
          return;
        }
        observer.next(isLt2M);
        observer.complete();
         
      });
    }
  
    private getBase64(img: File, callback: (img: string) => void): void {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result.toString()));
      reader.readAsDataURL(img);
    }

  removeImg() {
    this.org.image_url = '';
    this.avatarUrl = '';
  }
  
    
    handleChange(info: { file: UploadFile,fileList:any }): void {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        this.org.image_url = info.fileList[0].response.attList[0].newFileName;
        // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
      }
    }
}