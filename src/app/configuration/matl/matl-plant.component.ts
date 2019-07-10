import { Component, OnInit, OnDestroy } from '@angular/core';
import { Format } from '../../core/common/format.service';
import { NzMessageService, NzModalService, UploadFile} from 'ng-zorro-antd';
import { Verify } from '../../core/common/verify.service';
import { MatlService } from './matl.service';
import { EXPORT_MATL_PLANT } from '../../app.constants';
@Component({
    selector:'matl-plant-index',
    templateUrl:'./matl-plant.component.html',
    styleUrls:['./matl-tab.component.less'],
    providers: [MatlService]
})

export class MatlPlantComponent implements OnInit, OnDestroy {
    height:any;
    dataSet:any;
    isAdd = false;
    isUpdate = false;
    search:any;
    isAddMatl = false;
    add :any;
    update:any;
    loading = true;
    pageIndex = 1;
    pageSize = 10;
    total = 1;
    listmatl_plantOption =[];
    export: string;
    import = {
        is_empty: false 
    }
    fileList: UploadFile[] = [];
    uploading = false;
    isImport = false;
    constructor( 
        private format: Format,    
        private message: NzMessageService,
        private verify:Verify,
        private matlService:MatlService,
        private modalService: NzModalService){
        this.export = EXPORT_MATL_PLANT;
        this.setInit();
    }
    
    ngOnInit(): void {
        this.getList(true); 
    }

    ngOnDestroy(): void {

    }

    setInit() {
        this.add = {
            plant_code:'',
            matl_names:'',
            matl_code:'',
            matl_id:'',
            remark:'',
            last_update_by:'1',
            is_valid:true
        }
        this.update = {
            id:'',
            plant_code:'',
            matl_id:'',
            matl_name:'',
            matl_code:'',
            remark:'',
            last_update_by:'1',
            is_valid:''
        }
        this.search = {
            matl_code:'',
            matl_name:'',
            plant_code:''
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
        formData.append('is_empty', this.import.is_empty ? '1' : '0');
        this.uploading = true;
        this.matlService.matlPlantUpload(formData).then(result => {
            this.uploading = false;
            if (result.code == 1) {
                this.isImport = false;
                this.fileList = [];
                this.getList();
                this.message.success('上传成功');
            } else {
                this.message.error(result.msg);
            }
        }, err => {
            this.uploading = false;
            this.message.error('上传失败');
        })
    }

    searchSubmit(){
        this.matlService.getMatlPlantList(this.search.matl_code,this.search.plant_code,this.search.matl_name,'1',this.pageSize).then(result=>{
            if(result.code == 1) {
                this.dataSet = result.list;
                this.total = result.count;
            }
                this.loading = false;
            }, err=>{
                this.loading = false;
        })
    }
    resetForm(){
        this.search.matl_code = '';
        this.search.matl_name = '';
        this.search.plant_code = '';
        this.getList(true);
    }

    showUpdate(data:any): void {
        this.isUpdate = true;
        data.is_valid = data.is_valid == 1 ? true : false;
        this.update = this.format.extend(true, {}, data);
    }

 
    hideUpdate():any{
        this.setInit();
        this.isUpdate = false;
    }
    updateSubmit():any{
        this.update.last_update_by = '1';
        if(this.check(this.update)) {
            this.update.is_valid = this.update.is_valid == true ? '1':'0';
            this.matlService.updateMatlPlant(this.update).then(result=>{
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
            this.matlService.addMatlPlant(this.add).then(result=>{
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
        if(this.verify.empty(params.plant_code)) {
            this.message.create('warning', '工厂代码不能为空');
            return;
        }  else if( this.verify.empty(params.matl_id)) {
            this.message.create('warning', '物料编号不能为空');
            return;
        }  
        return true;
    }


    delete(id:any) {
        this.modalService.confirm({
            nzTitle  : '<i>您想要删除这些条信息吗?</i>',
            nzOnOk   : () => {
                this.matlService.deleteMatlPlant(id, '1').then(result=>{
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
         
        this.matlService.getMatlPlantList(this.search.matl_code,this.search.plant_code,this.search.matl_name,this.pageIndex,this.pageSize).then(result=>{
      
            if(result.code == 1) {
                console.log(result);
                this.dataSet = result.list;
                this.total = result.count;
            }
            this.loading = false;
        }, err=>{
            this.loading = false;
        })
    }
     
    showAddMatlModule() {
        this.isAddMatl =true;
    }

    hideAddMatlModule() {
        this.isAddMatl =false;
    }

    matlChange(data:any) {
        if(data) {
            this.add.matl_id = data.matl_id;
            this.add.matl_name =  data.matl_name;
            this.add.matl_code =  data.matl_code;
            this.update.matl_id = data.matl_id;
            this.update.matl_name =  data.matl_name;
            this.update.matl_code =  data.matl_code;
            this.isAddMatl =false;
        }
       
    }

}