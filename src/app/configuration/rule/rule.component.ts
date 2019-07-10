import { Component, OnInit, OnDestroy } from '@angular/core';
import { Format } from '../../core/common/format.service';
import {NzMessageService, NzModalService,UploadFile } from 'ng-zorro-antd';
import { Verify } from '../../core/common/verify.service';
import { RuleService } from './rule.service';
import { EXPORT_RULE} from '../../app.constants';
 
@Component({
    selector:'rule-index',
    templateUrl:'./rule.component.html',
    styleUrls:['./rule.component.less'],
    providers: [RuleService]
})

export class RuleComponent implements OnInit, OnDestroy {
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
    listRuleTypeOption =[];
    ruleTypeItemList = [];
    listUnitOption = [];
    listPriorityOption = [];
    listmethodOption=[];
    listCustomizedType1Option = [];
    listCustomizedType2Option = [];
    listCustomizedType3Option = [];
    listeqtAreaOption = [];
    export :string;
    isImport = false;
    import = {
        is_empty:false,
        is_no_lang:false,
        is_all:true,
        is_lang:false,
        lang_id:null
    }
    listLangOption =[];
    fileList: UploadFile[] = [];
    uploading = false;

    search = {
        rule_name: '',
        rule_type: null,
        priority: null,
        para_acq_method:null
    }

    constructor( 
        private format: Format,    
        private message: NzMessageService,
        private verify:Verify,
        private ruleService:RuleService,
        private modalService: NzModalService){
            this.listLangOption = [{
                label:'中文',
                value:'2'
            }]
        this.setInit();
        this.export = EXPORT_RULE;
        this.listRuleTypeOption = [
            {
                label:'报警',
                value:'1'
            },
            {
                label:'指标',
                value:'2'
            }
        ]
        this.listPriorityOption = [
            {
                label:'H',
                value:'H'
            },{
                label:'M',
                value:'M'
            },{
                label:'L',
                value:'L'
            }
        ]
        this.listeqtAreaOption = [
            {
                label:'包装',
                value:'1'
            },{
                label:'酿造/动力',
                value:'2'
            }
        ]
        this.listmethodOption = [
            {
                label:'手动',
                value:'1'
            },{
                label:'自动化',
                value:'2'
            },
            {
                label:'两者都有',
                value:'3'
            }
        ]
 
    }
    ngOnInit(): void {
        this.getUnitList();
        this.getList(true);
    }

    ngOnDestroy(): void {

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
        this.ruleService.handleUpload(formData).then(result=>{
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
    
  
    searchSubmit(): void {
        this.getList(true);
    }

    resetForm(): void {
        this.search = {
            rule_name: '',
            rule_type: null,
            priority: null ,
            para_acq_method:null
        }
        this.getList(true);
    }

    setInit() {
        this.add = {
            rule_id:'',
            rule_code:'',
            rule_type:null,
            rule_name:'',
            priority:null,
            para_acq_method:null,
            area:null,
            customized_type:'',
            customized_type_1:null,
            customized_type_2:null,
            customized_type_3:null,
            is_valid: true,
            unit_id:null,
            unit_name:'',
            formula:'',
            remark:'' 
        }
        this.update = {
            rule_code:'',
            rule_type:null,
            rule_name:'',
            priority:null,
            para_acq_method:null,
            area:null,
            is_valid: true,
            customized_type: '',
            customized_type_1:null,
            customized_type_2:null,
            customized_type_3:null,
            unit_id:null,
            unit_name:'',
            formula:'',
            remark:'' 
        }
    }

    showUpdate(data:any): void {
        this.isUpdate = true;
        this.update = this.format.extend(true, {}, data);
        if( this.update.customized_type_1 ||  this.update.customized_type_2  || this.update.customized_type_3) {
            this.update.area = "1";
        } else {
            this.update.customized_type_1 = this.update.customized_type_6;
            this.update.customized_type_2 = this.update.customized_type_7;  
            this.update.customized_type_3 = this.update.customized_type_8;
            this.update.area = "2";
        }
        this.update.is_valid = this.update.is_valid == '1' ? true : false;
    }

 
    hideUpdate():any{
        this.setInit();
        this.isUpdate = false;
    }
    updateSubmit():any{
        this.update.last_update_by = '1';
        if(this.check(this.update)) {
            this.ruleService.updateRule(this.update).then(result=>{
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
            this.ruleService.addRule(this.add).then(result=>{
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
        if(this.verify.empty(params.rule_code)) {
            this.message.create('warning', '规则编码不能为空');
            return;
        } else if(params.rule_type==null) {
            this.message.create('warning', '规则类型不能为空');
            return;
        }  else if( this.verify.empty(params.rule_name)) {
            this.message.create('warning', '规则名称不能为空');
            return;
        } else if(params.priority==null) {
            this.message.create('warning', '优先级不能为空');
            return;
        }
       
        return true;
    }


    delete(id:any) {
        this.modalService.confirm({
            nzTitle  : '<i>您想要删除这些条信息吗?</i>',
            nzOnOk   : () => {
                this.ruleService.deleteRule(id, '1').then(result=>{
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
        this.ruleService.getRuleList(this.pageIndex, this.pageSize, this.search).then(result=>{
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
        this.ruleService.getUnitList().then(result=>{
            this.listUnitOption = result.list; 
        })
    }

}