import { Component, OnInit, OnDestroy } from "@angular/core";
import { Format } from "../../core/common/format.service";
import { NzMessageService, NzModalService, UploadFile } from "ng-zorro-antd";
import { Verify } from "../../core/common/verify.service";
import { StatusService } from "./status.service";
import { LocalStorage } from "../../core/common/local.storage";
import { EXPORT_MATL } from "../../app.constants";
@Component({
  selector: "app-status",
  templateUrl: "./status.component.html",
  styleUrls: ["../common.component.less"],
  providers: [StatusService]
})
export class StatusComponent implements OnInit, OnDestroy {
  height: any;
  dataSet: any;
  isAdd = false;
  isUpdate = false;
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
  add: any;
  update: any;
  loading = true;
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listBrandOption = [];
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
  };
  dateFormat = "yyyy-MM-dd";
  startDate = null;
  addStartDate = null;
  listOfData={
    search :{
        fieldMame: 'pds.plant_name',
        fieldConditions: '1',
        fieldValue: '' ,
        fieldType:'and'
    },
    search2 :{
        fieldMame: 'pds.plant_name',
        fieldConditions: '1',
        fieldValue: '' ,
        fieldType:'and'
    },
    search3 :{
        fieldMame: 'pds.plant_name',
        fieldConditions: '1',
        fieldValue: '' ,
        fieldType:'and'
    },
    search4 : {
        fieldMame: 'pds.plant_name',
        fieldConditions: '1',
        fieldValue: '' ,
        fieldType:'and'
    },
    search5 : {
        fieldMame: 'pds.plant_name',
        fieldConditions: '1',
        fieldValue: '' ,
        fieldType:'and'
    },
    search6: {
      fieldMame: 'pds.plant_name',
      fieldConditions: '1',
      fieldValue: '' ,
      fieldType:'and'
  }
}
search = [];
listTypeOption = [];
TypeOption = [];
validOption = [];
listPlaneOption = [];
statusOption = [];
field:any;
  constructor(
    private format: Format,
    private message: NzMessageService,
    private verify: Verify,
    private StatusService: StatusService,
    private modalService: NzModalService,
    private store: LocalStorage
  ) {
    this.export = EXPORT_MATL;
    this.setInit();
    this.listLangOption = [
      {
        label: "中文",
        value: "2"
      }
    ];
    this.listTypeOption = [
      {
          label: '工厂名称',
          value: 'pds.plant_name'
      },
      {
          label: '状态代码',
          value: 'sc.status_code'
      },
      {
          label: '状态描述',
          value: 'sc.status_description'
      },
      {
          label: '状态组',
          value: 'sc.status_group'
      },
      {
        label: '现行版本',
        value: 'sc.current_revision'
      },
      {
          label: '状态',
          value: 'sc.default_status'
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
  };
  handleUpload(): void {
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append("file", file);
    });

    // 导入进行判断
    if (this.import.is_lang == false) {
      if (this.import.is_all == false) {
        this.message.success("请选择导入全部数据");
        return;
      }
    } else {
      if (this.import.lang_id == false) {
        this.message.success("请选择语言");
        return;
      }
    }
    formData.append("is_empty", this.import.is_empty ? "1" : "0");
    formData.append("is_no_lang", this.import.is_no_lang ? "1" : "0");
    formData.append("is_all", this.import.is_all ? "1" : "0");
    formData.append("is_lang", this.import.is_lang ? "1" : "0");
    this.uploading = true;
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
    this.getList(true);
    
  }

  ngOnDestroy(): void {}

  setInit() {
    this.add = {
      plant_name: "",
      shift_category_code: "",
      shift_desc: "",
      start_hour: "",
      end_hour: "",
      remark: "",
      is_valid: false
    };
    this.update = {
      id: "",
      plant_name: "",
      shift_category_code: "",
      shift_desc: "",
      start_hour: "",
      end_hour: "",
      remark: "",
      is_valid: false
    };
    this.indeterminate = false;
    this.upData = [];
    this.checkList =[]
  }
  hideUpdate(): any {
    this.setInit();
    this.isUpdate = false;
  }
  getPlantList() {
    this.StatusService.getPlanList().then((result: any) => {
        if (result.code == 1) {
            this.listPlaneOption = [];
            this.listPlaneOption = result.data
        }
    })
}
  updateSubmit(): any {
    this.update.is_valid = this.update.is_valid == true ? "1" : "0";
    if (this.check(this.update)) {
      this.StatusService.updateStatus(this.update).then(result => {
        if (result.code == 1) {
          this.isUpdate = false;
          this.message.create("success", "更新成功");
          this.getList(true);
          this.setInit();
        } else {
          this.message.create("error", result.msg);
        }
      });
    }
  }

  showAdd(): void {
    this.isAdd = true;
    this.getPlantList()
  }

  hideAdd() {
    this.setInit();
    this.isAdd = false;
  }

  addSubmit(): void {
    this.add.is_valid = this.add.is_valid == true ? "1" : "0";
    if (this.check(this.add)) {
      this.StatusService.addStatus(this.add).then(result => {
        if (result.code == 1) {
          this.isAdd = false;
          this.message.create("success", "添加成功");
          this.getList(true);
          this.setInit();
        } else {
          this.message.create("error", result.msg);
        }
      });
    }
  }

  check(params: any) {
    if (this.verify.empty(params.plant_code)) {
      this.message.create("warning", "工厂名称不能为空");
      return;
    } else if (this.verify.empty(params.status_code)) {
      this.message.create("warning", "状态代码不能为空");
      return;
    } else if (this.verify.empty(params.status_description)) {
      this.message.create("warning", "状态描述不能为空");
      return;
    }else  if (this.verify.empty(params.status_group)) {
      this.message.create("warning", "状态组不能为空");
      return;
    } else if (this.verify.empty(params.current_revision)) {
      this.message.create("warning", "现行版本不能为空");
      return;
    } else if (this.verify.empty(params.default_status)) {
      this.message.create("warning", "默认状态不能为空");
      return;
    }
    return true;
  }

  delete(id: any) {
    this.modalService.confirm({
      nzTitle: "<i>您想要删除这条信息吗?</i>",
      nzOnOk: () => {
        //先判断是否有子菜单，如果有子菜单禁止删除
        this.StatusService.deleteStatus(id).then(result => {
          if (result.code == 1) {
            this.message.create("success", "删除成功");
            this.getList(true);
            this.setInit();
          } else {
            this.message.create("error", result.msg);
            return false;
          }
        });
      }
    });
  }

  getList(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.StatusService.getStatusList(this.search,this.pageIndex, this.pageSize,this.field).then(
      result => {
        if (result.code == 1) {
         
          this.dataSet = result.list;
          this.total = result.count;
        }
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    );
  }

  //排序和搜素
  resetForm(): void {
    this.listOfData={
        search :{
            fieldMame: 'pds.plant_name',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and'
        },
        search2 :{
            fieldMame: 'pds.plant_name',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and'
        },
        search3 :{
            fieldMame: 'pds.plant_name',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and'
        },
        search4 : {
            fieldMame: 'pds.plant_name',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and'
        },
        search5 : {
            fieldMame: 'pds.plant_name',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and'
        },
        search6 : {
          fieldMame: 'pds.plant_name',
          fieldConditions: '1',
          fieldValue: '' ,
          fieldType:'and'
      }
    }
    this.search = []
    this.getList();
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
              // this.unitService.deleteUnit(this.checkList, '1').then(result=>{
               this.StatusService.deleteStatus(this.checkList).then(result => { 
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
  toggleCollapsed(): void {
  this.isCollapsed = !this.isCollapsed;
  }
  checkAll(value: boolean): void {
  this.dataSet.forEach(data => {
      data.checked = value;
      if(data.checked==true){
          this.checkList.push(data.id);
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
