import { Component, OnInit, OnDestroy } from "@angular/core";
import { Format } from "../../core/common/format.service";
import { NzMessageService, NzModalService, UploadFile } from "ng-zorro-antd";
import { Verify } from "../../core/common/verify.service";
import { ShiftService } from "../shift/shift.service";
import { LocalStorage } from "../../core/common/local.storage";
import { EXPORT_MATL } from "../../app.constants";
@Component({
  selector: "app-shift",
  templateUrl: "./shift.component.html",
  styleUrls: ["../common.component.less"],
  providers: [ShiftService]
})
export class ShiftComponent implements OnInit, OnDestroy {
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
        fieldMame: 'u.unit_code',
        fieldConditions: '1',
        fieldValue: '' ,
        fieldType:'and'
    },
    search2 :{
        fieldMame: 'u.unit_code',
        fieldConditions: '1',
        fieldValue: '' ,
        fieldType:'and'
    },
    search3 :{
        fieldMame: 'u.unit_code',
        fieldConditions: '1',
        fieldValue: '' ,
        fieldType:'and'
    },
    search4 : {
        fieldMame: 'u.unit_code',
        fieldConditions: '1',
        fieldValue: '' ,
        fieldType:'and'
    },
    search5 : {
        fieldMame: 'u.unit_code',
        fieldConditions: '1',
        fieldValue: '' ,
        fieldType:'and'
    }
}
search = [];
listTypeOption = [];
TypeOption = [];
validOption = [];
statusOption = [];
field:any;
  constructor(
    private format: Format,
    private message: NzMessageService,
    private verify: Verify,
    private shiftService: ShiftService,
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
          label: '工厂代码',
          value: 'a.plant_code'
      },
      {
          label: '排班类型',
          value: 'a.shift_category_code'
      },
      {
          label: '排班描述',
          value: 'a.shift_desc'
      },
      {
          label: '开始时间',
          value: 'a.start_hour'
      },
      {
        label: '结束时间',
        value: 'a.end_hour'
      },
      {
          label: '状态',
          value: 'a.is_valid'
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
      plant_code: "",
      shift_category_code: "",
      shift_desc: "",
      start_hour: "",
      end_hour: "",
      remark: "",
      is_valid: false
    };
    this.update = {
      id: "",
      plant_code: "",
      shift_category_code: "",
      shift_desc: "",
      start_hour: "",
      end_hour: "",
      remark: "",
      is_valid: false
    };
  }

  // showUpdate(data: any): void {
  //   this.isUpdate = true;
  //   this.update = this.format.extend(true, {}, data);
  //   this.update.is_valid = data.is_valid == 1 ? true : false;
  // }

  hideUpdate(): any {
    this.setInit();
    this.isUpdate = false;
  }
  updateSubmit(): any {
    this.update.is_valid = this.update.is_valid == true ? "1" : "0";
    if (this.check(this.update)) {
      this.shiftService.updateShift(this.update).then(result => {
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
    this.add.is_valid = this.add.is_valid == true ? "1" : "0";
    if (this.check(this.add)) {
      this.shiftService.addShift(this.add).then(result => {
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
    } else if (this.verify.empty(params.shift_category_code)) {
      this.message.create("warning", "排班类型不能为空");
      return;
    } else if (this.verify.empty(params.shift_desc)) {
      this.message.create("warning", "排班描述不能为空");
      return;
    } else if (params.start_hour == null) {
      this.message.create("warning", "时间不能为空");
      return;
    } else if (params.end_hour == null) {
      this.message.create("warning", "时间不能为空");
      return;
    } else if (params.remark == "") {
      this.message.create("warning", "备注不能为空");
      return;
    } else if (params.is_valid == null) {
      this.message.create("warning", "是否有效不能为空");
      return;
    }
    return true;
  }

  delete(id: any) {
    this.modalService.confirm({
      nzTitle: "<i>您想要删除这条信息吗?</i>",
      nzOnOk: () => {
        //先判断是否有子菜单，如果有子菜单禁止删除
        this.shiftService.deleteShift(id).then(result => {
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
    this.shiftService.getShiftList(this.search,this.pageIndex, this.pageSize,this.field).then(
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
            fieldMame: 'a.plant_code',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and'
        },
        search2 :{
            fieldMame: 'a.plant_code',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and'
        },
        search3 :{
            fieldMame: 'a.plant_code',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and'
        },
        search4 : {
            fieldMame: 'a.plant_code',
            fieldConditions: '1',
            fieldValue: '' ,
            fieldType:'and'
        },
        search5 : {
            fieldMame: 'a.plant_code',
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
               this.shiftService.deleteShift(this.checkList).then(result => { 
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
  // this.searchdata();
  }
  // searchdata(): void {
  //   const data = this.dataSet
  // /** sort data **/
  // if (this.sortName && this.sortValue) {
  //     this.dataSet = data.sort((a, b) =>
  //     this.sortValue === 'ascend'
  //       ? a[this.sortName!] > b[this.sortName!]
  //         ? 1
  //         : -1
  //       : b[this.sortName!] > a[this.sortName!]
  //       ? 1
  //       : -1
  //   );
  // } else {
  //     this.dataSet = data;
  // }
  // }
}
