import { Component, OnInit, OnDestroy } from "@angular/core";
import { Format } from "../../core/common/format.service";
import { NzMessageService, NzModalService, UploadFile } from "ng-zorro-antd";
import { Verify } from "../../core/common/verify.service";
import { KpiService } from "./kpi.service";
import { LocalStorage } from "../../core/common/local.storage";
import { EXPORT_MATL } from "../../app.constants";
import { analyzeAndValidateNgModules } from "@angular/compiler";
@Component({
  selector: "app-kpi",
  templateUrl: "./kpi.component.html",
  styleUrls: ["../common.component.less"],
  providers: [KpiService]
})
export class KpiComponent implements OnInit, OnDestroy {
  height: any;
  dataSet: any;
  isAdd = false;
  isUpdate = false;
  isAddBrand = false;
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
  gcCode = [];
  import = {
    is_empty: false,
    is_no_lang: false,
    is_all: true,
    is_lang: false,
    lang_id: null
  };
  dateFormat = "yyyy-MM-dd";
  startDate = [];
  validDate = [];
  addStartDate = [];
  addValidDate = [];
  danwei=[];
  constructor(
    private format: Format,
    private message: NzMessageService,
    private verify: Verify,
    private kpiService: KpiService,
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
    this.choosedanwei()
  }

  ngOnDestroy(): void {}

  setInit() {
    this.add = {
      plant_code: "",
      target_type: "",
      organization_id: "",
      version: "",
      current_version: "",
      period_type: "",
      period_start: "",
      period_end: "",
      valid_from: "",
      valid_to: "",
      target_value: "",
      unit_id: "",
      last_update_by: "4"
    };
    this.update = {
      id: "",
      plant_code: "",
      target_type: "",
      organization_id: "",
      version: "",
      current_version: "",
      period_type: "",
      period_start: this.startDate[0],
      period_end:this.startDate[1],
      valid_from: "",
      valid_to: "",
      target_value: "",
      unit_id: "",
      last_update_by: "4"
    };
  }

  showUpdate(data: any): void {
    this.isUpdate = true;
    this.update = this.format.extend(true, {}, data);
    this.startDate = [this.update.period_start, this.update.period_end];
    this.validDate = [this.update.valid_from, this.update.valid_to];
  }

  hideUpdate(): any {
    this.setInit();
    this.isUpdate = false;
  }
  updateSubmit(): any {
    this.update.period_start = this.format.dateFormat(this.startDate[0]);
    this.update.period_end = this.format.dateFormat(this.startDate[1]);
    this.update.valid_from = this.format.dateFormat(this.validDate[0]);
    this.update.valid_to = this.format.dateFormat(this.validDate[1]);
    if (this.check(this.update)) {
      this.kpiService.updateKPI(this.update).then(result => {
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

  getgcCode(){
    this.kpiService.getgcCode().then(result =>{
      if(result.code == 1){
        this.gcCode = result.list;
      }
    });
  }

  addSubmit(): void {
    this.add.period_start = this.format.dateFormat(this.addStartDate[0]);
    this.add.period_end = this.format.dateFormat(this.addStartDate[1]);
    this.add.valid_from = this.format.dateFormat(this.addValidDate[0]);
    this.add.valid_to = this.format.dateFormat(this.addValidDate[1]);
    if (this.check(this.add)) {
      this.kpiService.addKPI(this.add).then(result => {
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
    } else if (this.verify.empty(params.target_type)) {
      this.message.create("warning", "指标类型不能为空");
      return;
    } else if (params.version == "") {
      this.message.create("warning", "版本不能为空");
      return;
    } else if (params.current_version == "") {
      this.message.create("warning", "现行版本不能为空");
      return;
    } else if (this.verify.empty(params.period_type)) {
      this.message.create("warning", "期间类型不能为空");
      return;
    } else if (this.startDate == null && this.addStartDate == null) {
      this.message.create("warning", "期间不能为空");
      return;
    } else if (this.validDate == null && this.addValidDate == null) {
      this.message.create("warning", "有效期不能为空");
      return;
    } else if (params.target_value == "") {
      this.message.create("warning", "目标值不能为空");
      return;
    } else if (params.unit_id == "") {
      this.message.create("warning", "单位不能为空");
      return;
    }
    return true;
  }

  delete(id: any) {
    this.modalService.confirm({
      nzTitle: "<i>您想要删除这条信息吗?</i>",
      nzOnOk: () => {
        //先判断是否有子菜单，如果有子菜单禁止删除
        this.kpiService.deleteKPI(id).then(result => {
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
    this.kpiService.getKPIList(this.pageIndex, this.pageSize).then(
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

  showAddBrandModule() {
    this.isAddBrand = true;
  }

  hideAddBrandModule() {
    this.isAddBrand = false;
  }

  brandChange(data: any) {
    console.log(data);
    if (data) {
      this.add.brand_id = data.brand_id;
      this.add.brand_name = data.brand_name;
      this.update.brand_id = data.brand_id;
      this.update.brand_name = data.brand_name;
      this.isAddBrand = false;
    }
  }
  choosedanwei(){
    this.kpiService.getgongYidanwei().then(result=>{
        console.log(result);
        if(result.code == 1) {
            this.danwei = result.list;
        }
        this.loading = false;
    }, err=>{
        this.loading = false;
    })
}
}
