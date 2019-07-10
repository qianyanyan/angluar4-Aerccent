import { Component, OnInit, OnDestroy } from '@angular/core';
import { Format } from '../../core/common/format.service';
import {NzMessageService, NzModalService,UploadFile } from 'ng-zorro-antd';
import { Verify } from '../../core/common/verify.service';
import { CustomizedTypeService } from './customized-type.service';
import {  EXPORT_CUSTOMIZED_TYPE} from '../../app.constants';
 
@Component({
    selector:'customized-type-index',
    templateUrl:'./customized-type.component.html',
    styleUrls:['./customized-type.component.less'],
    providers: [CustomizedTypeService]
})

export class CustomizedTypeComponent implements OnInit, OnDestroy {
    height:any;
    data:any;
    isAdd = false;
    isUpdate = false;
    add :any;
    update:any;
    
    loading = true;
    uploading = false;
    fileList: UploadFile[] = [];
    listLangOption =[];
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
        private customizedTypeService:CustomizedTypeService,
        private modalService: NzModalService){
        this.export = EXPORT_CUSTOMIZED_TYPE;
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
        this.customizedTypeService.handleUpload(formData).then(result=>{
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
        this.getList();
    }

    ngOnDestroy(): void {

    }

    setInit() {
        this.add = {
            customized_type_code:'',
            customized_type_id:'',
            customized_type_name:'',
            is_valid_alarm:false,
            is_valid_kpi:false,
            remark:'',
            last_update_by:'1'
        }
        this.update = {
            customized_type_code:'',
            customized_type_id:'',
            customized_type_name:'',
            is_valid_alarm:false,
            is_valid_kpi:false,
            remark:'',
            last_update_by:'1'
        }
    }

    showUpdate(data:any): void {
        this.isUpdate = true;
        this.update = this.format.extend(true, {}, data);
        this.update.is_valid_alarm = data.is_valid_alarm == "1" ? true : false;
        this.update.is_valid_kpi =  data.is_valid_kpi == "1" ? true : false;
    }

 
    hideUpdate():any{
        this.setInit();
        this.isUpdate = false;
    }
    updateSubmit():any{
        this.update.last_update_by = '1';
        if(this.check(this.update)) {
            this.customizedTypeService.updateCustomizedType(this.update).then(result=>{
                if(result.code == 1) {
                    this.isUpdate = false;
                    this.message.create('success', '更新成功');
                    this.getList();
                    this.setInit();
                } else {
                    this.message.create('error', result.msg); 
                }
            })
        }
       
    }

    showAdd(): void {
        this.isAdd = true;
    }

    hideAdd() {
        this.setInit();
        this.isAdd = false;
    }

    addSubmit(): void {
        if(this.check(this.add)) {
            this.customizedTypeService.addCustomizedType(this.add).then(result=>{
                if(result.code == 1) {
                    this.isAdd = false;
                    this.message.create('success', '添加成功');
                    this.getList();
                    this.setInit();
                } else {
                    this.message.create('error', result.msg); 
                }
            })
        }
    }

    check(params:any) {
        if(this.verify.empty(params.customized_type_code)) {
            this.message.create('warning', '自定义类型编号不能为空');
            return;
        } else if(this.verify.empty(params.customized_type_id)) {
            this.message.create('warning', '名称/序号不能为空');
            return;
        } else if( this.verify.empty(params.customized_type_name)) {
            this.message.create('warning', '设备类型名称不能为空');
            return;
        }  
        return true;
    }


    delete(id:any) {
        this.modalService.confirm({
            nzTitle  : '<i>您想要删除这些条信息吗?</i>',
            nzOnOk   : () => {
                //先判断是否有子菜单，如果有子菜单禁止删除
                this.customizedTypeService.deleteCustomizedType(id, '1').then(result=>{
                    if(result.code == 1) {
                        this.message.create('success', '删除成功');
                        this.getList();
                        this.setInit();
                    } else {
                        this.message.create('error', result.msg); 
                    }
                })
            }
        });
    }
    getList():void {
        this.loading = true;
        this.customizedTypeService.getCustomizedTypeList().then((result: any) => {
            if(result.code==1) {
                this.data = result.list;
            } 
            this.loading = false;
        }, err=>{
            this.loading = false;
        })
    }
 

}