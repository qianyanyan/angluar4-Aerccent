import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { Format } from '../../core/common/format.service';
import {NzMessageService, NzModalService,UploadFile } from 'ng-zorro-antd';
import { Verify } from '../../core/common/verify.service';
import { EqtService } from './eqt.service';
import {  EXPORT_PROP_INST} from '../../app.constants';

@Component({
    selector:'prop-inst',
    templateUrl:'./prop-inst.component.html',
    styleUrls:['./eqt-tab.component.less'],
    providers: [EqtService] 
})

export class PropInstComponent implements OnInit, OnDestroy {
    @Input() id: any;
    @Input() category_type: any;
    height:any;
    dataSet:any;
    isAdd = false;
    isUpdate = false;
    isAddProp = false;
    add :any;
    update:any;
    loading = true;
    pageIndex = 1;
    pageSize = 10;
    total = 1;
    listUnitPtion =[]
    listTypePtion =[]
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
        prop_name: '',
        prop_short_name: '',
        prop_inst_name: '' 
    }
    constructor( 
        private format: Format,    
        private message: NzMessageService,
        private verify:Verify,
        private eqtService:EqtService,
        private modalService: NzModalService){
            this.export = EXPORT_PROP_INST;
        this.listTypePtion  = [{
            id:'Dynamic',
            label:'动态'
        },{
            id:'Static',
            label:'静态'
        }]

        this.setInit();
        this.listLangOption = [{
            label:'中文',
            value:'2'
        }]
    }


    ngOnInit(): void {
        this.setInit();
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
            prop_name: '',
            prop_short_name: '',
            prop_inst_name: '' 
        }
        this.getList(true);
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
        formData.append('eqt_id', this.id);
        this.uploading = true;
        this.eqtService.propInstUpload(formData).then(result=>{
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
    

    setInit() {
        this.add = {
            prop_inst_code:'',
            prop_id:'',
            prop_name:'',
            prop_short_name:'',
            prop_inst_name:'',
            unit_id:'',
            unit_name:'',
            prop_type:'',
            prop_value:'',
            category: this.category_type,
            eqt_id:this.id,
            is_valid: true,
            remark:'',
            last_update_by:'1'
        }

        this.update = {
            prop_inst_id:'',
            prop_inst_code:'',
            prop_id:'',
            prop_name:'',
            prop_short_name:'',
            prop_inst_name:'',
            unit_id:'',
            unit_name:'',
            prop_type:'',
            prop_value:'',
            category: this.category_type,
            eqt_id:this.id,
            is_valid:true,
            remark:'',
            last_update_by:'1'
        }
    }

    showUpdate(data:any): void {
        this.isUpdate = true;
        this.update = this.format.extend(true, {}, data);
        this.update.category = this.category_type;
    }
 
    hideUpdate():any{
        this.setInit();
        this.isUpdate = false;
    }
    updateSubmit():any{
        this.update.last_update_by = '1';
        if(this.check(this.update)) {
            this.eqtService.updatePropInst(this.update).then(result=>{
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
            this.eqtService.addPropInst(this.add).then(result=>{
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
        if(this.verify.empty(params.prop_inst_code)) {
            this.message.create('warning', '属性实例编码不能为空');
            return;
        } else if( this.verify.empty(params.prop_name)) {
            this.message.create('warning', '属性名称不能为空');
            return;
        }  else if( this.verify.empty(params.prop_short_name)) {
            this.message.create('warning', '属性实例简写不能为空');
            return;
        }  else if( this.verify.empty(params.prop_inst_name)) {
            this.message.create('warning', '属性实例名称不能为空');
            return;
        }  else if( this.verify.empty(params.unit_id)) {
            this.message.create('warning', '单位不能为空');
            return;
        }  else if( this.verify.empty(params.prop_type)) {
            this.message.create('warning', '类型不能为空');
            return;
        }  else if( this.verify.empty(params.prop_value)) {
            this.message.create('warning', '值不能为空');
            return;
        } 
        return true;
    }

    delete(id:any) {
        this.modalService.confirm({
            nzTitle  : '<i>您想要删除这些条信息吗?</i>',
            nzOnOk   : () => {
                //先判断是否有子菜单，如果有子菜单禁止删除
                this.eqtService.deletePropInst(id, '1').then(result=>{
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
        this.eqtService.getPropInstList(this.id, this.pageIndex, this.pageSize, this.search).then(result=>{
            if(result.code == 1) {
                this.dataSet = result.list;
                this.total = result.count;
            }
            this.loading = false;
        }, err=>{
            this.loading = false;
        })
    }
    
    showAddPropModule() {
        this.isAddProp =true;
    }

    hideAddPropModule() {
        this.isAddProp =false;
    }

    propChange(data:any) {
        if(data.prop_id) {
            this.add.prop_id = data.prop_id
            this.add.prop_name =  data.prop_name
            this.update.prop_id = data.prop_id
            this.update.prop_name =  data.prop_name
            this.isAddProp =false;
        }
    }

    getUnitList() {
        this.eqtService.getUnitList().then(result=>{
            if(result.code == 1) {
                this.listUnitPtion = result.list;
            }
        })
    }
}