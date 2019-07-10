import { Component, OnInit, OnDestroy } from '@angular/core';
import { Format } from '../../core/common/format.service';
import { NzFormatEmitEvent, NzMessageService, NzTreeNodeOptions, NzModalService,UploadFile } from 'ng-zorro-antd';
import { Verify } from '../../core/common/verify.service';
import { EqtService } from './eqt.service';
import { Router , ActivatedRoute, NavigationEnd} from '@angular/router';
import { LocalStorage } from '../../core/common/local.storage';
import {  EXPORT_EQT} from '../../app.constants';
@Component({
    selector:'eqt-index',
    templateUrl:'./eqt.component.html',
    styleUrls:['./eqt.component.less'],
    providers: [EqtService]
})

export class EqtComponent implements OnInit, OnDestroy {
    height:any;
    data:any;
    allDataList:any;
    expandDataCache = {};
    listTypeOption = [];
    isAdd = false;
    isUpdate = false;
    add :any;
    update:any;
    defaultSelectedKeys = [ '0' ];
    nodes: NzTreeNodeOptions[] = [ {
      title   : '根目录',
      key     : null,
    }];
    isShowTree: boolean;
    loading = true;
    time:string;
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
    constructor( 
        private format: Format,    
        private message: NzMessageService,
        private verify:Verify,
        private eqtService:EqtService,
        private modalService: NzModalService, 
        private router: Router,
        private activeRoute: ActivatedRoute,
        private store:LocalStorage
        ){
        this.height = (document.body.clientHeight-240)+"px";
        this.isShowTree =false;
        this.export = EXPORT_EQT;
        this.setInit();
        this.listLangOption = [{
            label:'中文',
            value:'2'
        }]

      
       
        this.activeRoute.queryParams.subscribe(params => {
            let time  = params['time'];    
            if(this.time!=time) {
                this.getList();
            } 
            this.time = time;
  
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
            if(this.import.lang_id==false) {
                this.message.success('请选择语言');
                return;
            }
        }
        formData.append('is_empty', this.import.is_empty ? '1' : '0');
        formData.append('is_no_lang', this.import.is_no_lang ? '1' : '0');
        formData.append('is_all', this.import.is_all ? '1' : '0');
        formData.append('is_lang', this.import.is_lang ? '1' : '0');
        
        this.uploading = true;
        this.eqtService.eqtUpload(formData).then(result=>{
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

    setInit() {
        this.add = {
            eqt_code:'',
            eqt_name:'',
            eqt_detail:'',
            eqt_type_id:null,
            upper_eqt_id:null,
            parent_eqt_name:'',
            sort:'',
            last_update_by:'1'
        }
        this.update = {
            id:'',
            eqt_code:'',
            eqt_name:'',
            eqt_detail:'',
            eqt_type_id:null,
            upper_eqt_id:null,
            parent_eqt_name:'',
            sort:'',
            last_update_by:'1'
        }
    }

    jumpDetail(item):void {
        this.store.set('eqtTabitem',item);
        this.store.set('eqtTab','');
        this.router.navigate(['/configuration/eqt-tab'],{
            queryParams:{
            'id':item.id,
                'category_type': item.category_type
            }
        });
    }

    stop($event) {
        let tagName = $event.target.tagName ;
        if(tagName=="span" || tagName=="SPAN") {
        $event.stopPropagation();
        }
    }

    showUpdate(data, $event): void {
        $event.stopPropagation();
        this.isUpdate = true;
        this.update = this.format.extend(true, {}, data);
        this.nodes  = [ {
            title   : '根目录',
            key     : null,
            expanded: true,
            children: this.getTreeData(null) 
        }];

        //获取上级目录
        this.defaultSelectedKeys = [ data.upper_eqt_id ];
             //获取上级名称
        if(data.upper_eqt_id==null) {
            // this.update.upper_eqt_id = null;
            this.update.parent_eqt_name = '根目录';
        } else {
            this.allDataList.forEach(value => {
                if(value.id == data.upper_eqt_id) {
                    this.update.parent_eqt_name = value.eqt_name;
                }
            })
        }
    }

 
    hideUpdate():any{
        this.setInit();
        this.isUpdate = false;
    }
    updateSubmit():any{
      
        this.update.last_update_by = '1';
        if(this.check(this.update)) {
            this.eqtService.addUpdate(this.update).then(result=>{
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
        this.nodes  = [ {
            title   : '根目录',
            key     : null,
            expanded: true,
            children: this.getTreeData(null) }
        ];
        
        this.defaultSelectedKeys = [ ];
    }

    hideAdd() {
        this.setInit();
        this.isAdd = false;
    }

    addSubmit(): void {
        if(this.check(this.add)) {
            this.eqtService.addEqt(this.add).then(result=>{
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
        if(this.verify.empty(params.eqt_code)) {
            this.message.create('warning', '设备编码不能为空');
            return;
        } 
        // else if(this.verify.empty(params.eqt_detail)) {
        //     this.message.create('warning', '设备描述不能为空');
        //     return;
        // } 
        else if( this.verify.empty(params.eqt_name)) {
            this.message.create('warning', '设备名称不能为空');
            return;
        }  else if(params.eqt_type_id==null) {
            this.message.create('warning', '设备类型不能为空');
            return;
        }   else if( this.verify.empty(params.sort)) {
            this.message.create('warning', '排序不能为空');
            return;
        } 
        return true;
    }


    delete(id:any,$event) {
        $event.stopPropagation();
        this.modalService.confirm({
            nzTitle  : '<i>您想要删除这些条信息吗?</i>',
            nzOnOk   : () => {
                //先判断是否有子菜单，如果有子菜单禁止删除
                this.deleteCheck(id);
            }
        });
    }

    deleteCheck(id:any) {
        let isChild  = false;
        this.allDataList.forEach(value => {
            if(id == value.parent_dept_id) {
                isChild = true;
            }
        })
        if(isChild) {
            this.modalService.error({
                nzTitle: '请先删除子设备',
              });
        } else {
            this.eqtService.deleteEqt(id, '1').then(result=>{
                if(result.code == 1) {
                    this.message.create('success', '删除成功');
                    this.getList();
                    this.setInit();
                } else {
                    this.message.create('error', result.msg); 
                }
            })
            
        } 
    }
  
    nzClick(event: NzFormatEmitEvent): void {
        this.add.upper_eqt_id = event.keys[0];
        this.add.parent_eqt_name = event.node.title;
        this.update.upper_eqt_id = event.keys[0];
        this.update.parent_eqt_name = event.node.title;
        this.isShowTree = false;
    }
 
    getList():void {
        this.loading = true;
        this.eqtService.getEqtList().then((result: any) => {
            if(result.code==1) {
                this.allDataList = result.data;
                this.data = this.getChildData(null);
                this.data.forEach(item => {
                    this.expandDataCache[ item.id ] = this.convertTreeToList(item);
                });
            } 
            this.loading = false;
        }, err=>{
            this.loading = false;
        })
        this.getEqtTypeList();
    }

    getEqtTypeList() {
        this.eqtService.getEqtTypeList().then((result: any) => {
            if(result.code==1) {
                this.listTypeOption = [];
                result.list.forEach(item => {
                    this.listTypeOption.push({
                        label:item.eqt_type_name,
                        value:item.eqt_type_id
                    })
                });
            } 
        })
    }

    treeState(state):void {
        console.log(state)
        this.isShowTree = state;
    }

    getTreeData (id): any {
        let childrenList = [];
        this.allDataList.forEach(value => {
          if (value.upper_eqt_id == id) {
            //判断是否有子集
            let isChild = false;
            //循环是否有子菜单
            this.allDataList.forEach(d => {
              if (value.id == d.upper_eqt_id) {
                isChild = true;
              }
            })
            //是否有子菜单
            if (isChild) {
                value.children = this.getTreeData(value.id);
            }  
            childrenList.push({
                title:value.eqt_name,
                key:value.id,
                children:value.children 
            })
          }
        });
       
        return childrenList;
    }

    getChildData(id): any {
        let childrenList = [];
        this.allDataList.forEach(value => {
          if (value.upper_eqt_id == id) {
            //判断是否有子集
            let isChild = false;
            //循环是否有子菜单
            this.allDataList.forEach(d => {
              if (value.id == d.upper_eqt_id) {
                isChild = true;
              }
            })
            //是否有子菜单
            if (isChild) {
                value.children = this.getChildData(value.id);
            } 
            childrenList.push(value)
          }
        });
        return childrenList;
    }


    collapse(array: any[], data: any, $event: boolean): void {
        if ($event === false) {
            if (data.children) {
                data.children.forEach(d => {
                    const target = array.find(a => a.id === d.id);
                    target.expand = false;
                    this.collapse(array, target, false);
                });
            } else {
                return;
            }
        }
    }

    convertTreeToList(root: object): any[] {
        const stack = [];
        const array = [];
        const hashMap = {};
        stack.push({ ...root, level: 0, expand: true });
        
        while (stack.length !== 0) {
            const node = stack.pop();
            this.visitNode(node, hashMap, array);
            if (node.children) {
                for (let i = node.children.length - 1; i >= 0; i--) {
                    stack.push({ ...node.children[ i ], level: node.level + 1, expand: false, parent: node });
                }
            }
        }

        return array;
    }
    
    visitNode(node: any, hashMap: object, array: any[]): void {
        if (!hashMap[ node.id ]) { 
            hashMap[ node.id ] = true;
            array.push(node);
        }
    }

}