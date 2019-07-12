import { Component, OnInit, OnDestroy } from '@angular/core';
import { Format } from '../../core/common/format.service';
import {NzMessageService, NzModalService,UploadFile } from 'ng-zorro-antd';
import { Verify } from '../../core/common/verify.service';
import { EqtTypeService } from './eqt-type.service';
import {  EXPORT_EQT_TYPE} from '../../app.constants';
 
@Component({
    selector:'eqt-type-index',
    templateUrl:'./eqt-type.component.html',
    styleUrls:['./eqt-type.component.less'],
    providers: [EqtTypeService]
})

export class EqtTypeComponent implements OnInit, OnDestroy {
    allChecked = false;
    displayData = [];
    checkList = [];
    upData=[];
    indeterminate = false;
    mapOfCheckedId: { [key: string]: boolean } = {};
      sortName: string | null = null;
    sortValue: string | null = null;
    isCollapsed = false;
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
    listOfData={
        search :{
            fieldMame: 'et.eqt_type_code',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and'
        },
        search2 :{
            fieldMame: 'et.eqt_type_code',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and'
        },
        search3 :{
            fieldMame: 'et.eqt_type_code',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and'
        },
        search4 : {
            fieldMame: 'et.eqt_type_code',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and'
        }
    }
    search = [];
    listTypeOption = [];
    TypeOption = [];
    validOption = [];
    statusOption = [];
    field:any;
    constructor( 
        private format: Format,    
        private message: NzMessageService,
        private verify:Verify,
        private eqtTypeService:EqtTypeService,
        private modalService: NzModalService){
        this.export = EXPORT_EQT_TYPE;
        this.setInit();
        this.listLangOption = [{
            label:'中文',
            value:'2'
        }]
        this.listTypeOption = [
            {
                label: '编码',
                value: 'et.eqt_type_code'
            },
            {
                label: '组织架构类型缩写',
                value: 'et.short_name'
            },
            {
                label: '组织架构类型名称',
                value: 'etd.org_type_name'
            },
            {
                label: '状态',
                value: 'et.is_valid'
            }
        ]
        this.TypeOption = [
            {
                label: '包含',
                value: '1'
            },
            {
                label: '等于',
                value: '2'
            },
        ]
        this.validOption = [
            {
                label: '激活',
                value: '1'
            },
            {
                label: '关闭',
                value: '0'
            },
        ]
        this.statusOption =[
            {
                label: '并且',
                value: 'and'
            },
            {
                label: '或者',
                value: 'or'
            },
        ]
        this.field = {
            fieldSort:'',
            fieldOrderBy:''
        }
        
    }

    ngOnInit(): void {
        this.getList();
    }

    ngOnDestroy(): void {

    }

    setInit() {
        this.add = {
            eqt_type_code: '',
            short_name: '',
            eqt_type_name: '',
            remark: '',
            is_valid:true 
        }
        this.update = {
            id: '',
            eqt_type_code: '',
            short_name: '',
            eqt_type_name: '',
            remark: '',
            is_valid: true
        }
        this.indeterminate = false;
        this.upData = [];
        this.checkList =[]
    }

    searchSubmit(): void {
        let listOfData:any;
        this.search = []
        for(let key  in this.listOfData){
            // console.log(key + '---' + (JSON.stringify(this.listOfData[key])));
              listOfData =this.listOfData[key]
              if(listOfData.fieldValue !=''){
                this.search.push(listOfData)
              }
              
      }
        this.getList();
    }

    resetForm(): void {
        this.listOfData={
            search :{
                fieldMame: 'et.eqt_type_code',
                fieldConditions: '1',
                fieldValue: '' ,
                fieldType:'and'
            },
            search2 :{
                fieldMame: 'et.eqt_type_code',
                fieldConditions: '1',
                fieldValue: '' ,
                fieldType:'and'
            },
            search3 :{
                fieldMame: 'et.eqt_type_code',
                fieldConditions: '1',
                fieldValue: '' ,
                fieldType:'and'
            },
            search4 : {
                fieldMame: 'et.eqt_type_code',
                fieldConditions: '1',
                fieldValue: '' ,
                fieldType:'and'
            }
        }
        this.search = []
        this.getList();
    }
    checkAll(value: boolean): void {
        this.data.forEach(data => {
            data.checked = value;
            if(data.checked==true){
                this.checkList.push(data.eqt_type_id);
            }
        });
    }

    refreshStatus() {
        const allChecked = this.data.every(value => value.checked === true);
        const allUnChecked = this.data.every(value => !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
        this.checkList = [];
        this.data.forEach(data => {
            if(data.checked==true){
                this.checkList.push(data.eqt_type_id);
            }
        });
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
        this.eqtTypeService.handleUpload(formData).then(result=>{
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
    
    showUpdate(): void {
        if(this.checkList.length <1){
            this.message.create('error', '请先选择数据再进行修改'); 
            return
        }else if(this.checkList.length !=1){
            this.message.create('error', '请逐条进行修改'); 
            return
        }
        this.data.forEach(data => {
            if(data.checked==true){
                this.upData= data;
            }
        });
        this.isUpdate = true;
        this.update = this.format.extend(true, {}, this.upData);
        this.update.is_valid = this.update.is_valid == '1' ? true : false;
    }

    hideUpdate():any{
        this.setInit();
        this.isUpdate = false;
    }

    updateSubmit():any{
        this.update.last_update_by = '1';
        if(this.check(this.update)) {
            this.modalService.confirm({
                nzTitle  : '<i>您确定要修改这些条信息吗?</i>',
                nzOnOk   : () => {
                        this.eqtTypeService.updateEqtType(this.update).then(result=>{
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
            
            });
        }
    }

    showAdd(): void {
        this.isAdd = true;
    }

    hideAdd() {
        this.setInit();
        this.isAdd = false;
    }
    
    toggleCollapsed(): void {
        this.isCollapsed = !this.isCollapsed;
      }
    addSubmit(): void {
        if(this.check(this.add)) {
            this.modalService.confirm({
                nzTitle  : '<i>您确定要新增这些条信息吗?</i>',
                nzOnOk   : () => {
                        this.eqtTypeService.addEqtType(this.add).then(result=>{
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
            
            });
        }
    }

    check(params:any) {
        if(this.verify.empty(params.short_name)) {
            this.message.create('warning', '组织架构类型缩写不能为空');
            return;
        } else if( this.verify.empty(params.eqt_type_name)) {
            this.message.create('warning', '组织架构类型名称不能为空');
            return;
        }  
        return true;
    }
   
    delete(id:any) {
        this.modalService.confirm({
            nzTitle  : '<i>您想要删除这些条信息吗?</i>',
            nzOnOk   : () => {
                //先判断是否有子菜单，如果有子菜单禁止删除
                this.eqtTypeService.deleteEqtType(id, '1').then(result=>{
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
    checkDelete() {
        if(this.checkList.length<1){
            this.message.create('error', '请先选择数据再进行删除'); 
            return
        }
        this.modalService.confirm({
            nzTitle  : '<i>您想要删除这些条信息吗?</i>',
            nzOnOk   : () => {
              
                //先判断是否有子菜单，如果有子菜单禁止删除
                this.eqtTypeService.deleteEqtType(this.checkList, '1').then(result=>{
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
        this.eqtTypeService.getEqtTypeList(this.search,this.field).then((result: any) => {
            if(result.code==1) {
                this.data = result.list;
            } 
            this.loading = false;
        }, err=>{
            this.loading = false;
        })
    }
    sort(sort: { key: string; value: string }): void {
        this.sortName = sort.key;
        this.sortValue = sort.value;
        if (this.sortName && this.sortValue) {
            if(this.sortValue.indexOf('desc')>-1){
                this.field = {
                    fieldSort:'desc',
                    fieldOrderBy:this.sortName
                }
            }else if(this.sortValue.indexOf('asc')>-1){
                this.field = {
                    fieldSort:'asc',
                    fieldOrderBy:this.sortName
                }
            }
            this.getList()
        }
        // this.searchdata();
      }
    // searchdata(): void {
    //      const data = this.data
    //     /** sort data **/
    //     if (this.sortName && this.sortValue) {
    //         this.data = data.sort((a, b) =>
    //         this.sortValue === 'ascend'
    //           ? a[this.sortName!] > b[this.sortName!]
    //             ? 1
    //             : -1
    //           : b[this.sortName!] > a[this.sortName!]
    //           ? 1
    //           : -1
    //       );
    //     } else {
    //         this.data = data;
    //     }
    //   }


}