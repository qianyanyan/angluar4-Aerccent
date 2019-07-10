import { Component, OnInit, OnDestroy,ViewChild ,ElementRef, ViewEncapsulation } from '@angular/core';
// import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Format } from '../../core/common/format.service';
import { NzFormatEmitEvent, NzMessageService, NzTreeNodeOptions, NzModalService, UploadFile } from 'ng-zorro-antd';
import { Verify } from '../../core/common/verify.service';
import { EqtService } from './eqt.service';
import { Observable, Observer } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LocalStorage } from '../../core/common/local.storage';
import { EXPORT_ORG_STRUCTURE,FILE_UPDATE_RULE,FILE_DOWNLOAD_RULE, } from '../../app.constants';
@Component({
    selector: 'org-index',
    templateUrl: './org.component.html',
    styleUrls: ['./org.component.less'],
    providers: [EqtService]
})

export class OrgComponent implements OnInit, OnDestroy {
    height: any;
    data: any;
    allDataList: any;
    expandDataCache = {};
    listTypeOption = [];
    isAdd = false;
    isUpdate = false;
    add: any;
    update: any;
    defaultSelectedKeys = ['0'];
    nodes: NzTreeNodeOptions[] = [{
        title: '根目录',
        key: null,
    }];
    isShowTree: boolean;
    loading = true;
    time: string;
    uploading = false;
    fileList: UploadFile[] = [];
    listLangOption = [];
    export: string;
    isImport = false;
    import = {
        is_empty: false,
        is_no_lang: false,
        is_all: true,
        is_lang: false,
        lang_id: null
    }
    roleListOption = [];
    isAddEqt = false;
    isUpdateEqt = false;
    selectedValue = null;
    eqtListOption = [];
    listPlaneOption = [];
    listProOption = [];
    listPlaneStatus = false;
    ProdLineStatus = false;
    PlantCodeList = false ;
    org_type_label=false;
    origin_label:'';
    origin_code:'';
    orgzineTypeOption=[];
    nzFilterOption = () => true;
    listOfOption: Array<{ label: string; value: string }> = [];
    
    constructor(
        private format: Format,
        private message: NzMessageService,
        private verify: Verify,
        private eqtService: EqtService,
        private modalService: NzModalService,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private store: LocalStorage
    ) {
        this.height = (document.body.clientHeight - 240) + "px";
        this.isShowTree = false;
        this.export = EXPORT_ORG_STRUCTURE;
        this.listLangOption = [{
            label: '中文',
            value: '2'
        }]
        this.activeRoute.queryParams.subscribe(params => {
            let time = params['time'];
            if (this.time != time) {
                this.getList();
            }
            this.time = time;
        });

        //角色列表
        let userInfo = store.get("userInfo");
        if (userInfo && userInfo.roleList) {
            let list = userInfo.roleList;
            list.forEach(item => {
                this.roleListOption.push({
                    label: item.role_name,
                    value: item.role_id
                })
            });
        }
        this.setInit();
    }
    
    getOrgEqtList(value: string): void {
        let listOfOption = [];
        this.eqtService.getOrgEqtList().then(result => {
            result.list.forEach(item => {
                listOfOption.push({
                    value: item.id,
                    label: item.resource_name,
                    resource_code: item.resource_code
                });
            });
        })
        this.eqtListOption = listOfOption;
    }

    selectEqt(): void {
        setTimeout(() => {
            let resource_id = this.add.resource_id || this.update.resource_id;
            if (resource_id) {
                this.eqtListOption.forEach(item => {
                    if (item.value == resource_id) {
                        this.add.short_name = item.resource_code;
                        this.update.short_name = item.resource_code
                    }
                })
            }
        }, 500)
    }
    handleUpload(): void {
        const formData = new FormData();
        this.fileList.forEach((file: any) => {
            formData.append('file', file);
        });

        // 导入进行判断
        if (this.import.is_lang == false) {
            if (this.import.is_all == false) {
                this.message.success('请选择导入全部数据');
                return;
            }
        } else {
            // if (this.import.lang_id == false) {
            //     this.message.success('请选择语言');
            //     return;
            // }
        }
        formData.append('is_empty', this.import.is_empty ? '1' : '0');
        formData.append('is_no_lang', this.import.is_no_lang ? '1' : '0');
        formData.append('is_all', this.import.is_all ? '1' : '0');
        formData.append('is_lang', this.import.is_lang ? '1' : '0');

        this.uploading = true;
        this.eqtService.orgUpload(formData).then(result => {
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

    changeLang(is: boolean) {
        setTimeout(() => {
            if (is) {
                if (this.import.is_lang) {
                    this.import.is_all = false;
                    this.import.is_no_lang = false;
                } else {
                    this.import.is_all = true;
                }
            } else {
                this.import.is_lang = false;
            }
        }, 100);
    }

    ngOnInit(): void {
        // this.getList();
        const children: Array<{ label: string; value: string }> = [];
        for (let i = 10; i < 36; i++) {
          children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
        }
        this.listOfOption = children;
        this.getOrgEqtList(null);
    }

    ngOnDestroy(): void {

    }

    setInit() {
        this.add = {
            org_code: '',
            org_name: '',
            short_name: '',
            org_type_id: null,
            upper_org_id: null,
            parent_org_name: '',
            category_type: '',
            sort: '',
            is_valid: true,
            resource_id: '',
            role_id: this.roleListOption.length > 0 ? this.roleListOption[0].value : '',
            path:'',
            plant_id:'',
            plant_code:'',
            erp_resource_code:'',
            listOfSelectedValue : ['a10', 'c12'],
            is_other_type:''
        }
        this.update = {
            id: '',
            org_code: '',
            org_name: '',
            short_name: '',
            org_type_id: null,
            upper_org_id: null,
            parent_org_name: '',
            category_type: '',
            sort: '',
            role_id: this.roleListOption.length > 0 ? this.roleListOption[0].value : '',
            is_valid: true,
            resource_id: '',
            path: '',
            plant_id: '',
            plant_code:'',
            erp_resource_code:'',
            is_other_type:''
        }
    }

    jumpDetail(item): void {
        this.store.set('eqtTabitem', item);
        this.store.set('eqtTab', '');
        this.router.navigate(['/configuration/eqt-tab'], {
            queryParams: {
                'id': item.id,
                'category_type': item.category_type
            }
        });
    }

    stop($event) {
        let tagName = $event.target.tagName;
        if (tagName == "span" || tagName == "SPAN") {
            $event.stopPropagation();
        }
    }

    showUpdate(data, $event): void {
        $event.stopPropagation();
        this.isUpdate = true;
        // this.update = this.format.extend(true, {}, data);
        this.add = this.format.extend(true, {}, data);
        this.add.role_id= this.roleListOption.length > 0 ? this.roleListOption[0].value : '',
        console.log(this.add )
        this.nodes = [{
            title: '根目录',
            key: null,
            expanded: true,
            children: this.getTreeData(null)
        }];

        //获取上级目录
        this.defaultSelectedKeys = [data.upper_org_id];
        //获取上级名称
        if (data.upper_org_id == null) {
            // this.update.upper_org_id = null;
            this.update.parent_org_name = '根目录';
        } else {
            this.allDataList.forEach(value => {
                if (value.id == data.upper_org_id) {
                    this.update.parent_org_name = value.org_name;
                    this.update.plant_id = value.plant_id;
                }
            })
        }
    }

    // showEqtUpdate(data, $event): void {
    //     $event.stopPropagation();
    //     this.isUpdateEqt = true;
    //     this.update = this.format.extend(true, {}, data);
    //     this.nodes = [{
    //         title: '根目录',
    //         key: null,
    //         expanded: true,
    //         children: this.getTreeData(null)
    //     }];

    //     //获取上级目录
    //     this.defaultSelectedKeys = [data.upper_org_id];
    //     //获取上级名称
    //     if (data.upper_org_id == null) {
    //         this.update.parent_org_name = '根目录';
    //     } else {
    //         this.allDataList.forEach(value => {
    //             if (value.id == data.upper_org_id) {
    //                 this.update.parent_org_name = value.org_name;
    //                 this.update.plant_id = value.plant_id;
    //             }
    //         })
    //     }
    //     this.add.org_type_id = '1';
    // }

    hideUpdate(): any {
        this.setInit();
        this.isUpdate = false;
        this.isUpdateEqt = false;
    }

    updateSubmit(): any {
        if (this.check(this.add)) {
          
            this.add.path = this.getPath(this.add.upper_org_id)+","+this.add.id;
            // console.log(this.add.path)
            this.eqtService.updateOrg(this.add).then(result => {
                if (result.code == 1) {
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

    updateEqtSubmit(): any {
        if (this.checkEqt(this.update)) {
            this.update.path = this.getPath(this.update.upper_org_id) + "," + this.update.id;
            this.eqtService.updateOrg(this.update).then(result => {
                if (result.code == 1) {
                    this.isUpdateEqt = false;
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
        this.nodes = [{
            title: '根目录',
            key: null,
            expanded: true,
            children: this.getTreeData(null)
        }
        ];

        this.defaultSelectedKeys = [];
        // this.add = {};
    }

    hideAdd() {
        this.setInit();
        this.isAdd = false;
        this.isAddEqt = false;
    }

    showAddEqt(): void {
        this.isAddEqt = true;
        this.nodes = [{
            title: '根目录',
            key: null,
            expanded: true,
            children: this.getTreeData(null)
        }];
        this.defaultSelectedKeys = [];
        this.add.org_type_id = '1';
    }

    addSubmit(): void {
        if (this.check(this.add)) {
           this.add.path =  this.getPath(this.add.upper_org_id);
           if( this.add.is_other_type =='1'){
               this.add.org_code = '1'
           }
            this.eqtService.addOrg(this.add).then(result => {
                if (result.code == 1) {
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

    getPath(upper_org_id:any) {
        if (upper_org_id && upper_org_id!=null) {
            
          let list =  this.getParentId(upper_org_id);
          if(list.length>0) {
              return  ","+list.join(',');
          }
          
        }
        return null;
    }

    addEqtSubmit(): void {
        if (this.checkEqt(this.add)) {
            this.add.path = this.getPath(this.add.upper_org_id);
            this.eqtService.addOrg(this.add).then(result => {
                if (result.code == 1) {
                    this.isAddEqt = false;
                    this.message.create('success', '添加成功');
                    this.getList();
                    this.setInit();
                } else {
                    this.message.create('error', result.msg);
                }
            })
        }
    }

    checkEqt(params: any) {
        if (this.verify.empty(params.org_code)) {
            this.message.create('warning', '设备编码不能为空');
            return;
        }
        else if (this.verify.empty(params.resource_id)) {
            this.message.create('warning', '请选择设备');
            return;
        } else if (this.verify.empty(params.sort)) {
            this.message.create('warning', '排序不能为空');
            return;
        }
        return true;
    }
   
    check(params: any) {
        if (this.verify.empty(params.plant_code)) {
            this.message.create('warning', '工厂代码不能为空');
            return;
        }
        else if (params.org_type_id == null) {
            this.message.create('warning', '组织类型不能为空');
            return;
        } else if (this.verify.empty(params.org_name)) {
            this.message.create('warning', '组织名称不能为空');
            return;
        } 
        // else if (this.verify.empty(params.org_code)) {
        //     this.message.create('warning', '组织编码不能为空');
        //     return;
        // }
       else if (this.verify.empty(params.role_id)) {
            this.message.create('warning', '授予角色不能为空');
            return;
        }
        return true;
    }


    delete(id: any, $event) {
        $event.stopPropagation();
        this.modalService.confirm({
            nzTitle: '<i>您想要删除这些条信息吗?</i>',
            nzOnOk: () => {
                //先判断是否有子菜单，如果有子菜单禁止删除
                this.deleteCheck(id);
            }
        });
    }

    deleteCheck(id: any) {
        let isChild = false;
        this.allDataList.forEach(value => {
            if (id == value.parent_dept_id) {
                isChild = true;
            }
        })
        if (isChild) {
            this.modalService.error({
                nzTitle: '请先删除子设备',
            });
        } else {
            this.eqtService.deleteOrg(id).then(result => {
                if (result.code == 1) {
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
        this.add.upper_org_id = event.keys[0];
        this.add.parent_org_name = event.node.title;
        this.add.category_type = event.node.origin.category_type;
        this.add.plant_id = event.node.origin.plant_id;
        this.update.upper_org_id = event.keys[0];
        this.update.parent_org_name = event.node.title;
        this.update.category_type = event.node.origin.category_type;
        this.update.plant_id = event.node.origin.plant_id;
        this.isShowTree = false;
    }

    getList(): void {
        this.loading = true;
        this.eqtService.getOrgList().then((result: any) => {
            if (result.code == 1) {
                this.allDataList = result.data;
                this.data = this.getChildData(null);
                this.data.forEach(item => {
                    this.expandDataCache[item.id] = this.convertTreeToList(item);
                });
            }
            this.loading = false;
        }, err => {
            this.loading = false;
        })
        this.getEqtTypeList();
        this.getPlantList();  //工厂
    }
    getPlantList() {
        this.eqtService.getPlanList().then((result: any) => {
            if (result.code == 1) {
                this.listPlaneOption = [];
                this.listPlaneOption = result.data
            }
        })
    }
    getProdLineList() {
        this.eqtService.getProdLineLists().then((result: any) => {
            if (result.code == 1) {
                  this.listProOption = [];
                  this.listProOption = result.data
            }
        })
    }
    getResourceByPlantCodeList() {
        this.eqtService.getResourceByPlantCodeList(this.orgzineTypeOption).then((result: any) => {
            if (result.code == 1) {
                this.orgzineTypeOption = [];
                    this.orgzineTypeOption = result.data
            }
        })
    }
    SelectFn(){
        if(this.add.org_type_id){
             this.listTypeOption.forEach(item => {
               if(this.add.org_type_id ==item.value){
                     this.origin_label= item.label
                  if(item.label =='工厂'||item.label =='生产线'||item.label =='设备'){
                    this.org_type_label =true;
                    this.add.is_other_type ='2'
                    switch (item.label) {
                       
                        case '工厂': 
                            this.listPlaneStatus =true;
                            this.ProdLineStatus = false;
                            this.PlantCodeList = false ;
                            break
                        case '生产线': 
                            this.getProdLineList();
                            this.ProdLineStatus = true;
                            this.PlantCodeList = false ;
                            this.listPlaneStatus =false;
                            break
                         case '设备': 
                            this.getResourceByPlantCodeList()
                            this.listPlaneStatus =false;
                            this.ProdLineStatus = false;
                            this.PlantCodeList = true ;
                            break
                        default: return
                      }
                  }else{
                    this.org_type_label =false;
                    this.listPlaneStatus =false;
                    this.ProdLineStatus = false;
                    this.PlantCodeList = false ;
                    this.add.is_other_type ='1'
                  }
                  console.log(this.org_type_label)

               }
            });
        }
    }
    SelectCode(){
        if(this.origin_label){
            switch (this.origin_label) {
                case '工厂': 
                    this.listPlaneOption.forEach(item => {
                        if(this.add.org_name ==item.plant_name){  
                            this.add.org_code = item.plant_code
                        }
                    }) 
                    break
                case '生产线': 
                    this.listProOption.forEach(item => {
                        if(this.add.org_name ==item.prod_line_name){  
                            this.add.org_code = item.prod_line_code
                        }
                    }) 
                    break
                 case '设备': 
                    this.orgzineTypeOption.forEach(item => {
                        if(this.add.org_name ==item.resource_name){  
                            this.add.org_code = item.resource_code
                        }
                    }) 
                    break
                default: return
              }
        }
       
    }
    getEqtTypeList() {
        this.eqtService.getEqtTypeList().then((result: any) => {
            if (result.code == 1) {
                this.listTypeOption = [];
                result.list.forEach(item => {
                    if (item.eqt_type_code != 'eqty00000010') {
                        this.listTypeOption.push({
                            label: item.eqt_type_name,
                            value: item.eqt_type_id,
                        })
                    }
                });
            }
        })
    }

    treeState(state): void {
        this.isShowTree = state;
    }

    getTreeData(id): any {
        let childrenList = [];
        if(this.allDataList){
            this.allDataList.forEach(value => {
                if (value.upper_org_id == id) {
                    //判断是否有子集
                    let isChild = false;
                    if (value.org_type_id != "1") {
                        //循环是否有子菜单
                        this.allDataList.forEach(d => {
                            if (value.id == d.upper_org_id) {
                                isChild = true;
                            }
                        })
                        //是否有子菜单
                        if (isChild) {
                            value.children = this.getTreeData(value.id);
                        }
                        childrenList.push({
                            title: value.org_name,
                            key: value.id,
                            category_type: value.category_type,
                            plant_id: value.plant_id,
                            children: value.children
                        })
                    }
                }
            });
        }
       
        return childrenList;
    }

    getChildData(id): any {
        let childrenList = [];
        this.allDataList.forEach(value => {
            if (value.upper_org_id == id) {
                //判断是否有子集
                let isChild = false;
                //循环是否有子菜单
                this.allDataList.forEach(d => {
                    if (value.id == d.upper_org_id) {
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
                    stack.push({ ...node.children[i], level: node.level + 1, expand: false, parent: node });
                }
            }
        }

        return array;
    }

    visitNode(node: any, hashMap: object, array: any[]): void {
        if (!hashMap[node.id]) {
            hashMap[node.id] = true;
            array.push(node);
        }
    }

    getParentId(currentId:any) {
        let list = [currentId];
        let dataList = this.allDataList;

        function getId(id:any) {
            dataList.forEach(value => {
                if (value.id == id) {
                    if (value.upper_org_id && value.upper_org_id!=null ) {
                        list.unshift(value.upper_org_id)
                        getId(value.upper_org_id);
                    }
                }
            });
        }

        getId(currentId);
        return list;
    }
  
}