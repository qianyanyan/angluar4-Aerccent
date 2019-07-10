import { Component, OnInit, OnDestroy } from "@angular/core";
import { Format } from "../../../core/common/format.service";
import { NzMessageService, NzModalService, UploadFile } from "ng-zorro-antd";
import { Verify } from "../../../core/common/verify.service";
import { BomDeployService } from "../bom-deploy/bom-deploy.service";
import { LocalStorage } from "../../../core/common/local.storage";
import { EXPORT_MATL } from "../../../app.constants";
@Component({
  selector: "bom-deploy",
  templateUrl: "./bom-deploy.component.html",
  styleUrls: ["../../common.component.less"],
  providers: [BomDeployService]
})
export class BomDeployComponent implements OnInit, OnDestroy {
  height: any;
  dataSet: any;
  isAdd = false;
  isUpdate = false;
  isAddBrand= false;
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
  listMaltOption = [];
  search = {
    matl_description: ""
  };
  constructor(
    private format: Format,
    private message: NzMessageService,
    private verify: Verify,
    private bomDeployService: BomDeployService,
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
    this.getMaltList();
  }

  ngOnDestroy(): void {}

  setInit() {
    this.add = {
      plant_code: "",
      matl_description: "",
      bom_type: "",
      revision: "",
      current_revision: false,
      matl_descriptionID:'',
      base_quantity: "",
      last_update_by: "4"
    };
    this.update = {
      id: "",
      plant_code: "",
      matl_description: "",
      bom_type: "",
      revision: "",
      current_revision: false,
      base_quantity: "",
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
    this.update.current_revision = this.update.current_revision == true ? "1" : "0";
  
    if (this.check(this.update)) {
      console.log(this.update);
      this.bomDeployService.updateBom(this.update).then(result => {
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
    this.add.current_revision = this.add.current_revision == true ? "1" : "0";
    if (this.check(this.add)) {
      this.bomDeployService.addBom(this.add).then(result => {
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
    }else if (this.verify.empty(params.matl_description)) {
      this.message.create("warning", "物料描述不能为空");
      return;
    }else if (this.verify.empty(params.bom_type)) {
      this.message.create("warning", "BOM类型不能为空");
      return;
    } else if (this.verify.empty(params.revision)) {
      this.message.create("warning", "版本号不能为空");
      return;
    } else if (params.current_revision == null) {
      this.message.create("warning", "现行版本不能为空");
      return;
    } else if (this.verify.empty(params.base_quantity)) {
      this.message.create("warning", "基本数量不能为空");
      return;
    }
    return true;
  }

  delete(id: any) {
    this.modalService.confirm({
      nzTitle: "<i>您想要删除这条信息吗?</i>",
      nzOnOk: () => {
        //先判断是否有子菜单，如果有子菜单禁止删除
        this.bomDeployService.deleteBom(id).then(result => {
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
    this.bomDeployService
      .getBomList(this.pageIndex, this.pageSize, this.search)
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
    this.bomDeployService.getPlantList().then(result => {
      this.listPlantOption = result.list;
    });
  }
  getMaltList() {
    this.bomDeployService.getMaltList().then(result => {
      console.log(result)
      this.listMaltOption = result;
    });
  }

showAddBrandModule() {
    this.isAddBrand =true;
}

hideAddBrandModule() {
    this.isAddBrand =false;
}

brandChange(data:any) {
    if(data.matl_id) {
        this.add.matl_descriptionID = data.matl_id;
        this.add.matl_description = data.matl_name;
        this.update.matl_descriptionID = data.matl_id;
        this.update.matl_description = data.matl_name;
        this.isAddBrand =false;
    }
   
}

  resetForm(): void {
    this.search = {
      matl_description: ""
    };
    this.getList();
  }
  searchSubmit(): void {
    this.getList();
  }
}
