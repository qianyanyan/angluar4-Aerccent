import { Component, OnInit, OnDestroy } from '@angular/core';
import { Format } from '../../core/common/format.service';
import {NzMessageService, NzModalService,UploadFile } from 'ng-zorro-antd';
import { Verify } from '../../core/common/verify.service';
import { PropService } from './prop.service';
import {  EXPORT_PROP} from '../../app.constants';
 
@Component({
    selector:'prop-index',
    templateUrl:'./prop.component.html',
    styleUrls:['./prop.component.less'],
    providers: [PropService]
})

export class PropComponent implements OnInit, OnDestroy {
    height:any;
    dataSet:any;
    isAdd = false;
    isUpdate = false;
    add :any;
    update:any;
    loading = true;
    pageIndex = 1;
    pageSize = 10;
    total = 1;
    listUnitOption =[]
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
    search = {
        prop_short_name:null,
        prop_name:null
    }
    constructor( 
        private format: Format,    
        private message: NzMessageService,
        private verify:Verify,
        private propService:PropService,
        private modalService: NzModalService){
        this.export = EXPORT_PROP;
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
        this.propService.handleUpload(formData).then(result=>{
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
        this.getList(true);
        this.getUnitList();
    }

    ngOnDestroy(): void {

    }

    searchSubmit(): void {
        this.getList(true);
    }

    resetForm(): void {
        this.search = {
            prop_short_name: null,
            prop_name: null
        }
        this.getList(true);
    }

    setInit() {
        this.add = {
            prop_code:'',
            unit_id:null,
            prop_short_name:'',
            prop_name:'',
            remark:'',
            is_valid: true 
        }
        this.update = {
            id:'',
            prop_code:'',
            unit_id:null,
            prop_short_name:'',
            prop_name:'',
            remark:'',
            is_valid: true 
        }
    }

    showUpdate(data:any): void {
        this.isUpdate = true;
        this.update = this.format.extend(true, {}, data);
        this.update.is_valid = this.update.is_valid == '1' ? true : false;
    }

 
    hideUpdate():any{
        this.setInit();
        this.isUpdate = false;
    }
    updateSubmit():any{
        this.update.last_update_by = '1';
        if(this.check(this.update)) {
            this.propService.updateProp(this.update).then(result=>{
                if(result.code == 1) {
                    this.isUpdate = false;
                    this.message.create('success', '更新成功');
                    this.getList(true);
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
            this.propService.addProp(this.add).then(result=>{
                if(result.code == 1) {
                    this.isAdd = false;
                    this.message.create('success', '添加成功');
                    this.getList(true);
                    this.setInit();
                } else {
                    this.message.create('error', result.msg); 
                }
            })
        }
    }

    check(params:any) {
        if(this.verify.empty(params.prop_code)) {
            this.message.create('warning', '属性编号不能为空');
            return;
        } else if(params.unit_id==null) {
            this.message.create('warning', '单位不能为空');
            return;
        } else if( this.verify.empty(params.prop_short_name)) {
            this.message.create('warning', '属性缩写不能为空');
            return;
        }  else if( this.verify.empty(params.prop_name)) {
            this.message.create('warning', '属性名称不能为空');
            return;
        }  
        return true;
    }


    delete(id:any) {
        this.modalService.confirm({
            nzTitle  : '<i>您想要删除这些条信息吗?</i>',
            nzOnOk   : () => {
                //先判断是否有子菜单，如果有子菜单禁止删除
                this.propService.deleteProp(id, '1').then(result=>{
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
            this.pageIndex = 1;
        }
        this.loading = true;
        this.propService.getPropList(this.pageIndex, this.pageSize, this.search).then(result=>{
            if(result.code == 1) {
                this.dataSet = result.list;
                this.total = result.count;
            }
            this.loading = false;
        }, err=>{
            this.loading = false;
        })
    }

    getUnitList() {
        this.propService.getUnitList().then(result=>{
            this.listUnitOption = result.list; 
        })
    }

}