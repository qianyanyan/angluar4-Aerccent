import { Component, OnInit, OnDestroy } from "@angular/core";
import { Format } from "../../../core/common/format.service";
import { NzMessageService, NzModalService, UploadFile } from "ng-zorro-antd";
import { Verify } from "../../../core/common/verify.service";
import { ResourceGroupAssignmentService } from "../resource-group-assignment/resource-group-assignment.service";
import { LocalStorage } from "../../../core/common/local.storage";
import { EXPORT_MATL } from "../../../app.constants";
@Component({
  selector: "resource-group-assignment",
  templateUrl: "./resource-group-assignment.component.html",
  styleUrls: ["../../common.component.less"],
  providers: [ResourceGroupAssignmentService]
})
export class ResourceGroupAssignmentComponent implements OnInit, OnDestroy {
  height: any;
  dataSet: any;
  isAdd = false;
  isUpdate = false;
  isAddBrand = false;
  add: any;
  getResule = [];
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

  listPlantOption = [];
  listWorkOption = [];
  search = {
    resource_group_description: "",
    resource_description: ""
  };
  constructor(
    private format: Format,
    private message: NzMessageService,
    private verify: Verify,
    private resourceGroupAssignmentService: ResourceGroupAssignmentService,
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
      resource_group_id: "",
      description: "",
      resource_id: "",
      resource_name: "",
      last_update_by: "4"
    };
    this.update = {
      id: "",
      resource_group_id: "",
      description: "",
      resource_id: "",
      resource_name: "",
      last_update_by: "4"
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
      console.log(this.update);
      this.resourceGroupAssignmentService
        .updateResourceGroupAssignment(this.update)
        .then(result => {
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
      this.resourceGroupAssignmentService
        .addResourceGroupAssignment(this.add)
        .then(result => {
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

  check(params: any) {
    if (this.verify.empty(params.resource_group_id)) {
      this.message.create("warning", "资源组不能为空");
      return;
    } else if (this.verify.empty(params.resource_id)) {
      this.message.create("warning", "资源ID不能为空");
      return;
    }
    return true;
  }

  delete(id: any) {
    this.modalService.confirm({
      nzTitle: "<i>您想要删除这条信息吗?</i>",
      nzOnOk: () => {
        //先判断是否有子菜单，如果有子菜单禁止删除
        this.resourceGroupAssignmentService
          .deleteResourceGroupAssignment(id)
          .then(result => {
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
    this.resourceGroupAssignmentService
      .getResourceGroupAssignmentList(this.pageIndex, this.pageSize,this.search)
      .then(
        result => {
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

showAddBrandModule() {
    this.isAddBrand =true;
}

hideAddBrandModule() {
    this.isAddBrand =false;
}

getresuouleList(){
  this.resourceGroupAssignmentService.getResourceList().then(result => {
    if(result.code == 1){
      this.getResule = result.list;
    }
  })
}

brandChange(data:any) {
    if(data.resource_desc_id) {
        this.add.resource_id = data.resource_desc_id;
        this.add.resourceContext = data.resource_name;
        this.update.resource_id = data.resource_desc_id;
        this.update.resourceContext = data.resource_name;
        this.isAddBrand =false;
    }
}


  resetForm(): void {
    this.search = {
      resource_group_description: "",
      resource_description: ""
    };
    this.getList();
  }
  searchSubmit(): void {
    this.getList();
  }
}
