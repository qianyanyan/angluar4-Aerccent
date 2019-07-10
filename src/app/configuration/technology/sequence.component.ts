import { Component, OnInit, OnDestroy } from '@angular/core';
import { Format } from '../../core/common/format.service';
import {NzMessageService, NzModalService,UploadFile } from 'ng-zorro-antd';
import { Verify } from '../../core/common/verify.service';
import { deployService } from './deploy.service';
import { LocalStorage } from '../../core/common/local.storage';
import {  EXPORT_MATL} from '../../app.constants';
@Component({
    selector:'sequence',
    templateUrl:'./sequence.component.html',
    styleUrls:['./technology.component.less'],
    providers: [deployService]
})

export class sequenceComponent implements OnInit, OnDestroy {
    height:any;
    dataSet:any;
    isAdd = false;
    isUpdate = false;
    isAddBrand = false;
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
        this.deployService.getaddgyOption().then(result=>{
            if(result) {
                this.gongyi = result;
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
            router_step_id:'',
            next_router_step_id:''
        }
        this.update = {
            id:'',
            router_step_id:'',
            next_router_step_id:''
        }
        this.search = {
            router_step_description:'',
            next_router_step_description:''
        }
    }
    searchSubmit(){
        this.pageIndex = '1';
        this.deployService.getsequenceList(this.pageIndex, '10',this.search.router_step_description,this.search.next_router_step_description).then(result=>{
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
        this.search.router_step_description	='';
        this.search.next_router_step_description='';
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
            this.deployService.updatesequenceOption(this.update).then(result=>{
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
            this.deployService.addsequence(this.add).then(result=>{
                if(result.code == 1) {
                    this.isAdd = false;
                    this.message.create('success', '新增成功');
                    this.getList(true);
                    this.setInit();
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
                this.deployService.deletesequence(id, '1').then(result=>{
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
        this.deployService.getsequenceList(this.pageIndex, this.total,'','').then(result=>{
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

    hideAddBrandModule() {
        this.isAddBrand =false;
    }

    // brandChange(data:any) {
    //     console.log(data);
    //     if(data) {
    //         this.add.brand_id = data.brand_id;
    //         this.add.brand_name = data.brand_name;
    //         this.update.brand_id = data.brand_id;
    //         this.update.brand_name = data.brand_name;
    //         this.isAddBrand =false;
    //     }
       
    // }

}