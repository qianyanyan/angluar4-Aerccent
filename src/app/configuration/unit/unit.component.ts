import { Component, OnInit, OnDestroy,DoCheck } from '@angular/core';
import { Format } from '../../core/common/format.service';
import { NzFormatEmitEvent, NzMessageService, UploadFile, NzModalService } from 'ng-zorro-antd';
import { Verify } from '../../core/common/verify.service';
import { UnitService } from './unit.service';
import {  EXPORT_UNIT} from '../../app.constants';
import { 
    FormControl
  } from '@angular/forms'; 
@Component({
    selector:'unit-index',
    templateUrl:'./unit.component.html',
    styleUrls:['./unit.component.less'],
    providers: [UnitService]
})

export class UnitComponent implements OnInit, OnDestroy {
    height:any;
    //排序和搜素  start
    allChecked = false;
    checkList = [];
    upData=[];
    indeterminate = false;
    mapOfCheckedId: { [key: string]: boolean } = {};
    sortName: string | null = null;
    sortValue: string | null = null;
    isCollapsed = false;
     //排序和搜素  end
    data:any;
    isAdd = false;
    isUpdate = false;
    add :any;
    update:any;
    isImport = false;
    loading = true;
    import = {
        is_empty:false,
        is_no_lang:false,
        is_all:true,
        is_lang:false,
        lang_id:null
    }
    uploading = false;
    fileList: UploadFile[] = [];
    listLangOption =[];
    export :string;

    listOfData={
        search :{
            fieldMame: 'u.unit_code',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and',
           
        },
        search2 :{
            fieldMame: 'u.unit_code',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and'
        },
        search3 :{
            fieldMame: 'u.unit_code',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and'
        },
        search4 : {
            fieldMame: 'u.unit_code',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and'
        },
        search5 : {
            fieldMame: 'u.unit_code',
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
        private unitService:UnitService,
        private modalService: NzModalService){
        this.export = EXPORT_UNIT;
        this.setInit();
        this.listLangOption = [{
            label:'中文',
            value:'2'
        }]
        this.listTypeOption = [
            {
                label: '编码',
                value: 'u.unit_code'
            },
            {
                label: '单位缩写',
                value: 'u.unit_short_name'
            },
            {
                label: '单位名称',
                value: 'ud.unit_name'
            },
            {
                label: '符号',
                value: 'u.unit_symbol'
            },
            {
                label: '状态',
                value: 'u.is_valid'
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
        this.unitService.handleUpload(formData).then(result=>{
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

    searchSubmit(): void {
        let listOfData:any;
        this.search = []
        for(let key  in this.listOfData){
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
                fieldMame: 'u.unit_code',
                fieldConditions: '1',
                fieldValue: '' ,
                fieldType:'and'
            },
            search2 :{
                fieldMame: 'u.unit_code',
                fieldConditions: '1',
                fieldValue: '' ,
                fieldType:'and'
            },
            search3 :{
                fieldMame: 'u.unit_code',
                fieldConditions: '1',
                fieldValue: '' ,
                fieldType:'and'
            },
            search4 : {
                fieldMame: 'u.unit_code',
                fieldConditions: '1',
                fieldValue: '' ,
                fieldType:'and'
            },
            search5 : {
                fieldMame: 'u.unit_code',
                fieldConditions: '1',
                fieldValue: '' ,
                fieldType:'and'
            }
        }
        this.search = []
        this.getList();
    }
    setInit() {
        this.add = {
            unit_code:'',
            unit_symbol:'',
            unit_short_name:'',
            unit_name:'',
            remark:'',
            is_valid: true,
            last_update_by:'1'
        }
        this.update = {
            id:'',
            unit_code:'',
            unit_symbol:'',
            unit_short_name:'',
            unit_name:'',
            remark:'',
            is_valid: true,
            last_update_by:'1'
        }
    }

    // showUpdate(data:any): void {
    //     this.isUpdate = true;
    //     this.update = this.format.extend(true, {}, data);
    //     this.update.is_valid = this.update.is_valid == '1' ? true : false;
    // }
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
        this.update = this.format.extend(true, {},this.upData);
        this.update.is_valid = this.update.is_valid == '1' ? true : false;
    }
 
    hideUpdate():any{
        this.setInit();
        this.isUpdate = false;
    }
    updateSubmit():any{
        this.update.last_update_by = '1';
        if(this.check(this.update)) {
            this.unitService.updateUnit(this.update).then(result=>{
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
            this.unitService.addUnit(this.add).then(result=>{
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
        if(this.verify.empty(params.unit_code)) {
            this.message.create('warning', '单位编号不能为空');
            return;
        } else if(this.verify.empty(params.unit_symbol)) {
            this.message.create('warning', '符号不能为空');
            return;
        } else if( this.verify.empty(params.unit_short_name)) {
            this.message.create('warning', '单位缩写不能为空');
            return;
        }  else if( this.verify.empty(params.unit_name)) {
            this.message.create('warning', '单位名称不能为空');
            return;
        } 

        //监测符号
        let isSymbol = false;
        this.data.forEach(item => {
            if (item.unit_symbol && item.unit_symbol.toLowerCase() == params.unit_symbol.toLowerCase()) {
                if (item.unit_id != params.unit_id) {
                    isSymbol = true;
                }
            }
        });
        if (isSymbol) {
            this.message.create('warning', '符号已经存在');
            return;
        }

        return true;
    }
   
    // delete(id:any) {
    //     this.modalService.confirm({
    //         nzTitle  : '<i>您想要删除这些条信息吗?</i>',
    //         nzOnOk   : () => {
    //             //先判断是否有子菜单，如果有子菜单禁止删除
    //             this.unitService.deleteUnit(id, '1').then(result=>{
    //                 if(result.code == 1) {
    //                     this.message.create('success', '删除成功');
    //                     this.getList();
    //                     this.setInit();
    //                 } else {
    //                     this.message.create('error', result.msg); 
    //                 }
    //             })
    //         }
    //     });
    // }
    getList():void {
        this.loading = true;
        this.unitService.getUnitList(this.search,this.field).then((result: any) => {
            if(result.code==1) {
                this.data = result.list;
            } 
            this.loading = false;
        }, err=>{
            this.loading = false;
        })
    }
    //排序和搜素 checkbox
     checkDelete() {
        if(this.checkList.length<1){
            this.message.create('error', '请先选择数据再进行删除'); 
            return
        }
        this.modalService.confirm({
            nzTitle  : '<i>您想要删除这些条信息吗?</i>',
            nzOnOk   : () => {
                //先判断是否有子菜单，如果有子菜单禁止删除
                this.unitService.deleteUnit(this.checkList, '1').then(result=>{
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
    toggleCollapsed(): void {
        this.isCollapsed = !this.isCollapsed;
      }
    checkAll(value: boolean): void {
        this.data.forEach(data => {
            data.checked = value;
            if(data.checked==true){
                this.checkList.push(data.unit_id);
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
                this.checkList.push(data.unit_id);
            }
        });
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