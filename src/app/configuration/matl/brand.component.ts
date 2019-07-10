import { Component, OnInit, OnDestroy } from '@angular/core';
import { Format } from '../../core/common/format.service';
import {NzMessageService, NzModalService,UploadFile } from 'ng-zorro-antd';
import { Verify } from '../../core/common/verify.service';
import { MatlService } from './matl.service';
import {  EXPORT_BRAND} from '../../app.constants';
 
@Component({
    selector:'brand-index',
    templateUrl:'./brand.component.html',
    styleUrls:['./matl-tab.component.less'],
    providers: [MatlService]
})

export class BrandComponent implements OnInit, OnDestroy {
    height:any;
    dataSet:any;
    isAdd = false;
    isUpdate = false;
    isAddBrand = false;
    add :any;
      //排序和搜素  start
      allChecked = false;
      checkList = [];
      upData=[];
      indeterminate = false;
      mapOfCheckedId: { [key: string]: boolean } = {};
      sortName: string | null = null;
      sortValue: string | null = null;
      isCollapsed = false;
      data:any;
       //排序和搜素  end
    update:any;
    loading = true;
    pageIndex = 1;
    pageSize = 10;
    total = 1;
    listBrandOption =[]
    search:any;
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
            fieldMame: 'b.brand_code',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and'
        },
        search2 :{
            fieldMame: 'b.brand_code',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and'
        },
        search3 :{
            fieldMame: 'b.brand_code',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and'
        },
        search4 : {
            fieldMame: 'b.brand_code',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and'
        }
    }
    // search = [];
    listTypeOption = [];
    TypeOption = [];
    validOption = [];
    statusOption = [];
    field:any;
    constructor( 
        private format: Format,    
        private message: NzMessageService,
        private verify:Verify,
        private matlService:MatlService,
        private modalService: NzModalService){
            this.export = EXPORT_BRAND;
            this.setInit();
            this.listLangOption = [{
                label:'中文',
                value:'2'
            }]
            this.listTypeOption = [
                {
                    label: '品牌编码',
                    value: 'b.brand_code'
                },
                {
                    label: '品牌缩写',
                    value: 'b.brand_short_name'
                },
                {
                    label: '品牌名称',
                    value: 'bd.brand_name'
                },
                {
                    label: '激活',
                    value: 'b.is_valid'
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
        this.matlService.brandUpload(formData).then(result=>{
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
    }

    ngOnDestroy(): void {

    }

    setInit() {
        this.add = {
            brand_code:'',
            brand_name:'',
            brand_short_name:'',
            remark:'',
            last_update_by:'1',
            is_valid:true
        }
        this.update = {
            brand_id:'',
            brand_code:'',
            brand_name:'',
            brand_short_name:'',
            remark:'',
            last_update_by:'1',
            is_valid:''
        }
       
    }

    searchSubmit(){
        // this.matlService.getBrandList(this.search.matl_name,this.search.pp_name,'','1',this.pageSize).then(result=>{
        //     if(result.code == 1) {
        //         this.dataSet = result.list;
        //         this.total = result.count;
        //     }
        //     this.loading = false;
        // }, err=>{
        //     this.loading = false;
        // })

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

    resetForm(){
        this.listOfData={
            search :{
                fieldMame: 'b.brand_code',
                fieldConditions: '1',
                fieldValue: '' ,
                fieldType:'and'
            },
            search2 :{
                fieldMame: 'b.brand_code',
                fieldConditions: '1',
                fieldValue: '' ,
                fieldType:'and'
            },
            search3 :{
                fieldMame: 'b.brand_code',
                fieldConditions: '1',
                fieldValue: '' ,
                fieldType:'and'
            },
            search4 : {
                fieldMame: 'b.brand_code',
                fieldConditions: '1',
                fieldValue: '' ,
                fieldType:'and'
            }
           
        }
        this.search = []
        this.getList(true);
    }

    // showUpdate(data:any): void {
    //     this.isUpdate = true;
    //     data.is_valid = data.is_valid == 1 ? true:false;
    //     this.update = this.format.extend(true, {}, data);
    // }

  
    hideUpdate():any{
        this.setInit();
        this.isUpdate = false;
    }
    updateSubmit():any{
        this.update.last_update_by = '1';
        if(this.check(this.update)) {
            this.update.is_valid = this.update.is_valid == true ? '1':'0';
            this.matlService.updateBrand(this.update).then(result=>{
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
            this.add.is_valid = this.add.is_valid == true ? '1':'0'; 
            this.matlService.addBrand(this.add).then(result=>{
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
        if(this.verify.empty(params.brand_code)) {
            this.message.create('warning', '品牌编号不能为空');
            return;
        } else if( this.verify.empty(params.brand_short_name)) {
            this.message.create('warning', '品牌缩写不能为空');
            return;
        }  else if( this.verify.empty(params.brand_name)) {
            this.message.create('warning', '品牌名称不能为空');
            return;
        }  
        return true;
    }


    delete(id:any) {
        this.modalService.confirm({
            nzTitle  : '<i>您想要删除这些条信息吗?</i>',
            nzOnOk   : () => {
                //先判断是否有子菜单，如果有子菜单禁止删除
                this.matlService.deleteBrand(id, '1').then(result=>{
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
        this.matlService.getBrandList(this.search,this.pageIndex, this.pageSize,this.field).then(result=>{
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

    brandChange(data:any) {
        console.log(data);
        if(data) {
            this.add.brand_id = data.brand_id;
            this.add.brand_name = data.brand_name;
            this.update.brand_id = data.brand_id;
            this.update.brand_name = data.brand_name;
            this.isAddBrand =false;
        }
       
    }
 //排序和搜素 checkbox
      showUpdate(): void {
        if(this.checkList.length <1){
            this.message.create('error', '请先选择数据再进行修改'); 
            return
        }else if(this.checkList.length !=1){
            this.message.create('error', '请逐条进行修改'); 
            return
        }
        this.dataSet.forEach(data => {
            if(data.checked==true){
                this.upData= data;
            }
        });
        this.isUpdate = true;
        this.update = this.format.extend(true, {}, this.upData);
        this.update.is_valid = this.update.is_valid == 1 ? true : false;
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
               this.matlService.deleteBrand(this.checkList, '1').then(result=>{
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
       this.dataSet.forEach(data => {
           data.checked = value;
           if(data.checked==true){
               this.checkList.push(data.brand_id);
           }
       });
   }
   refreshStatus() {
       const allChecked = this.dataSet.every(value => value.checked === true);
       const allUnChecked = this.dataSet.every(value => !value.checked);
       this.allChecked = allChecked;
       this.indeterminate = (!allChecked) && (!allUnChecked);
       this.checkList = [];
       this.dataSet.forEach(data => {
           if(data.checked==true){
               this.checkList.push(data.brand_id);
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