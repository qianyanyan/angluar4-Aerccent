import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { Format } from '../../core/common/format.service';
import {NzMessageService, NzModalService, UploadFile} from 'ng-zorro-antd';
import { Verify } from '../../core/common/verify.service';
import { EqtService } from './eqt.service';
import { Observable, Observer } from 'rxjs';
import {FILE_UPDATE_RULE,FILE_DOWNLOAD_RULE,EXPORT_RULE_INST} from '../../app.constants';
@Component({
    selector:'rule-inst',
    templateUrl:'./rule-inst.component.html',
    styleUrls:['./eqt-tab.component.less'],
    providers: [EqtService] 
})

export class RuleInstComponent implements OnInit, OnDestroy {
    @Input() id: any;
    @Input() category_type:any;
    height:any;
    dataSet:any;
    isAdd = false;
    isUpdate = false;
    isAddRule = false;
    isAddMatl = false;
    add :any;
    update:any;
    loading = true;
    pageIndex = 1;
    pageSize = 10;
    total = 1;
    listUnitPtion = [];
    listRuleTypeOption = [];
    listPriorityOption = [];
    listLangOption = [];
    listmethodOption=[];
    nzAction = FILE_UPDATE_RULE;
    avatarUrl:string;
    isShowImg = false;
     uploading = false;
    fileList: UploadFile[] = [];
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
        rule_name: '',
        rule_type:null,
        priority:null,
        matl_name:'',
        rule_inst_name:'',
        para_acq_method:''
    }
    nzMaskClosable:false;
    constructor( 
        private format: Format,    
        private message: NzMessageService,
        private verify:Verify,
        private eqtService:EqtService,
        private modalService: NzModalService){

            this.export = EXPORT_RULE_INST;
     
        
        this.setInit();
        this.listLangOption = [{
            label:'中文',
            value:'2'
        }]

        this.listPriorityOption = [{
            value: 'H',
            label: 'H'
            }, {
                value: 'M',
            label: 'M'
            }, {
                value: 'L',
                label: 'L'
            }
        ]
        this.listRuleTypeOption = [
            {
                label: '报警',
                value: '1'
            },
            {
                label: '指标',
                value: '2'
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
            rule_name: '',
            rule_type:null,
            priority:null,
            matl_name: '',
            rule_inst_name: '',
            para_acq_method:''
        }
        this.getList(true);
    }
    
    beforeUploadFile = (file: UploadFile): boolean => {
        this.fileList = [file];
        return false;
    }

    handleUploadFile(): void {
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
        this.eqtService.ruleInstUpload(formData).then(result=>{
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
            rule_inst_code:'',
            rule_inst_name:'',
            para_acq_method:'',
            rule_id: null,
            rule_name:'',
            rule_type: null,
            matl_id: null,
            matl_name:'',
            formula:'',
            standard_value:'',
            output_parameter:'',
            image_url:'',
            avatarUrl:'',
            eqt_id:this.id,
            priority:null,
            unit_id:null,
            category:this.category_type,
            is_valid:true,
            remark:'',
            customized_type:'',
            last_update_by:'1'
        }
        this.update = {
            id:'',
            rule_inst_code:'',
            rule_inst_name:'',
            para_acq_method:'',
            rule_id: null,
            rule_name:'',
            rule_type: null,
            matl_id: null,
            matl_name:'',
            formula:'',
            priority: null,
            unit_id: null,
            standard_value:'',
            output_parameter:'',
            image_url:'',
            avatarUrl:'',
            is_valid:true,
            eqt_id:this.id,
            category: this.category_type,
            customized_type:'',
            remark:'',
            last_update_by:'1'
        }
    }

    showUpdate(data:any): void {
        this.isUpdate = true;
        this.update = this.format.extend(true, {}, data);
        this.update.eqt_id =this.id;
        data.image_url &&   (this.update.avatarUrl = FILE_DOWNLOAD_RULE+"&fileName="+data.image_url);

        this.update.is_valid = this.update.is_valid =='1' ? true : false;
        if(this.update.unit_id) {
            this.update.unit_id = this.update.unit_id.toString();
        }
    }

 
    hideUpdate():any{
        this.setInit();
        this.isUpdate = false;
    }
    updateSubmit():any{
        if(this.check(this.update)) {
            this.eqtService.updateRuleInst(this.update).then(result=>{
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

    getRuleInstPropValue(formula:string): any {
        if (!this.verify.empty(formula)) {
            this.eqtService.getRuleInstPropValue({
                formula: formula,
                eqt_id: this.id,
            }).then((result: any) => {
                if(result.code==1) {
                    this.add.formula = result.data.formula;
                    this.update.formula = result.data.formula;
                } else {
                    this.message.create('error','无效的逻辑');
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
            this.eqtService.addRuleInst(this.add).then(result=>{
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
        if(this.verify.empty(params.rule_inst_code)) {
            this.message.create('warning', '属性实例编码不能为空');
            return;
        } else if( this.verify.empty(params.rule_inst_name)) {
            this.message.create('warning', '属性实例名称不能为空');
            return;
        }  else if( this.verify.empty(params.rule_type)) {
            this.message.create('warning', '规则类型不能为空');
            return;
        } else if (this.verify.empty(params.priority)) {
            this.message.create('warning', '规则优先级不能为空');
            return;
        } else if (this.verify.empty(params.formula)) {
            this.message.create('warning', '规则逻辑');
            return;
        }  
         
        if (this.verify.empty(params.matl_name)) {
           params.matl_id = 0;
            
        }
             
        return true;
    }


    delete(id: any, rule_inst_code:any) {
        this.modalService.confirm({
            nzTitle  : '<i>您想要删除这些条信息吗?</i>',
            nzOnOk   : () => {
                //先判断是否有子菜单，如果有子菜单禁止删除
                this.eqtService.deleteRuleInst(id, rule_inst_code).then(result=>{
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
        this.eqtService.getRuleInstList(this.id, this.pageIndex, this.pageSize, this.search).then(result=>{
            if(result.code == 1) {
                this.dataSet = result.list;
                this.total = result.count;
            }
            this.loading = false;
        }, err=>{
            this.loading = false;
        })
    }
    
    showAddRuleModule() {
        this.isAddRule =true;
    }

    hideAddRuleModule() {
        this.isAddRule =false;
    }

    ruleChange(data:any) {
        if(data.rule_id) {
            this.add.rule_id = data.rule_id;
            this.add.rule_name =  data.rule_name;
            this.add.formula =  data.formula;
            this.update.rule_id = data.rule_id;
            this.update.rule_name =  data.rule_name;
            this.update.formula =  data.formula;
            if(data.rule_type) {
                this.add.rule_type = data.rule_type;
                this.update.rule_type = data.rule_type;
            }
           
            if(data.priority) {
                this.add.priority = data.priority;
                this.update.priority = data.priority;
            }
            if(data.unit_id) {
                this.add.unit_id = data.unit_id;
                this.update.unit_id = data.unit_id;
            }
            this.getRuleInstPropValue(data.formula);
            this.isAddRule =false;
        }
    }

    showAddMatlModule() {
        this.isAddMatl = true;
    }

    hideAddMatlModule() {
        this.isAddMatl = false;
    }

    matlChange(data:any) {
        if(data.matl_id) {
            this.add.matl_id = data.matl_id
            this.add.matl_name =  data.matl_name
            this.update.matl_id = data.matl_id
            this.update.matl_name =  data.matl_name
            this.isAddMatl =false;
        }
    }

    getUnitList() {
        this.eqtService.getUnitList().then(result=>{
            if(result.code == 1) {
                this.listUnitPtion = result.list;
            }
        })
      
    }

    beforeUpload = (file: File) => {
        return new Observable((observer: Observer<boolean>) => {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 20;
          if (!isLt2M) {
            this.message.error('Image must smaller than 20MB!');
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
    
      
      handleChange(info: { file: UploadFile,fileList:any }): void {
        if (info.file.status === 'uploading') {
          this.loading = true;
          return;
        }
        if (info.file.status === 'done') {
         
            this.add.image_url = info.fileList[0].response.attList[0].newFileName;
            this.update.image_url = info.fileList[0].response.attList[0].newFileName;
            console.log(this.update.image_url)
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, (img: string) => {
            this.loading = false;
            this.add.avatarUrl = img;
            this.update.avatarUrl = img;
          });
        }
      }

    showImg(img) {
        this.avatarUrl =  FILE_DOWNLOAD_RULE+"&fileName="+img;
        this.isShowImg = true;
    }
    removeImg() {
        this.update.image_url = '';
        this.add.image_url = '';
        this.add.avatarUrl = '';
        this.update.avatarUrl = '';
    }
}