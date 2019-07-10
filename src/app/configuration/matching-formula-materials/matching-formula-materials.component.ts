import { Component, OnInit, OnDestroy } from '@angular/core';
import { Format } from '../../core/common/format.service';
import {NzMessageService, NzModalService,UploadFile } from 'ng-zorro-antd';
import { Verify } from '../../core/common/verify.service';
import { deployService } from '../technology/deploy.service';
import { LocalStorage } from '../../core/common/local.storage';
import {  EXPORT_MATL} from '../../app.constants';

@Component({
  selector: 'app-matching-formula-materials',
  templateUrl: './matching-formula-materials.component.html',
  styleUrls: ['../technology/technology.component.less'],
  providers: [deployService],
})
export class MatchingFormulaMaterialsComponent implements OnInit, OnDestroy{

  height:any;
  dataSet:any;
  isAdd = false;
  isUpdate = false;
  isAddBrand = false;
  isAddresource = false;
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
  export :string;
  zx=[];
  isImport = false;
  matl_names = [];
  resource_list = [];
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
      this.deployService.getaddgongchang().then(result=>{
          if(result.code == 1) {
              this.gongyi = result.list;
          }
          this.loading = false;
      }, err=>{
          this.loading = false;
      })
  }

  chooseGzzx(){
    this.deployService.getgzzx().then(result=>{
        if(result.code == 1) {
            this.zx = result.list;
        }
        this.loading = false;
    }, err=>{
        this.loading = false;
    })
  }

  chooseMatl(){
    this.deployService.getmatl().then(result=>{
        if(result) {
            this.matl_names = result;
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
            plant_code:'',
            short_description:'',
            scada_recipe_id:'',
            matl_code:'',
            matl_name:'',
            revision:'1',
            operation:'',
            resource_id:'',
            resource_name:'',
            description:''
      }
      this.update = {
            id:'',
            plant_code:'',
            short_description:'',
            scada_recipe_id:'',
            matl_code:'',
            matl_name:'',
            revision:'1',
            operation:'',
            resource_id:'',
            resource_name:'',
            description:''
      }
      this.search = {
        work_center_description:'',
        matl_description:'',
        resource_description:'',
        resource_group_description:'',
        plant_code:''
      }
  }
  searchSubmit(){
     
    this.pageIndex = '1';
    this.loading = true;
    this.deployService.getMatchingList(this.pageIndex, this.total,this.search.work_center_description,this.search.matl_description,this.search.resource_description,this.search.resource_group_description,this.search.plant_code).then(result=>{
        console.log(result);
        if(result.code == 1) {
            this.dataSet = result.list;
            this.total = result.count;
        }
        this.loading = false;
    }, err=>{
        this.loading = false;
    })
  }

  resetForm(){
        this.search.work_center_description='';
        this.search.matl_description='';
        this.search.resource_description='';
        this.search.resource_group_description='';
        this.search.plant_code='';
        this.search.routerCode='';
        this.getList(true);
  }

  showUpdate(data:any): void {
      this.isUpdate = true;
      this.update = this.format.extend(true, {}, data);
  }


  hideUpdate():any{
      this.setInit();
      this.isUpdate = false;
  }
  updateSubmit():any{
      this.update.last_update_by = '1';
      // if(this.check(this.update)) {
          this.deployService.updatematching(this.update).then(result=>{
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
          this.deployService.addMatchingFor(this.add).then(result=>{
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
              console.log(id);
              this.deployService.deletematching(id).then(result=>{
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
  getResource(){
    this.deployService.getResourceList().then(result=>{
        if(result.code == 1) {
            this.resource_list = result.list;
            console.log(result);
        } else {
            this.message.create('error', result.msg); 
        }
    })
  }
  
  getList(reset: boolean = false):void {
      
      if (reset) {
          this.pageIndex = '1';
      }
      this.loading = true;
      this.deployService.getMatchingList(this.pageIndex, this.total,this.search.work_center_description,this.search.matl_description,this.search.resource_description,this.search.resource_group_description,this.search.plant_code).then(result=>{
          console.log(result);
          if(result.code == 1) {
              this.dataSet = result.list;
              this.total = result.count;
          }
          this.loading = false;
      }, err=>{
          this.loading = false;
      })
  }
  
  showAddBrandModule() {
      this.isAddBrand =true;
  }
  showAddresoutModule() {
    this.isAddresource =true;
  }

  hideAddBrandModule() {
      this.isAddBrand =false;
  }

  hideAddResourceModule() {
    this.isAddresource =false;
  }

  brandChange(data:any) {
      if(data.matl_id) {
          this.add.matl_code = data.matl_id;
          this.add.matl_name = data.matl_name;
          this.isAddBrand =false;
      }
     
  }

  resourceChange(data:any) {
     
    if(data.id) {
        this.add.resource_id = data.id;
        this.add.resource_name = data.resource_name;
        this.isAddresource =false;
    }
   
}

}


