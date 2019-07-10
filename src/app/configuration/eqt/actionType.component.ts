import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { Format } from '../../core/common/format.service';
import {NzMessageService, NzModalService, UploadFile} from 'ng-zorro-antd';
import { Verify } from '../../core/common/verify.service';
import { EqtService } from './eqt.service';
import { Observable, Observer } from 'rxjs';
import { LocalStorage } from '../../core/common/local.storage';
import {FILE_UPDATE_RULE,FILE_DOWNLOAD_RULE,EXPORT_RULE_INST} from '../../app.constants';
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Component({
    selector:'actionType',
    templateUrl:'./actionType.component.html',
    styleUrls:['./eqt-tab.component.less'],
    providers: [EqtService] 
})

export class actionTypeComponent implements OnInit, OnDestroy {
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
    pageIndex = '1';
    pageSize = '10';
    rule_inst_id:string;
    total = '1';
    rule_inst_name:string;
    listUnitPtion = [];
    listRuleTypeOption = [];
    listPriorityOption = [];
    eqt_name:any;
    add_eqt_name:string;
    listLangOption = [];
    nzAction = FILE_UPDATE_RULE;
    avatarUrl:string;
    isShowImg = false;
     uploading = false;
    fileList: UploadFile[] = [];
    rul_inst:string;
    export :string;
    seachs:string;
    isImport = false;
    customized_type;
    import = {
        // is_empty:false,
        // is_no_lang:false,
        // is_all:true,
        // is_lang:false,
        // lang_id:null
    }
    // search = {
    //     rule_name: '',
    //     rule_type:null,
    //     priority:null,
    //     matl_name:'',
    //     rule_inst_name:''
    // }

    constructor( 
        private format: Format,    
        private message: NzMessageService,
        private verify:Verify,
        private eqtService:EqtService,
        private modalService: NzModalService,
        private store:LocalStorage){

            this.export = EXPORT_RULE_INST;
     
        
        this.setInit();
        this.listLangOption = [{
            label:'中文',
            value:'2'
        }]

        // this.listPriorityOption = [{
        //     value: 'H',
        //     label: 'H'
        //     }, {
        //         value: 'M',
        //     label: 'M'
        //     }, {
        //         value: 'L',
        //         label: 'L'
        //     }
        // ]
        this.listRuleTypeOption = [
            {
                label: '报警',
                value: '1'
            },
            {
                label: '监控',
                value: '2'
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

        let id = this.store.get('eqtTabitem');
        this.pageIndex = '1';
        this.loading = true;
        this.eqtService.getActionList(this.pageIndex,this.pageSize,this.seachs,this.rule_inst_id,id.id).then(result=>{
            if(result.code == 1) {
                this.eqt_name = result.list;
                this.dataSet = result.list;
                this.total = result.list.length;
            }
            this.loading = false;
        }, err=>{
            this.loading = false;
        })

    }

    resetForm(): void {
        this.seachs = '';
        // this.search = {
        //     rule_name: '',
        //     rule_type:null,
        //     priority:null,
        //     matl_name: '',
        //     rule_inst_name: ''
        // }
        this.getList(true);
    }
    
    outputList(): void{
        window.location.href="http://172.31.193.128:2809/action/export";
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
        // if(this.import.is_lang==false) {
            // if(this.import.is_all==false) {
            //     this.message.success('请选择导入全部数据');
            //     return;
            // }
        // } else {
            // if(this.import.lang_id==false) {
            //     this.message.success('请选择语言');
            //     return;
            // }
        // }
        // formData.append('is_empty', this.import.is_empty ? '1' : '0');
        // formData.append('is_no_lang', this.import.is_no_lang ? '1' : '0');
        // formData.append('is_all', this.import.is_all ? '1' : '0');
        // formData.append('is_lang', this.import.is_lang ? '1' : '0');
        // formData.append('eqt_id', this.id);
        
        // this.uploading = true;
        // this.eqtService.ruleInstUpload(formData).then(result=>{
        //     console.log(1);
        //     this.uploading = false;
        //     if(result.code == 1) {
        //         this.isImport = false;
        //         this.fileList = [];
        //         this.getList();
        //         this.message.success('上传成功');
        //     } else {
        //         this.message.error(result.msg); 
        //     }
        // },err=>{
        //     this.uploading = false;
        //     console.log(2);
        //     // this.message.error('上传失败');
        // })
    }
    // changeLang(is:boolean) {
    //     setTimeout(()=>{
    //         if(is) {
    //             // if( this.import.is_lang) {
    //                 // this.import.is_all = false;
    //                 // this.import.is_no_lang = false;
    //             // } else {
    //                 // this.import.is_all = true;
    //             // }
    //         } else {
    //             // this.import.is_lang = false;
    //         }
    //     },100);
    // }

   

    setInit() {
        this.add = {
            rule_inst_code:'',
            rule_inst_name:'',
            rule_id:'',
            rule_name:'',
            rule_type:'',
            matl_id:'',
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
            add_eqt_name:"",
            customized_type:'',
            last_update_by:'1'
        }
        this.update = {
            id:'',
            rule_inst_code:'',
            rule_inst_name:'',
            rule_id:'',
            rule_name:'',
            rule_type:'',
            matl_id:'',
            matl_name:'',
            formula:'',
            priority: null,
            unit_id: null,
            standard_value:'',
            output_parameter:'',
            image_url:'',
            avatarUrl:'',
            rule_inst_id:'',
            action_name:'',
            is_valid:true,
            eqt_id:this.id,
            eqt_name:'',
            category: this.category_type,
            customized_type:'',
            remark:'',
            last_update_by:'1'
        }
    }

    showUpdate(data:any): void {
        this.update.eqt_name = data.eqt_name;
        this.update.id = data.id;
        this.update.action_name = data.action_name;
        this.update.rule_inst_id = data.rule_inst_id;
        this.update.rule_inst_name = data.rule_inst_name;
        this.update.customized_type = data.action_detail;
        this.isUpdate = true;
        if(data.is_valid == 1){
            this.update.is_valid = true;
        }else{
            this.update.is_valid = false;
        }
    }

 
    hideUpdate():any{
        this.setInit();
        this.isUpdate = false;
    }
    updateSubmit():any{
        this.update.last_update_by = '1';
       this.update.is_valid = this.update.is_valid==true ?  '1':'0';
            this.eqtService.updataActionList(this.update.rule_inst_id,this.update.eqt_id,this.update.action_name,
                this.update.last_update_by,this.update.customized_type,this.update.category,
                this.update.remark,this.update.is_valid,this.update.id,).then(result=>{

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

    showAdd(): void {
        this.add.add_eqt_name =this.store.get('eqt_name');
        let id = this.store.get('eqtTabitem');
        console.log(id);
        if(id.id) {
            this.eqtService.getActionRuleInst(id.id).then(result=>{
                if(result.code == 1) {
                    console.log(result);
                     this.isAdd = true;
                     this.listPriorityOption = result.list;
                } else {
                    this.message.create('error', result.msg); 
                }
            })
        }
    }

    hideAdd() {
        this.setInit();
        this.isAdd = false;
    }

    addSubmit(): void {
        let id = this.store.get('eqtTabitem');
        this.add.is_valid = this.add.is_valid==true ?  '1':'0';
         this.eqtService.addActionRuleInst(
            this.add.priority,
            this.add.eqt_id,
            this.add.action_name,
            this.add.last_update_by,
            this.add.output_parameter,
            this.add.category,
            this.add.remark,
            this.add.is_valid).then(result=>{
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

    check(params:any) {
        if(this.verify.empty(params.rule_inst_code)) {
            this.message.create('warning', '属性实例编码不能为空');
            return;
        } else if( this.verify.empty(params.rule_inst_name)) {
            this.message.create('warning', '属性实例名称不能为空');
            return;
        }  else if( this.verify.empty(params.rule_type)) {
            this.message.create('warning', '计算规则名称不能为空');
            return;
        }  
        return true;
    }


    delete(id) {
        this.modalService.confirm({
            nzTitle  : '<i>您想要删除这些条信息吗?</i>',
            nzOnOk   : () => {
                //先判断是否有子菜单，如果有子菜单禁止删除
                this.eqtService.deleteActionList(id).then(result=>{
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
       let id = this.store.get('eqtTabitem');
        if (reset) {
            this.pageIndex = '1';
        }
        this.loading = true;
        console.log(this.pageIndex,this.pageSize,this.rule_inst_name,this.rule_inst_id,id.id);
        this.eqtService.getActionList(this.pageIndex,this.pageSize,this.rule_inst_name,this.rule_inst_id,id.id).then(result=>{
            if(result.code == 1) {
                console.log(result);
                this.eqt_name = result.list;
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
            this.add.rule_type =  data.rule_type;
            this.add.rule_name =  data.rule_name;
            this.add.formula =  data.formula;
            this.update.rule_id = data.rule_id;
            this.update.rule_name =  data.rule_name;
            this.update.rule_type =  data.rule_type;
            this.update.formula =  data.formula;

           
            if(data.priority) {
                this.add.priority = data.priority;
                this.update.priority = data.priority;
            }
            if(data.unit_id) {
                this.add.unit_id = data.unit_id;
                this.update.unit_id = data.unit_id;
            }
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
}