import { Component, OnInit, OnDestroy } from "@angular/core";
import { Format } from "../../core/common/format.service";
import { NzMessageService, NzModalService, UploadFile } from "ng-zorro-antd";
import { Verify } from "../../core/common/verify.service";
import { ResourceService } from "../resource/resource.service";
import { LocalStorage } from "../../core/common/local.storage";
import { EXPORT_MATL } from "../../app.constants";
@Component({
  selector: "resource-index",
  templateUrl: "./resource.component.html",
  styleUrls: ["../common.component.less"],
  providers: [ResourceService]
})
export class ResourceComponent implements OnInit, OnDestroy {
  height: any;
  dataSet: any;
  isAdd = false;
  isUpdate = false;

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

  listPlantOption = [];
  listWorkOption = [];
  search = {
    resource_code: "",
    resource_description: "",
    work_center_description: ""
  };
  constructor(
    private format: Format,
    private message: NzMessageService,
    private verify: Verify,
    private resourceService: ResourceService,
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
    this.getPlantList();
    this.getWorkList();
  }

  ngOnDestroy(): void {}

  setInit() {
    this.add = {
      resource_code: "",
      plant_code: "",
      description: "",
      resource_name: "",
      work_center_id: "",
      status_id: "",
      erp_location: "",
      last_update_by: "4"
    };
    this.update = {
      id: "",
      resource_code: "",
      plant_code: "",
      description: "",
      resource_name: "",
      work_center_id: "",
      status_id: "",
      erp_location: "",
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
    if (this.check(this.update)) {
      console.log(this.update);
      this.resourceService.updateResource(this.update).then(result => {
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
  }

  hideAdd() {
    this.setInit();
    this.isAdd = false;
  }

  addSubmit(): void {
    if (this.check(this.add)) {
      this.resourceService.addResource(this.add).then(result => {
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
    if (this.verify.empty(params.resource_code)) {
      this.message.create("warning", "资源代码不能为空");
      return;
    } else if (this.verify.empty(params.plant_code)) {
      this.message.create("warning", "工厂代码不能为空");
      return;
    } else if (this.verify.empty(params.resource_name)) {
      this.message.create("warning", "资源描述不能为空");
      return;
    } else if (params.work_center_id == null) {
      this.message.create("warning", "工作中心不能为空");
      return;
    }
    return true;
  }

  delete(id: any) {
    this.modalService.confirm({
      nzTitle: "<i>您想要删除这条信息吗?</i>",
      nzOnOk: () => {
        //先判断是否有子菜单，如果有子菜单禁止删除
        this.resourceService.deleteResource(id).then(result => {
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
    this.resourceService
      .getResourceList(this.pageIndex, this.pageSize, this.search)
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
  getPlantList() {
    this.resourceService.getPlantList().then(result => {
      this.listPlantOption = result.list;
    });
  }
  getWorkList() {
    this.resourceService.getWorkList().then(result => {
      this.listWorkOption = result.list;
      console.log(result.list);
    });
  }
  resetForm(): void {
    this.search = {
      resource_code: "",
      resource_description: "",
      work_center_description: ""
    };
    this.getList();
  }
  searchSubmit(): void {
    this.getList();
  }
}
