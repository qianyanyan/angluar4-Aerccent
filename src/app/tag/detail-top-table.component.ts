import { Component, OnDestroy, OnInit, Input, ViewChild } from '@angular/core';
import { TagService } from "./tag.service";
import { DataService } from "../DataService";
import { Router, NavigationEnd, ActivatedRoute,Params} from '@angular/router';
import { Format } from '../core/common/format.service';
import { LocalStorage } from '../core/common/local.storage';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { FILE_UPDATE_RULE, FILE_DOWNLOAD_RULE } from '../app.constants';
@Component({
  selector: 'detail-top-table',
  templateUrl: './detail-top-table.component.html',
  styleUrls: ['./tag.component.less'],
  providers: [TagService]
})

export class DetailTopTableComponent implements OnInit, OnDestroy {
  @Input() id: any;
  @Input() eqt_name: any;
  height: any;
  isVisible;
  MusicUrl;
  showloading: any;
  message:any;
  priorityList = [
    { text: 'L', value: 'L' },
    { text: 'M', value: 'M' },
    { text: 'H', value: 'H' }
  ];
  statusList = [
    { text: '打开', value: 'opening' },
    { text: '已确认', value: 'confirmed' }
  ];
  ruleInstNameList = [];
  ruleInstNameListP = [];
  quchong = [];
  ruleInstNameListC = [];
  eqtNameList = [];
  eqtNameListP = [];
  eqtNameListC = [];
  customizedName1 = [];
  customizedName1P = [];
  modetypessize;
  changeTag = [];
  customizedName1C = [];
  customizedName2 = [];
  customizedName2P = [];
  customizedName2C = [];
  customizedName3 = [];
  customizedName3P = [];
  customizedName3C = [];
  actionTexttag:string;
  seach_input:string;
  sortName = null;
  sortValue = null;
  listOfSearchName = [];
  searchPriority: string;
  data = [];
  displayData = [...this.data];
  trendOptions: any;
  trendIntance: any;
  listStatusOption = [];
  listRule = [];
  eqtList = [];
  action_jieguo=[];
  loading = true;
  trendSize = '0';
  trend = {
    eqt_id: '',
    rule_inst_id: '',
    index: ''
  };
  customizedList = [];
  customizedNameList = [];
  isBack: boolean;
  timer: any;
  trendName = '报警项';
  isplay;
  actionText: string;
  beizhu:string;
  isAction = false;
  actionData: any;
  voiceUrl: SafeResourceUrl;
  private _audio: HTMLAudioElement;
  private audioIndex = 0;
  audioListStatus = [];
  audioList = [];
  audioListId = [];
  nzAction = FILE_UPDATE_RULE;
  avatarUrl: string;
  isShowImg = false;
  isFirsAuto = true;
  at_rule_id:any;
  output_value1 = [];
  nzWidth: number;
  btnList = [];
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
    status: null,
  }

   
  isShowConfirm=false
  constructor(
    private tagService: TagService,
    private store:LocalStorage,
    private format: Format,
    private sanitizer: DomSanitizer,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private dataService: DataService) {
    this.showloading = true;
    this.height = (document.body.clientHeight - 280) + "px";
    this.nzWidth = document.body.clientWidth;
    this.trendOptions = {
      tooltip: {
        trigger: 'item',
        formatter: "日期:{b}<br/>值: {c}"
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
      color: ['#15abff', '#1abc9c', '#a3230a'],
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
        let userInfo = this.dataService.userInfo.value;
        let parent_module_id = '';
        userInfo.moduleList.forEach(value => {
            //获取他的父菜单
            if(value.class_name=='T_Detail') {
                parent_module_id = value.id;
            }
        })
        userInfo.moduleList.forEach((value,index) => {
          //获取他的父菜单
          if(value.parent_module_id==parent_module_id) {
              if(value.class_name=="B_Confirm"){
                this.isShowConfirm = true;
              }
          }
      })

    this.activeRoute.queryParams
      .subscribe((params: Params) => {
          this.id = "";
          this.eqt_name = "";
  
          this.id = params['id'];
          this.eqt_name = params['eqt_name'];
        
          this.eqtList = this.dataService.getEqtIdList(this.id);
          this.eqtList.push(this.id);
          this.timer && clearInterval(this.timer);

        this.getBtnPermission();
          if (this._audio) {
            this._audio.pause();
            console.log(this._audio)
            try {
            //  document.getElementsByTagName('body')[0].removeChild(this._audio);
            } catch (error) {
              
            }
           
          }
        this.isFirsAuto = true
      });
   
  }

  getEqtList() {
 
  }

  ngAfterViewInit() {
    // 监听路由变化
 
    
  }


  getChildEqt(id) {
    let eqtTree = this.dataService.eqtTree.value;
    let eqtList = [this.id];
    eqtTree.forEach(item => {
      if (item.upper_eqt_id == id && item.eqt_type_id == '8') {
        this.eqtList.push(item.id)
      } else if (item.upper_eqt_id == id) {
        this.getChildEqt(item.id)
      }
    });
    return eqtList;
  }

  getAlarmEqt(seach_input){
    if(seach_input.value == ''){
      this.displayData =[];
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
    this.message= this.store.get("message");
    if(this.message != ''&& this.message != null){
       this.searchsText.eqt_name = this.message.itemName;
    }

    this.tagService.getAlarmEqtList(this.seach_input,"",this.eqtList.join(','), '1', this.searchsText).then((result: any) => {
      this.message = this.store.set("message",'');
      console.log(result);
      this.loading = false;
      if (result.code == 1) {
       this.at_rule_id = result;
        this.dataService.setAlarmNum(result.list.length);
        this.data = [];
        let audioLists = [];
        result.list.forEach((item, index) => {
          this.audioListStatus[index] = item.priority;
          if (item.status == "opening") {//存在不用添加
            if (!this.audioListId[item.id]) {
              this.audioListId[item.id] = item.id;
              audioLists.push({
                rule_inst_name: item.rule_inst_name,
                eqt_id: item.eqt_id,
                priority: item.priority,
                occur_date: item.occur_date
              });
            }
          }
          
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
 
          if(this.btnList[item.eqt_id]) {
            item.isBtn = true;
          }
          this.data.push(item);
        });

        this.displayData = [...this.data];
        if (audioLists.length > 0 && this.isFirsAuto == true) {
          this.isFirsAuto = false;
          this.audioList = audioLists;
          this.isCheckData();
        } else {
          // 不是第一次循环
          for (let i = audioLists.length - 1; i >= 0; i--) {
            this.audioList.unshift(audioLists[i])
          }
        }
        this.resetFiltersData();

        this.setTime();
        let customized = this.dataService.customized.value;
  
        if(customized && customized.index) {
          
          let index = parseInt(customized.index);
          if(index<4){
            index +=3;
          }
          this.serachs(customized.id,index)
        }
       
        this.dataService.setCustomized({
          index: null,
          id:null
      })
        //this.resetFilters(0);
      }
    }, () => {
      this.loading = false;
      this.setTime();
    })
  }

  setTime() {
    this.timer = setTimeout(() => {
      this.getAlarmEqtList(this.seach_input);
    }, 5000)
  }

  ngOnInit(): void {
 
   
  }

  getBtnPermission() {
    this.tagService.getBtnPermission().then((result: any) => {
      if (result.code == 1) {
        result.list.forEach(item => {
          this.btnList[item] = item;
        });
        this.getRuleTypeItem();
      }
    })
    
  }


  addHtml(text) {
    if (this._audio) {
      document.getElementsByTagName('body')[0].removeChild(this._audio);
    }

    this._audio = document.createElement('audio');
    document.getElementsByTagName('body')[0].appendChild(this._audio);
    this._audio.addEventListener("ended", () => {
      this.isCheckData();
    });
    let innerHTML: string;
    text = text.replace(/#/, '');
    let source = '<source " src="http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=6&text=' + text + '" type="audio/mpeg">';
    let embed = '<embed  " height="0" width="0" src="http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=6&text=' + text + '">';
    innerHTML = source + embed;
    this._audio.innerHTML = innerHTML;
    this._audio.play();
  }

  

  isCheckData() {
    if (this.audioList.length > this.audioIndex) {
      //D和L的不重报

      if (this.audioList[this.audioIndex].priority == "D" || this.audioList[this.audioIndex].priority =='L') {
        //播报完的自动加1 
        this.audioIndex++;
        this.isCheckData();
      } else {
        if (this.audioList[this.audioIndex].priority != "H") {
          this.audioList[this.audioIndex].priority = "D";
        }
        this.addHtml(this.audioList[this.audioIndex].rule_inst_name);
        this.audioIndex++;
      }
    } else {
      //五秒之后再次重报
      setTimeout(() => {
        this.audioIndex = 0;
        this.isCheckData();
      }, 1000)
    }

  }

  isCheckmusic() {
    if (this.audioList.length > this.audioIndex) {
      //D和L的不重报
      if (this.audioList[this.audioIndex].priority == "D" || this.audioList[this.audioIndex].priority =='L') {
        //播报完的自动加1 
        /**h高级，L低级，M 中级*/
        this.audioIndex++;
         this.isCheckmusic();
     
      } else {
        // if (this.audioList[this.audioIndex].priority != "H") {
        //   // console.log(this.audioList[this.audioIndex].priority+","+this.audioIndex);
        //   this.audioList[this.audioIndex].priority = "D";
        //   console.log(this.audioList[this.audioIndex].priority+","+this.audioIndex);
        // }
       
        if(this.audioList[this.audioIndex].priority == "H"){
          this.MusicUrl = '<source " src="../assets/mp3/gaoMusic.mp3" type="audio/mpeg">';
          this.runmusic(this.MusicUrl);
        }else if(this.audioList[this.audioIndex].priority == "M"){
          this.MusicUrl = '<source " src="../assets/mp3/lowMusic.MP3" type="audio/mpeg">';
          this.runmusic(this.MusicUrl);
          this.audioList[this.audioIndex].priority = "D"
        }
        this.audioIndex++;
      }
    } else {
      //五秒之后再次重报
      setTimeout(() => {
        this.audioIndex = 0;
        this.isCheckmusic();
      }, 1000)
    }

  }

  runmusic(MusicUrl){
    if (this._audio) {
      document.getElementsByTagName('body')[0].removeChild(this._audio);
    }

    this._audio = document.createElement('audio');
    document.getElementsByTagName('body')[0].appendChild(this._audio);
    this._audio.addEventListener("ended", () => {
      this.isCheckmusic();
    });
    let innerHTML: string;
    this._audio.innerHTML = MusicUrl;
    this._audio.play();
  }
  
  playMusic(e){
 
    if(this.isplay == undefined){
       this._audio.pause();
       this.isCheckmusic();
       this.isplay ='false';
    }else if(this.isplay == 'false'){
      this.addHtml(this.audioList[this.audioIndex].rule_inst_name);
      this.isplay = undefined;
      
    }
    
  }
 
  checkChanges(e: boolean,data): void {
    if(data.value != '未设置行动方案'){
      this.changeTag.push(data);
    }
    
  }

  confirmed(data, $event) {
    // $event.stopPropagation();
    console.log(data);
   this.actionTexttag = '';
   this.actionData = data;
   this.isAction = true;
   this.action_jieguo = [];
   this.tagService.getActionTypes(data.rule_inst_id).then((result: any) => {
      if (result.code == 1) {
        let action_detal = result.action_detail;
        let action_Index =[];
            if(action_detal == null){
                let no_actionType = '未设置行动方案';
                this.action_jieguo.push(no_actionType);
            }else{
                  for(var i=0;i<action_detal.length;i++){
                    if(action_detal[i] == '；' || action_detal[i] == ';'){
                      let indexi = i+1;
                      action_Index.push(indexi);
                    }else{}
                  }
                  let action_detail_text =[];
                  if(action_Index.length == 0){
                    this.action_jieguo.push(action_detal);
                  }else{
                      for(var j = 0;j<action_Index.length;j++){
                        action_detail_text.push(result.action_detail.substring(';',action_Index[j]));
                      }
                      for(var d=0;d <action_detail_text.length;d++){
                          if(d>0){
                            let indexd = d-1;
                           
                             this.action_jieguo.push(action_detail_text[d].substring(action_Index[d],action_Index[indexd]));
                          }else{
                            this.action_jieguo.push(action_detail_text[d]);
                          }
                      }
                  }
            }
        }
      })
  }
  log(value: string[]): void {
    this.modetypessize = value ;
  }


  submitConfirmed() {
    if(this.modetypessize == '未设置行动方案' || this.modetypessize == undefined){
      var context = this.actionTexttag;
    }else{
      var context = this.modetypessize+this.actionTexttag;
    }
    // var ConfirmorBy = localStorage.getItem("username");
    
    this.tagService.alarmConfirmed(this.actionData.id, '1', context,this.actionData.rule_inst_id).then((result: any) => {
      console.log(result);
      if (result.code == 1) {
        this.actionData.status = 'confirmed';
        this.actionData.action = this.actionText;
        this.isAction = false;
        this.getAlarmEqtList(this.seach_input);
      }
    })
  }

  getRuleTypeItem() {
    
    this.tagService.getRuleTypeItem().then((result: any) => {
      if (result.code == 1) {
        this.listRule = result.list;
        result.list.forEach(item => {
          this.customizedList[item.rule_type_item_code] = item.rule_type_item_name;
          this.customizedNameList[item.rule_type_item_name] = item.rule_type_item_code;
        });
        this.getAlarmEqtList(this.seach_input);
      }
    })
  }

  onScroll(event): void {
    console.log(event)
    // Interpret the scroll event
    // Do stuff on inner div scroll
  }

  historicalTrend(data: any, index: any): void {
    console.log(data);
    this.trend.eqt_id = data.eqt_id;
    this.trend.rule_inst_id = data.rule_inst_id;
    if (index == "1") {
      this.trendName = data.output_value1_desc;
    } else if (index == "2") {
      this.trendName = data.output_value2_desc;
    } else if (index == "3") {
      this.trendName = data.output_value3_desc;
    }
    this.trend.index = index;
    this.isVisible = true;
    this.trendSize = "0";
    this.getTrend();
  }

  getTrend() {
    this.trendOptions.xAxis.data = [];
    this.trendOptions.series.data = [];
    this.trendOptions.series.markLine.data = [];
    this.trendIntance.setOption(this.trendOptions);
    this.tagService.getAlarmTrend(this.trend.eqt_id, this.trend.rule_inst_id, this.trendSize).then((result: any) => {
      console.log(result);
      if (result.code == 1) {
        let list = result.list.sort(function (a, b) {
          return a.occur_date - b.occur_date;
        });
        let arr = [];
        list.forEach((item, index) => {
          if (index < 10080) {
            this.trendOptions.xAxis.data.push(this.format.formatUnixtimestamp(item.occur_date));
            let value = '';
            if (this.trend.index == "1") {
              value = item.output_value1 > 0 ? item.output_value1 : item.output_value1;

            } else if (this.trend.index == "2") {
              value = item.output_value2 > 0 ? item.output_value2 : item.output_value2;

            } else if (this.trend.index == "3") {
              value = item.output_value3 > 0 ? item.output_value3 : item.output_value3
            }

            if (item.lower_limit != null) {
              this.trendOptions.series.markLine.data[0] = {
                yAxis: item.lower_limit
              }
            } else {
              this.trendOptions.series.markLine.data[0] = {
                yAxis: 0
              }
            }

            item.upper_limit != null && (this.trendOptions.series.markLine.data[1] = {
              yAxis: item.upper_limit
            });

            if (value != null && value != "null") {
              arr.push(value);
            }
            if (item.lower_limit != null && item.lower_limit != "null") {

              arr.push(item.lower_limit)
            }
            if (item.upper_limit != null && item.upper_limit != "null") {

              arr.push(item.upper_limit)
            }


            let color = "#15abff"; //默认是绿色

            if (item.lower_limit != null && Number(value) < Number(item.lower_limit)) {
              color = "#a3230a";
            }
            if (item.upper_limit != null && Number(value) > Number(item.upper_limit)) {
              color = "#a3230a";
            }
            this.trendOptions.series.data.push({
              value: value,
              itemStyle: {
                color: color
              },
            })

          }
        });
        arr.sort(function (a, b) {
          return a - b;
        });


        let max = 1;
        let min = 0;
       
      for(var i = 0; i<this.at_rule_id.list.length;i++){
        if(this.at_rule_id.list[i].rule_id==452 || this.at_rule_id.list[i].rule_id==645){
          console.log(this.at_rule_id.list.rule_id);
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

  filter(searchName: string, index: number): void {

    this.serachs(searchName, index);

    // if (searchName) {
    //   console.log("查询")
    //   this.search(searchName, index);
    // } else {
    //   console.log("重置")
    //   this.displayData = this.data;
    // }
  }
  firstLoad(searchsText) {

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

    if (!this.searchsText.status) {
      this.statusList = [
        { text: '打开', value: 'opening' },
        { text: '已确认', value: 'confirmed' }
      ];
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

    if (index != 7) {
      this.statusList = [
        { text: '打开', value: 'opening' },
        { text: '已确认', value: 'confirmed' }
      ];
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
    } else if (index == 7) {
      this.searchsText.status = searchName;
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
    if (index == 7) {
      const filterFunc = item => (
        item.status ? item.status.indexOf(searchName) !== -1 : false)
      this.data.filter(item => filterFunc(item));
      data = this.data.filter(item => filterFunc(item));
    }

    this.displayData = data;
    this.resetFilters(index);
  }

  ngOnDestroy(): void {
    this.timer && clearInterval(this.timer);
    if (this._audio) {
      this._audio.pause();
      document.getElementsByTagName('body')[0].removeChild(this._audio);
    }
  }

  gotoCover(index) {
    this.timer && clearInterval(this.timer);
    this.timer = setTimeout(() => {
      this.getAlarmEqtList(this.seach_input);
    }, 30000)
  }

  showImg(img) {
    this.avatarUrl = FILE_DOWNLOAD_RULE + "&fileName=" + img;
    this.isShowImg = true;
  }
  sort(e) {

  }
}