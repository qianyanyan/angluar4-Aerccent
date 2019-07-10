import { Component, OnInit, OnDestroy } from "@angular/core";
import { Format } from "../../../core/common/format.service";
import { NzMessageService, NzModalService, UploadFile } from "ng-zorro-antd";
import { Verify } from "../../../core/common/verify.service";
import { ResourceGroupService } from "../resource-group/resource-group.service";
import { LocalStorage } from "../../../core/common/local.storage";
import { EXPORT_MATL } from "../../../app.constants";
@Component({
  selector: "resource-group",
  templateUrl: "./resource-group.component.html",
  styleUrls: ["../../common.component.less"],
  providers: [ResourceGroupService]
})
export class ResourceGroupComponent implements OnInit, OnDestroy {
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
  constructor(
    private format: Format,
    private message: NzMessageService,
    private verify: Verify,
    private resourceGroupService: ResourceGroupService,
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
  }

  ngOnDestroy(): void {}

  setInit() {
    this.add = {
      plant_code: "",
      resource_group: "",
      description: "",
      last_update_by: "4"
    };
    this.update = {
      id: "",
      plant_code: "",
      resource_group: "",
      description: "",
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
      this.resourceGroupService
        .updateResourceGroup(this.update)
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
      this.resourceGroupService.addResourceGroup(this.add).then(result => {
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
      this.message.create("warning", "工厂代码不能为空");
      return;
    } else if (this.verify.empty(params.resource_group)) {
      this.message.create("warning", "资源组不能为空");
      return;
    } else if (this.verify.empty(params.description)) {
      this.message.create("warning", "资源组描述不能为空");
      return;
    }
    return true;
  }

  delete(id: any) {
    this.modalService.confirm({
      nzTitle: "<i>您想要删除这条信息吗?</i>",
      nzOnOk: () => {
        //先判断是否有子菜单，如果有子菜单禁止删除
        this.resourceGroupService.deleteResourceGroup(id).then(result => {
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
    this.resourceGroupService
      .getResourceGroupList(this.pageIndex, this.pageSize)
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
    this.resourceGroupService.getPlantList().then(result => {
      this.listPlantOption = result.list;
    });
  }

}
