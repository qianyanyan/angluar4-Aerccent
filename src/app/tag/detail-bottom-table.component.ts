import { Component, OnDestroy, OnInit, Input, ViewChild } from '@angular/core';
import { TagService } from "./tag.service";
import { DataService } from "../DataService";
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';
import { Format } from '../core/common/format.service';
import { LocalStorage } from '../core/common/local.storage';

@Component({
  selector: 'detail-bottom-table',
  templateUrl: './detail-bottom-table.component.html',
  styleUrls: ['./tag.component.less'],
  providers: [TagService]
})

export class DetailBottomTableComponent implements OnInit, OnDestroy {
  @Input() id: any;
  @Input() eqt_name: any;
  height: any;
  isVisible;
  showloading: any;
  priorityList = [
    { text: 'L', value: 'L' },
    { text: 'M', value: 'M' },
    { text: 'H', value: 'H' }
  ];

  ruleInstNameList = [];
  ruleInstNameListP = [];
  ruleInstNameListC = [];
  eqtNameList = [];
  eqtNameListP = [];
  eqtNameListC = [];
  seach_input:string;
  customizedName1 = [];
  customizedName1P = [];
  customizedName1C = [];
  customizedName2 = [];
  customizedName2P = [];
  customizedName2C = [];
  customizedName3 = [];
  customizedName3P = [];
  customizedName3C = [];
  sortName = null;
  sortValue = null;
  listOfSearchName = [];
  searchPriority: string;
  data = [];
  displayData = [...this.data];
  rule_id:any;
  trendOptions: any;
  trendIntance: any;
  listRule = [];
  eqtList = [];
  loading = true;
  trendSize = '0';
  trend = {
    eqt_id: '',
    rule_inst_id: ''
  };
  customizedList = [];
  timer: any;
  trendName = '指标项';
  nzWidth: number;
  searchsText = {
    rule_inst_name: null,
    eqt_name: null,
    priority: null,
    customized_name_1: null,
    customized_name_2: null,
    customized_name_3: null,
    customized_type_1: null,
    customized_type_2: null,
    customized_type_3: null,
    status: null
  }
  customizedNameList = [];
  constructor(
    private tagService: TagService,
    private dataService: DataService,
    private format: Format,
    private store:LocalStorage,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {
    this.height = (document.body.clientHeight - 280) + "px";
    this.nzWidth = document.body.clientWidth;
    this.showloading = true;
    this.trendOptions = {
      tooltip: {
        trigger: 'item',
        formatter: "日期{b}<br/>值 {c}"
      },
      grid: {
        bottom: "80px"
      },
      dataZoom: [
        {
          type: 'slider',
          show: true,
        }
      ],
      xAxis: {
        type: 'category',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#dbdbdb'
          }
        },
        axisLabel: {
          color: '#000',
          formatter: function (val) {
            var strs = val.split(' '); //字符串数组

            return strs[0] + '\n' + strs[1]
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        },
        data: []
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },

        splitNumber: 5,
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        },
      },
      color: ['#15abff', '#1abc9c'],
      series: {
        data: [],
        step: true,
        type: 'line',
        symbolSize: 8,

        lineStyle: {
          color: "#15abff"
        },
        markLine: {
          silent: true,
          symbol: false,
          lineStyle: {
            color: "#a3230a"
          },
          data: []
        }
      }
    };

    this.activeRoute.queryParams
      .subscribe((params: Params) => {
        this.id = "";
        this.eqt_name = "";

        this.id = params['id'];
        this.eqt_name = params['eqt_name'];

        this.eqtList = this.dataService.getEqtIdList(this.id);
        this.eqtList.push(this.id);
        this.timer && clearInterval(this.timer);
        this.getRuleTypeItem();
        
      });
  }


  getEqtList() {
    
  }

  getChildEqt(id) {
    let eqtTree = this.dataService.eqtTree.value;
    let eqtList = [this.id];
    eqtTree.forEach(item => {
      if (item.upper_eqt_id == id && item.eqt_type_id == '214E8EE3-56D3-454E-8293-FC942BC194C9') {
        this.eqtList.push(item.id)
      } else if (item.upper_eqt_id == id) {
        this.getChildEqt(item.id)
      }
    });
    return eqtList;
  }

  historicalTrend(data: any): void {
    this.trend.eqt_id = data.eqt_id;
    this.trend.rule_inst_id = data.rule_inst_id;
    this.trendName = data.rule_inst_name;
    this.isVisible = true;
    this.trendSize = "0";
    this.getTrend();
  }

  getTrend() {
    this.trendOptions.xAxis.data = [];
    this.trendOptions.series.data = [];
    this.trendOptions.series.markLine.data = [];
    this.trendIntance.setOption(this.trendOptions);
    
    this.tagService.getIndicatorsTrend(this.trend.eqt_id, this.trend.rule_inst_id, this.trendSize).then((result: any) => {
      console.log(result);
      
      if (result.code == 1) {
        let arr = [];
        let list = result.list.sort(function (a, b) {
          return a.occur_date - b.occur_date;
        });
        list.forEach((item, index) => {
          if (index < 10080 && item.value > 0) {
            this.trendOptions.xAxis.data.push(this.format.formatUnixtimestamp(item.occur_date));
            item.lower_limit != null && (this.trendOptions.series.markLine.data[0] = {
              yAxis: item.lower_limit
            });
            item.upper_limit != null && (this.trendOptions.series.markLine.data[1] = {
              yAxis: item.upper_limit
            });

            if (item.value != null && item.value != "null") {
              arr.push(item.value);
            }
            if (item.lower_limit != null && item.lower_limit != "null") {

              arr.push(item.lower_limit)
            }
            if (item.upper_limit != null && item.upper_limit != "null") {

              arr.push(item.upper_limit)
            }
          }
          let color = "#15abff"; //默认是绿色
          if (item.lower_limit != null && item.value < item.lower_limit) {
            color = "#a3230a";
          }
          if (item.upper_limit != null && item.value > item.upper_limit) {
            color = "#a3230a";
          }

          this.trendOptions.series.data.push({
            value: item.value,
            itemStyle: {
              color: color
            },
          })

        });
        arr.sort(function (a, b) {
          return a - b;
        });
        let max = 1;
        let min = 0;
        
        for(var i = 0; i<this.rule_id.list.length;i++){
          if(this.rule_id.list[i].rule_id==452 || this.rule_id.list[i].rule_id==645){
            console.log(this.rule_id.list.rule_id);
            this.trendOptions.yAxis.max = -0.06;
            this.trendOptions.yAxis.min = -0.1;
          }
        }


        min = arr[0];  // 5
        max = arr[arr.length - 1];  // 56
        // if (max != null) {
        //   this.trendOptions.yAxis.max = Math.ceil(max);
        // }
        // if (min != null) {
        //   this.trendOptions.yAxis.min = Math.floor(min);
        // }
        this.trendIntance.setOption(this.trendOptions);
      }
    })
  }

  checkChange(): void {
    this.getTrend();
  }

  onTrendInit(ec): void {
    this.trendIntance = ec;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  getAlarmEqt(seach_input){
    var erp_matl_code =  this.store.get("erp_matl_code");
    if(seach_input.value == ''){
      this.displayData = [];
    }else{
      this.seach_input = seach_input.value;
      this.getAlarmEqtList(this.seach_input);
    }
  }

  getAlarmEqtList(seach_input) {
    this.timer && clearInterval(this.timer);
    //先把三个都清空
    this.searchsText.customized_type_1 = null;
    if (this.searchsText.customized_name_1) {
      this.searchsText.customized_type_1 = this.customizedNameList[this.searchsText.customized_name_1];
    }
    this.searchsText.customized_type_2 = null;
    if (this.searchsText.customized_name_2) {
      this.searchsText.customized_type_2 = this.customizedNameList[this.searchsText.customized_name_2];
    }
    this.searchsText.customized_type_3 = null;
    if (this.searchsText.customized_name_3) {
      this.searchsText.customized_type_3 = this.customizedNameList[this.searchsText.customized_name_3];
    }
    this.tagService.getAlarmEqtList(seach_input,this.store.get("erp_matl_code"),this.eqtList.join(','), '2', this.searchsText).then((result: any) => {
     console.log(result);
      if (result.code == 1) {
        this.rule_id = result;
        this.data = [];
        result.list.forEach(item => {
          // item.customized_type_1 && (item.customized_name_1 = this.customizedList[item.customized_type_1])
          // item.customized_type_2 && (item.customized_name_2 = this.customizedList[item.customized_type_2])
          // item.customized_type_3 && (item.customized_name_3 = this.customizedList[item.customized_type_3])
          // item.customized_type_6 && (item.customized_name_1 = this.customizedList[item.customized_type_6])
          // item.customized_type_7 && (item.customized_name_2 = this.customizedList[item.customized_type_7])
          // item.customized_type_8 && (item.customized_name_3 = this.customizedList[item.customized_type_8])
          item.customized_name_1 = item.customized_type_1
          item.customized_name_2 = item.customized_type_2
          item.customized_name_3 = item.customized_type_3
          if (item.rule_inst_name && !this.ruleInstNameListC[item.rule_inst_name]) {
            this.ruleInstNameListC[item.rule_inst_name] = item.rule_inst_name;
            this.ruleInstNameListP.push({
              text: item.rule_inst_name, value: item.rule_inst_name
            })
          }
          if (item.eqt_name && !this.eqtNameListC[item.eqt_name]) {
            this.eqtNameListC[item.eqt_name] = item.eqt_name;
            this.eqtNameListP.push({
              text: item.eqt_name, value: item.eqt_name
            })
          }
          if (item.customized_name_1 && !this.customizedName1C[item.customized_name_1]) {
            this.customizedName1C[item.customized_name_1] = item.customized_name_1;
            this.customizedName1P.push({
              text: item.customized_name_1, value: item.customized_name_1
            })
          }

          if (item.customized_name_2 && !this.customizedName2C[item.customized_name_2]) {
            this.customizedName2C[item.customized_name_2] = item.customized_name_2;
            this.customizedName2P.push({
              text: item.customized_name_2, value: item.customized_name_2
            })
          }
          if (item.customized_name_3 && !this.customizedName1C[item.customized_name_3]) {
            this.customizedName3C[item.customized_name_3] = item.customized_name_3;
            this.customizedName3P.push({
              text: item.customized_name_1, value: item.customized_name_3
            })
          }

          this.data.push(item);
        });
        this.resetFiltersData();
        // this.resetFilters(0);
        this.displayData = [...this.data];
      }
      this.loading = false;
      // this.setTime();
    }, () => {
      this.loading = false;
      // this.setTime();
    })
  }

  setTime() {
    this.timer = setTimeout(() => {
      this.getAlarmEqtList(this.seach_input);
    }, 5000)
  }
 
  ngOnInit(): void {
    
  
  }

  getRuleTypeItem() {
    this.tagService.getRuleTypeItem().then((result: any) => {
      console.log(result);
      if (result.code == 1) {
        this.listRule = result.list;
        result.list.forEach(item => {
          this.customizedList[item.rule_type_item_code] = item.rule_type_item_name
          this.customizedNameList[item.rule_type_item_name] = item.rule_type_item_code;
        });
        this.getAlarmEqtList(this.seach_input);
      }
    })
  }
  filter(searchName: string, index: number): void {
    this.serachs(searchName, index);
    // if (searchName) {
    //   this.search(searchName, index);
    // } else {
    //   this.displayData = this.data;
    // }
  }

  resetFiltersData() {
    //只要查询里面的字段是空的，则重置
    if (!this.searchsText.rule_inst_name) {
      this.ruleInstNameList = [];
      setTimeout(() => {
        this.ruleInstNameList = this.ruleInstNameListP;
      }, 1000)
    }

    if (!this.searchsText.eqt_name) {
      this.eqtNameList = [];
      setTimeout(() => {
        this.eqtNameList = this.eqtNameListP;
      }, 1000)
    }
    if (!this.searchsText.priority) {
      this.priorityList = [
        { text: 'L', value: 'L' },
        { text: 'M', value: 'M' },
        { text: 'H', value: 'H' }
      ];
    }

    if (!this.searchsText.customized_name_1) {
      this.customizedName1 = [];
      setTimeout(() => {
        this.customizedName1 = this.customizedName1P;
      }, 1000)
    }

    if (!this.searchsText.customized_name_2) {
      setTimeout(() => {
        this.customizedName2 = this.customizedName2P;
      }, 1000)
    }

    if (!this.searchsText.customized_name_3) {
      setTimeout(() => {
        this.customizedName3 = this.customizedName3P;
      }, 1000)
    }
  }

  resetFilters(index: number): void {
    if (index != 1) {
      this.ruleInstNameList = [];
      setTimeout(() => {
        this.ruleInstNameList = this.ruleInstNameListP;
      }, 1000)
    }

    if (index != 2) {
      this.eqtNameList = [];

      setTimeout(() => {
        this.eqtNameList = this.eqtNameListP;
      }, 1000)
    }
    if (index != 3) {
      this.priorityList = [
        { text: 'L', value: 'L' },
        { text: 'M', value: 'M' },
        { text: 'H', value: 'H' }
      ];
    }

    if (index != 4) {
      this.customizedName1 = [];
      setTimeout(() => {
        this.customizedName1 = this.customizedName1P;
      }, 1000)

    }
    if (index != 5) {
      setTimeout(() => {
        this.customizedName2 = this.customizedName2P;
      }, 1000)
    }
    if (index != 6) {
      setTimeout(() => {
        this.customizedName3 = this.customizedName3P;
      }, 1000)
    }
  }


  serachs(searchName, index): void {
    if (index == 1) {
      this.searchsText.rule_inst_name = searchName;
    } else if (index == 2) {
      this.searchsText.eqt_name = searchName;
    } else if (index == 3) {
      this.searchsText.priority = searchName;
    } else if (index == 4) {
      this.searchsText.customized_name_1 = searchName;
    } else if (index == 5) {
      this.searchsText.customized_name_2 = searchName;
    } else if (index == 6) {
      this.searchsText.customized_name_3 = searchName;
    }
    this.timer && clearInterval(this.timer);
    this.getAlarmEqtList(this.seach_input);
  }

  search(searchName, index): void {
    let data;
    if (index == 1) {
      const filterFunc = item => (
        item.rule_inst_name ? item.rule_inst_name.indexOf(searchName) !== -1 : false)
      this.data.filter(item => filterFunc(item));
      data = this.data.filter(item => filterFunc(item));
    }
    if (index == 2) {
      const filterFunc = item => (
        item.eqt_name ? item.eqt_name.indexOf(searchName) !== -1 : false)
      this.data.filter(item => filterFunc(item));
      data = this.data.filter(item => filterFunc(item));
    }
    if (index == 3) {
      const filterFunc = item => (
        item.priority ? item.priority.indexOf(searchName) !== -1 : false)
      this.data.filter(item => filterFunc(item));
      data = this.data.filter(item => filterFunc(item));
    }
    if (index == 4) {
      const filterFunc = item => (
        item.customized_name_1 ? item.customized_name_1.indexOf(searchName) !== -1 : false)
      this.data.filter(item => filterFunc(item));
      data = this.data.filter(item => filterFunc(item));
    }
    if (index == 5) {
      const filterFunc = item => (
        item.customized_name_2 ? item.customized_name_2.indexOf(searchName) !== -1 : false)
      this.data.filter(item => filterFunc(item));
      data = this.data.filter(item => filterFunc(item));
    }
    if (index == 6) {
      const filterFunc = item => (
        item.customized_name_3 ? item.customized_name_3.indexOf(searchName) !== -1 : false)
      this.data.filter(item => filterFunc(item));
      data = this.data.filter(item => filterFunc(item));
    }


    this.displayData = data;
   
    this.resetFilters(index);
  }

  ngOnDestroy(): void {
    this.timer && clearInterval(this.timer);
  }

  gotoCover(index) {
    this.timer && clearInterval(this.timer);
    this.timer = setTimeout(() => {
      this.getAlarmEqtList(this.seach_input);
    }, 30000)
  }

  sort(e) {

  }
}