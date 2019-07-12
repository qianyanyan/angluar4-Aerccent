import { Component, OnInit, OnDestroy,DoCheck } from '@angular/core';
import { Format } from '../../core/common/format.service';
import { NzFormatEmitEvent, NzMessageService, UploadFile, NzModalService } from 'ng-zorro-antd';
import { Verify } from '../../core/common/verify.service';
import { OrderTypeService } from './orderType.service';
import {  EXPORT_UNIT} from '../../app.constants';
import { 
    FormControl
  } from '@angular/forms'; 
@Component({
    selector:'orderType-index',
    templateUrl:'./orderType.component.html',
    styleUrls:['./orderType.component.less'],
    providers: [OrderTypeService]
})

export class OrderTypeComponent implements OnInit, OnDestroy {
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
            fieldMame: 'a.shop_order_code',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and',
           
        },
        search2 :{
            fieldMame: 'a.shop_order_code',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and'
        },
        search3 :{
            fieldMame: 'a.shop_order_code',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and'
        },
        search4 :{
            fieldMame: 'a.shop_order_code',
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
        private OrderTypeService:OrderTypeService,
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
                value: 'a.shop_order_code'
            },
            {
                label: 'ERP订单类型',
                value: 'a.erp_order_type'
            },
            {
                label: '描述',
                value: 'a.description'
            },
            {
                label: '是否由SCADA创建',
                value: 'a.create_order_by_scada'
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
                label: '是',
                value: '1'
            },
            {
                label: '否',
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
        this.OrderTypeService.handleUpload(formData).then(result=>{
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
                fieldMame: 'a.shop_order_code',
                fieldConditions: '1',
                fieldValue: '' ,
                fieldType:'and'
            },
            search2 :{
                fieldMame: 'a.shop_order_code',
                fieldConditions: '1',
                fieldValue: '' ,
                fieldType:'and'
            },
            search3 :{
                fieldMame: 'a.shop_order_code',
                fieldConditions: '1',
                fieldValue: '' ,
                fieldType:'and'
            },
            search4 :{
                fieldMame: 'a.shop_order_code',
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
            shop_order_code:'',
            description:'',
            create_order_by_scada: true,
            last_update_by:'1'
        }
        this.update = {
            id:'',
            shop_order_code:'',
            description:'',
            create_order_by_scada: true,
            last_update_by:'1'
        }
        this.indeterminate = false;
        this.upData = [];
        this.checkList =[]
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
        this.update = this.format.extend(true, {},this.upData);
        this.update.create_order_by_scada = this.update.create_order_by_scada == '1' ? true : false;
    }
 
    hideUpdate():any{
        this.setInit();
        this.isUpdate = false;
    }
    updateSubmit():any{
        this.update.last_update_by = '1';
        if(this.check(this.update)) {
            this.OrderTypeService.updateOrderType(this.update).then(result=>{
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
            this.OrderTypeService.addOrderType(this.add).then(result=>{
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
        if(this.verify.empty(params.shop_order_code)) {
            this.message.create('warning', '编码不能为空');
            return;
        }
        else if(this.verify.empty(params.erp_order_type)) {
            this.message.create('warning', 'ERP订单类型不能为空');
            return;
        } else if(this.verify.empty(params.description)) {
            this.message.create('warning', '订单类型描述不能为空');
            return;
        }
        return true;
    }
    getList():void {
        this.loading = true;
        this.OrderTypeService.getOrderTypeList(this.search,this.field).then((result: any) => {
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
                this.OrderTypeService.deleteOrderType(this.checkList, '1').then(result=>{
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
                this.checkList.push(data.id);
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
                this.checkList.push(data.id);
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
   
}