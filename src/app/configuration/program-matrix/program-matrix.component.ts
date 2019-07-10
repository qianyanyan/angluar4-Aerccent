import { Component, OnInit, OnDestroy } from '@angular/core';
import { Format } from '../../core/common/format.service';
import {NzMessageService, NzModalService,UploadFile } from 'ng-zorro-antd';
import { Verify } from '../../core/common/verify.service';
import { deployService } from '../technology/deploy.service';
import { LocalStorage } from '../../core/common/local.storage';
import {  EXPORT_MATL} from '../../app.constants';

@Component({
  selector: 'app-program-matrix',
  templateUrl: './program-matrix.component.html',
  styleUrls: ['../technology/technology.component.less'],
  providers: [deployService],
})
export class ProgramMatrixComponent implements OnInit, OnDestroy {
  height:any;
  dataSet:any;
  isAdd = false;
  isUpdate = false;
  isAddBrand = false;
  isAddMatlname = false;
  isAddMatlTwo = false;
  add :any;
  search:any;
  update:any;
  loading = true;
  pageIndex = '1';
  pageSize = 10;
  total = '1';
  listBrandOption =[]
  uploading = false;
  fileList: UploadFile[] = [];
  listLangOption =[];
  gongyi=[];
  danwei=[];
  export :string;
  isImport = false;
  import = {
      is_empty:false,
      is_no_lang:false,
      is_all:true,
      is_lang:false,
      lang_id:null
  }
  constructor( 
      private format: Format,    
      private message: NzMessageService,
      private verify:Verify,
      private deployService:deployService,
      private modalService: NzModalService,
      private store:LocalStorage){
          this.export = EXPORT_MATL;
          this.setInit();
          this.listLangOption = [{
              label:'中文',
              value:'2'
          }]
  }

  beforeUpload = (file: UploadFile): boolean => {
      this.fileList = [file];
      return false;
  }
  handleUpload(): void {
      const formData = new FormData();
      this.fileList.forEach((file: any) => {
          formData.append('file', file);
      });
  
      // 导入进行判断
      if(this.import.is_lang==false) {
          if(this.import.is_all==false) {
              this.message.success('请选择导入全部数据');
              return;
          }
      } else {
          // if(this.import.lang_id==false) {
          //     this.message.success('请选择语言');
          //     return;
          // }
      }
      formData.append('is_empty', this.import.is_empty ? '1' : '0');
      formData.append('is_no_lang', this.import.is_no_lang ? '1' : '0');
      formData.append('is_all', this.import.is_all ? '1' : '0');
      formData.append('is_lang', this.import.is_lang ? '1' : '0');
      this.uploading = true;
      this.deployService.matlUpload(formData).then(result=>{
          this.uploading = false;
          if(result.code == 1) {
              this.isImport = false;
              this.fileList = [];
              this.getList();
              this.message.success('上传成功');
          } else {
              this.message.error(result.msg); 
          }
      },err=>{
          this.uploading = false;
          this.message.error('上传失败');
      })
  }
  chooseGonyi(){
      this.deployService.getaddgongYi().then(result=>{
          if(result.code == 1) {
              this.gongyi = result.list;
              console.log(result);
          }
          this.loading = false;
      }, err=>{
          this.loading = false;
      })
  }

  choosetimerDANWEi(){
    this.deployService.getadddanwei().then(result=>{
        if(result.code == 1) {
            this.danwei = result.data;
            console.log(result);
        }
        this.loading = false;
    }, err=>{
        this.loading = false;
    })
}
  
  changeLang(is:boolean) {
      setTimeout(()=>{
          if(is) {
              if( this.import.is_lang) {
                  this.import.is_all = false;
                  this.import.is_no_lang = false;
              } else {
                  this.import.is_all = true;
              }
          } else {
              this.import.is_lang = false;
          }
      },100);
  }
      
  
  ngOnInit(): void {
      this.getList(true); 
  }

  ngOnDestroy(): void {

  }

  setInit() {
      this.add = {
        plantCode:'',
        resourceType:'resource',
        resourceId:'',
        resourceDesc:'',
        firstMatlId:'',
        firstMatlDesc:'',
        secondMatlId:'',
        secondMatlDesc:'',
        unit_id:'',
        setupTime:''
      }
      this.update = {
        plantCode:'',
        resourceType:'',
        resourceId:'',
        resourceDesc:'',
        firstMatlId:'',
        firstMatlDesc:'',
        secondMatlId:'',
        secondMatlDesc:'',
        setupTime:'',
        unit_id:''
      }
      this.search = {
        resourceType:'',
        firstMatlDesc:'',
        secondMatlDesc:'',
        plantCode:''
      }
  }
  searchSubmit(){
    this.pageIndex = '1';
    this.loading = true;
    this.deployService.getsetupList(this.pageIndex, this.total,this.search.resourceType,this.search.firstMatlDesc,this.search.secondMatlDesc,this.search.plantCode).then(result=>{
        console.log(result);
        if(result.code == 1) {
            this.dataSet = result.data.list;
            console.log(this.dataSet);
            this.total = result.data.count;
        }
        this.loading = false;
    }, err=>{
        this.loading = false;
    })
  }

  resetForm(){
      this.search.resourceType ='';
      this.search.firstMatlDesc ='';
      this.search.secondMatlDesc ='';
      this.search.plantCode ='';
      this.getList(true);
  }

  showUpdate(data:any): void {
      this.isUpdate = true;
      data.is_valid = data.is_valid == 0 ? false :true;
      this.update = this.format.extend(true, {}, data);
  }


  hideUpdate():any{
      this.setInit();
      this.isUpdate = false;
  }
  updateSubmit():any{
      this.update.last_update_by = '1';
      // if(this.check(this.update)) {
      //     this.update.is_valid = this.update.is_valid == true ? '1':'0';
      console.log(this.update);
          this.deployService.updateProgramMatrix(this.update).then(result=>{
              if(result.code == 1) {
                  this.isUpdate = false;
                  this.message.create('success', '更新成功');
                  this.getList(true);
                  this.setInit();
              } else {
                  this.message.create('error', result.msg); 
              }
          })
      // }
     
  }

  showAdd(): void {
      this.isAdd = true;
  }

  hideAdd() {
      this.setInit();
      this.isAdd = false;
  }

  addSubmit(): void {
      // if(this.check(this.add)) {
          console.log(this.add);
          this.deployService.addProgramMatrix(this.add).then(result=>{
              if(result.code == 1) {
                  this.isAdd = false;
                  this.getList(true);
                  this.message.create('success', result.msg); 
              } else {
                  this.message.create('error', result.msg); 
              }
          })
      // }
  }

  // check(params:any) {
  //     if(this.verify.empty(params.matl_code)) {
  //         this.message.create('warning', '物料编号不能为空');
  //         return;
  //     } else if(this.verify.empty(params.brand_id)) {
  //         this.message.create('warning', '品牌不能为空');
  //         return;
  //     } else if( this.verify.empty(params.erp_matl_code)) {
  //         this.message.create('warning', 'ERP物料代码不能为空');
  //         return;
  //     }  else if( this.verify.empty(params.matl_name)) {
  //         this.message.create('warning', '物料名称不能为空');
  //         return;
  //     } 
  //     return true;
  // }


  delete(id:any) {
      this.modalService.confirm({
          nzTitle  : '<i>您想要删除这些条信息吗?</i>',
          nzOnOk   : () => {
              //先判断是否有子菜单，如果有子菜单禁止删除
              this.deployService.deleteprogram(id).then(result=>{
                  if(result.code == 1) {
                      this.message.create('success', '删除成功');
                      this.getList(true);
                      this.setInit();
                  } else {
                      this.message.create('error', result.msg); 
                  }
              })
          }
      });
  }
  
  getList(reset: boolean = false):void {
      
      if (reset) {
          this.pageIndex = '1';
      }
      this.loading = true;
      this.deployService.getsetupList(this.pageIndex, this.total,this.search.resourceType,this.search.firstMatlDesc,this.search.secondMatlDesc,this.search.plantCode).then(result=>{
          console.log(result);
          if(result.code == 1) {
              this.dataSet = result.data.list;
              console.log(this.dataSet);
              this.total = result.data.count;
          }
          this.loading = false;
      }, err=>{
          this.loading = false;
      })
  }
  
  showAddBrandModule() {
      this.isAddBrand =true;
  }

  showAddmatlName(){
      this.isAddMatlname= true;
  }

  showaddMatlTwo(){
      this.isAddMatlTwo = true;
  }

  hideAddBrandModule() {
      this.isAddBrand =false;
  }

  hideAddmatlName(){
    this.isAddMatlname= false;
  }

  hideaddMatlTwo(){
    this.isAddMatlTwo = false;
  }

  brandChange(data:any) {
      if(data.id) {
          this.add.resourceId = data.id;
          this.add.resourceDesc = data.resource_name;
          this.isAddBrand =false;
      }
     
  }
  
  matlName(data:any){
    if(data.id) {
        this.add.firstMatlId = data.matl_id;
        this.add.firstMatlDesc = data.matl_name;
        this.isAddMatlname= false;
    }
  }

  matlNameTwo(data:any){
    if(data.id) {
        this.add.secondMatlId = data.matl_id;
        this.add.secondMatlDesc = data.matl_name;
        this.isAddMatlTwo = false;
    }
  }
}