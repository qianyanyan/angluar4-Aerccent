import { Component, OnInit, OnDestroy } from "@angular/core";
import { Format } from "../../core/common/format.service";
import { NzMessageService, NzModalService, UploadFile } from "ng-zorro-antd";
import { Verify } from "../../core/common/verify.service";
import { ProcessService } from "../process/process.service";
import { LocalStorage } from "../../core/common/local.storage";
import { EXPORT_MATL } from "../../app.constants";
@Component({
  selector: "app-process",
  templateUrl: "./process.component.html",
  styleUrls: ["../common.component.less"],
  providers: [ProcessService]
})
export class ProcessComponent implements OnInit, OnDestroy {
  height: any;
  dataSet: any;
  isAdd = false;
  isUpdate = false;
  isAddGroup = false;
  isAddBrand = false;
  add: any;
  update: any;
  loading = true;
  pageIndex = 1;
  gcCode = [];
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
  search = {
    description: "",
    resource_type_description: "",
    default_resource_description: ""
  };
  listResourceTypeOption = [
    { keyvalue: "resource", label: "resource" },
    { keyvalue: "resource_group", label: "resource_group" }
  ];

  constructor(
    private format: Format,
    private message: NzMessageService,
    private verify: Verify,
    private processService: ProcessService,
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
      plant_code: "",
      operation_code: "",
      revision: "",
      current_revision: "",
      description: "",
      status_id: "",
      resource_type: "",
      resource_type_id: "",
      default_resource_id: "",
      erp_control_key: "",
      erp_work_center: "",
      last_update_by: "1",
      resource_typeID:'',
      default_resourceID:''
    };
    this.update = {
      id: "",
      plant_code: "",
      operation_code: "",
      revision: "",
      current_revision: "",
      description: "",
      status_id: "",
      resource_type: "",
      resource_typeID: "",
      default_resource_id: "",
      erp_control_key: "",
      erp_work_center: "",
      last_update_by: "1",
      default_resourceID:''
    };
  }

  showUpdate(data: any): void {
    this.isUpdate = true;
    this.update = this.format.extend(true, {}, data);
  }

  hideUpdate(): any {
    this.setInit();
    this.isUpdate = false;
  }
  updateSubmit(): any {
    // if (this.check(this.update)) {
      this.processService.updateOperation(this.update).then(result => {
        if (result.code == 1) {
          this.isUpdate = false;
          this.message.create("success", "更新成功");
          this.getList(true);
          this.setInit();
        } else {
          this.message.create("error", result.msg);
        }
      });
    // }
  }

  showAdd(): void {
    this.isAdd = true;
  }

  hideAdd() {
    this.setInit();
    this.isAdd = false;
  }

  addSubmit(): void {
    console.log(this.add);
    // if (this.check(this.add)) {
      this.processService.addOperation(this.add).then(result => {
        if (result.code == 1) {
          this.isAdd = false;
          this.message.create("success", "添加成功");
          this.getList(true);
          this.setInit();
        } else {
          this.message.create("error", result.msg);
        }
      });
    // }
  }

  getgcCode(){
    this.processService.getPlantList().then(resule =>{
      if(resule.code == 1){
        this.gcCode = resule.list;
      }
    });
  }

  check(params: any) {
    // if (this.verify.empty(params.plant_code)) {
    //   this.message.create("warning", "工厂代码不能为空");
    //   return;
    // } else if (this.verify.empty(params.operation_code)) {
    //   this.message.create("warning", "工序代码不能为空");
    //   return;
    // } else if (this.verify.empty(params.revision)) {
    //   this.message.create("warning", "版本不能为空");
    //   return;
    // } else if ( params.current_revision == "" || params.current_revision == null　) {
    //   this.message.create("warning", "现行版本不能为空");
    //   return;
    // } else if (this.verify.empty(params.description)) {
    //   this.message.create("warning", "描述不能为空");
    //   return;
  
    // } else if (this.verify.empty(params.resource_type)) {
    //   this.message.create("warning", "资源种类不能为空");
    //   return;
    // } 
    // else if ( params.resource_type_id == "" || params.resource_type_id == null ) {
    //   this.message.create("warning", "资源种类ID不能为空");
    //   return;
    // } 
    // else if ( params.default_resource_id == "" || params.default_resource_id == null ) {
    //   this.message.create("warning", "默认资源种类不能为空");
    //   return;
    // } else if (this.verify.empty(params.erp_control_key)) {
    //   this.message.create("warning", "ERP控制码不能为空");
    //   return;
    // } else if (this.verify.empty(params.erp_work_center)) {
    //   this.message.create("warning", "ERP工作重心不能为空");
    //   return;
    // }
    // return true;
  }

  delete(id: any) {
    this.modalService.confirm({
      nzTitle: "<i>您想要删除这条信息吗?</i>",
      nzOnOk: () => {
        //先判断是否有子菜单，如果有子菜单禁止删除
        this.processService.deleteOperation(id).then(result => {
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
    this.processService.getOperationList(this.pageIndex, this.pageSize, this.search).then(result => {
          if (result.code == 1) {
            this.dataSet = result.list;
            console.log(result.list);
            this.total = result.count;
          }
          this.loading = false;
        },
        err => {
          this.loading = false;
        }
      );
  }

  showAddBrandModule(resource_type){
    this.isAddBrand = true;
    this.store.set('resource_type',resource_type);

  }

  hideAddBrandModule(){
    this.isAddBrand =false;
  }

  brandChange(data:any) {
    if(data.id) {
        this.add.resource_typeID = data.id;
        this.add.resource_type_description = data.description;
        this.update.resource_typeID = data.id;
        this.update.resource_type_description = data.description;
        this.isAddBrand =false;
    }
  }


  showAddGroupModule(){
    this.isAddGroup = true;
  }

  hideAddGroupModule(){
    this.isAddGroup =false;
  }

  GroupChange(data:any) {
    if(data.id) {
        this.add.default_resourceID = data.id;
        this.add.default_resource_description = data.description;
        this.isAddGroup =false;
    }
  }

  resetForm(): void {
    this.search = {
      description: "",
      resource_type_description: "",
      default_resource_description: ""
    };
    this.getList();
  }
  searchSubmit(): void {
    this.getList();
  }
}
