import { Component, OnDestroy, OnInit, Input, ViewChild ,} from '@angular/core';
import { TagService } from "./tag.service";
import { DataService } from "../DataService";
import { FILE_UPDATE_EQT, FILE_DOWNLOAD_EQT } from '../app.constants';
import { Format } from '../core/common/format.service';
import { Router , ActivatedRoute, NavigationEnd} from '@angular/router';
import { LocalStorage } from '../core/common/local.storage';

@Component({
    selector: 'overview-info',
    templateUrl: './overview-info.component.html',
    styleUrls: ['./tag.component.less', './overview-info.component.less'],
})

export class OverviewInfoComponent implements OnInit, OnDestroy {
    @Input() id: any;
    option;
    keyType;
    craftType;
    priorityType;
    showloading;
    order: any;
    priority: any;
    priorityTotal: any;
    ruleValue: any;
    optionRuleValue: any;
    optionRuleValueIntance: any;
    keyTypeIntance: any;
    priorityTypeIntance: any;
    craftTypeIntance: any;
    eqtList = [];
    avatarUrl: string;
    cdTypeList = [];
    cdTypeTitle = [];
    optionSelect = {
        keySelect: 0,
        keySelectTyle: 1,
        craftSelect: 1,
        craftSelectType: 2,
        prioritySelct: null,
        prioritySelectType: 1,
    }

    chartType = [];
    chartPType = [];
    chartTypeList: any;
    timerOrder: any;
    timePriority: any;
    timeDashboard: any;
    timeTypeNumber: any;
    category_type:string;
    constructor(
        private tagService: TagService,
        private dataService: DataService,
        private format: Format,
        private store:LocalStorage,
        private activeRoute: ActivatedRoute,
    ) {
        this.activeRoute.queryParams.subscribe(params => {
          
            this.category_type =  params['category_type']; 
        });
        this.chartType = [{
            title: '饼图',
            index: 1
        }, {
            title: '柱状图',
            index: 2
        }]

        this.chartPType = [
            {
                title: '条形图',
                index: 1
            }, {
                title: '饼图',
                index: 2
            }, {
                title: '柱状图',
                index: 3
            }
        ]

        this.showloading = true;

        this.order = {
            sap_pror: '',
            erp_matl_code: '',
            matl_name: '',
            starttime_planned: '',
            endtime_panned: '',
            prodqty_planned_pc: '',
            prodqty_planned_hl: ''
        }

        this.priority = {
            h: 0,
            l: 0,
            m: 0,
            hw: "0%",
            lw: "0%",
            mw: '0%'
        }

        this.chartTypeList = [{
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {c} ({d}%)"
            },
            series: [
                {
                    type: 'pie',
                    center: ['50%', '50%'],
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            formatter: '{b}{c} ',
                            position: 'inside'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    color: ["#4fccff", "#fec14e", "#008ee7", "#1abc9c"],
                }
            ]
        }, {
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '5%',
                top: '40',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                    },
                    type: 'category',
                    axisLabel: {
                        formatter: function (val) {
                            var strs = val.split(''); //字符串数组
                            var str = ''
                            for (var i = 0, s; s = strs[i++];) { //遍历字符串数组
                                str += s;
                                if (!(i % 3)) str += '\n'; //按需要求余
                            }
                            return str
                        },
                    }
                }
            ],
            yAxis: [
                {
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        formatter: function (value, index) {
                            if (value.toString().indexOf('.') == -1) {
                                return value;
                            }
                        }
                    },
                    splitLine: {
                        show: false,
                    },
                    name: '报警数量',
                    type: 'value'
                }
            ],
            series: [
                {
                    label: {
                        normal: {
                            show: true,
                            formatter: '{c}',
                            position: 'top'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    type: 'bar',
                    barWidth: '30',
                    data: [{}],
                }
            ]
        }];

        this.keyType = this.chartTypeList[0];
        this.craftType = this.chartTypeList[1];
        this.priorityType = this.chartTypeList[0];

        let ruleValue = {
            tooltip: {
                formatter: "{b} : {c}"
            },
            series: [
                {
                    center: ['50%', '55%'],
                    name: '',
                    splitNumber: 10,
                    type: 'gauge',
                    radius: '91%',
                    min: 0,
                    max: 100,
                    axisLine: {
                        lineStyle: {
                            color: [[0.2, '#ffffff'], [0.8, '#ffffff'], [1, '#ffffff']],
                            width: 15,
                            shadowColor: '#fff',
                            shadowBlur: 1
                        }
                    },

                    axisTick: {
                        splitNumber: 5,
                        length: 4,

                    },
                    splitLine: {
                        length: 12,
                        lineStyle: {
                            width: 1,
                            color: '#fff',
                        }
                    },
                    title: {
                        offsetCenter: [0, '85%'],
                        textStyle: {
                            fontSize: 14, color: '#000'
                        } 
                    },
                    detail: {
                        offsetCenter: [0, '65%'],
                        formatter: '{value}',
                        textStyle: {
                            fontSize: 13,
                            color: "#fff"
                        }
                    },
                    data: []
                }
            ]
        }
        this.optionRuleValue = [ruleValue, ruleValue, ruleValue, ruleValue, ruleValue, ruleValue];
        this.optionRuleValueIntance = [];
    }

    ngOnInit(): void {
        this.eqtList = this.dataService.getEqtIdList(this.id);
        this.eqtList.push(this.id);
        this.getEqtOrder();
        this.getAlarmPriorityCount();
        setTimeout(() => {
            this.getEqtNoRuleDesc();
        }, 1000)
        this.getAlarmTypeNumber();
        this.getEqtDetail();
    }

    setOrderTime() {
        this.timerOrder = setTimeout(() => {
            this.getEqtOrder();
        }, 5000)
    }

    setPrriorityTime() {
        this.timePriority = setTimeout(() => {
            this.getAlarmPriorityCount();
        }, 5000)
    }

    setDashboardTime() {
        this.timeDashboard = setTimeout(() => {
            this.getEqtNoRuleDesc();
        }, 5000)
    }

    setTypeNumberTime() {
        this.timeTypeNumber = setTimeout(() => {
            this.getAlarmTypeNumber();
        }, 5000)
    }

    onKeyTypeInit(ec): void {
        this.keyTypeIntance = ec;
    }

    onCraftTypeInit(ec): void {
        this.craftTypeIntance = ec;
    }

    onPriorityTypeInit(ec): void {
        this.priorityTypeIntance = ec;
    }

    ruleInit(ec, index): void {
        this.optionRuleValueIntance[index] = ec;
    }

    getEqtOrder(): void {
        this.tagService.getEqtOrder(this.id).then((result: any) => {
            if (result.code == 1) {
                if (result.data) {
                    this.order = result.data;
                    this.store.set("erp_matl_code",this.order.erp_matl_code);
                }
            }
            this.setOrderTime();
        }, () => {
            this.setOrderTime();
        })
    }


    getAlarmPriorityCount() {
        this.tagService.getAlarmPriorityCount(this.eqtList.join(',')).then((result: any) => {
            if (result.code == 1) {
                if (result.list.length > 0) {
                    result.list.forEach(item => {
                        if (item.priority == "H") {
                            this.priority.h = item.count;
                        }
                        if (item.priority == "M") {
                            this.priority.m = item.count;
                        }
                        if (item.priority == "L") {
                            this.priority.l = item.count;
                        }
                    });
                    this.priorityTotal = this.priority.h + this.priority.l + this.priority.m;
                    this.priority.lw = this.priority.l && this.priority.l / this.priorityTotal * 100 + "%";
                    this.priority.mw = this.priority.m && this.priority.m / this.priorityTotal * 100 + "%";
                    this.priority.hw = this.priority.h && this.priority.h / this.priorityTotal * 100 + "%";
                }
            }
            this.setPrriorityTime();
        }, () => {
            this.setPrriorityTime();
        })
    }

    getEqtNoRuleDesc() {
        var erp_matl_code =  this.store.get("erp_matl_code");
        console.log(this.id,erp_matl_code);
        this.tagService.getEqtRuleDesc(this.id,erp_matl_code).then((result: any) => {
            if (result.code == 1) {
                console.log(result);
                if (result.alarmEqtRule) {
                    this.optionRuleValue.forEach((item, index) => {
                        if (index >= result.alarmEqtRule.length) {
                            //先清空一遍，在给值
                            this.optionRuleValue[index].series[0].axisLine.lineStyle.color = [[0.2, '#ffffff'], [0.8, '#ffffff'], [1, '#ffffff']];
                            this.optionRuleValue[index].series[0].detail.textStyle.color = "#ffffff";
                            this.optionRuleValue[index].series[0].data[0] = {}
                           
                            this.optionRuleValueIntance[index] && this.optionRuleValueIntance[index].setOption(this.optionRuleValue[index]);
                        }
                    })
                   
                    result.alarmEqtRule.forEach((item, index) => {
                        console.log(item);
                        this.optionRuleValue[index].series[0].detail.textStyle.color = "#1ebb79";
                        this.optionRuleValue[index].series[0].radius = '98%';
                        if (item.dashboard_type == 1) {
                            let parameter = item.parameter.replace(/{/g, '').replace(/}/g, '');
                            let parameterList = parameter.split(',');
                            this.optionRuleValue[index].series[0].min = parameterList[2].split(':')[1];
                            this.optionRuleValue[index].series[0].max = parameterList[5].split(':')[1];
                            this.optionRuleValue[index].series[0].axisLine.lineStyle.color = [[0.2, '#1abc9c'], [0.8, '#1abc9c'],[1, '#1abc9c']];
                        } else if (item.dashboard_type == 2) {
                            let parameter = item.parameter.replace(/{/g, '').replace(/}/g, '');
                            let parameterList = parameter.split(',');
                            var left_red = (item.lower_limit-parameterList[2].split(':')[1])/(parameterList[5].split(':')[1]-parameterList[2].split(':')[1]);
                            var green = ((item.upper_limit-item.lower_limit)/(parameterList[5].split(':')[1]-parameterList[2].split(':')[1]))+left_red;
                            var right_red = ((parameterList[5].split(':')[1]-item.upper_limit)/(parameterList[5].split(':')[1]-parameterList[2].split(':')[1]))+green;
                            this.optionRuleValue[index].series[0].axisLine.lineStyle.color = [[left_red, '#e71a17'], [green, '#1abc9c'], [right_red, '#e71a17']];
                            this.optionRuleValue[index].series[0].min = parameterList[2].split(':')[1];
                            this.optionRuleValue[index].series[0].max = parameterList[5].split(':')[1];
                        }else if(item.dashboard_type == 3){
                            let parameter = item.parameter.replace(/{/g, '').replace(/}/g, '');
                            let parameterList = parameter.split(',');
                            var left_red = (item.lower_limit-parameterList[2].split(':')[1])/(parameterList[5].split(':')[1]-parameterList[2].split(':')[1]);
                            var left_yellow = ((item.left_limit-item.lower_limit)/(parameterList[5].split(':')[1]-parameterList[2].split(':')[1]))+left_red;
                            var green = ((item.right_limit-item.left_limit)/(parameterList[5].split(':')[1]-parameterList[2].split(':')[1]))+left_yellow;
                            var right_yellow = ((item.upper_limit-item.right_limit)/(parameterList[5].split(':')[1]-parameterList[2].split(':')[1]))+green;
                            var right_red = ((parameterList[5].split(':')[1]-item.upper_limit)/(parameterList[5].split(':')[1]-parameterList[2].split(':')[1]))+right_yellow;
                            this.optionRuleValue[index].series[0].axisLine.lineStyle.color = [[left_red, '#e71a17'],[left_yellow, '#fb8c00'], [green, '#1abc9c'], [right_yellow, '#fb8c00'],[right_red, '#e71a17']];
                            this.optionRuleValue[index].series[0].min = parameterList[2].split(':')[1];
                            this.optionRuleValue[index].series[0].max = parameterList[5].split(':')[1];
                        }
                        let indexFormatter = 0;
                        this.optionRuleValue[index].series[0].axisLabel = {
                            formatter: function (value) {
                                var s = '';
                                if (indexFormatter == 0) {
                                    s = value
                                }
                                if (indexFormatter == 2) {
                                    s = value
                                }
                                if (indexFormatter == 5) {
                                    s = value
                                }
                                if (indexFormatter == 8) {
                                    s = value
                                }
                                if (indexFormatter == 10) {
                                    s = value
                                }
                                indexFormatter = indexFormatter + 1;
                                return s;
                            }
                        };
                        let value = 0;
                        if (item.remark && item.remark == "percentage") {
                            item.remark = '%';
                            // if (item.formula_value && item.formula_value != "NaN") {
                            //     item.formula_value = item.formula_value * 100;
                            // }
                        }
                        if (item.formula_value && item.formula_value != "NaN") {
                            value = Math.round(item.formula_value * 1000)/ 1000  ;
                        }
                        if (item.remark && item.remark.length > 5) {
                            this.optionRuleValue[index].series[0].detail.formatter = value + '\n' + item.remark;
                        } else if (item.remark) {
                            this.optionRuleValue[index].series[0].detail.formatter = value + '' + item.remark;
                        } else {
                            this.optionRuleValue[index].series[0].detail.formatter = value;
                        }
                        if (value == 0) {
                            this.optionRuleValue[index].series[0].detail.formatter = 0;
                        }
                        if (item.rule_name.length > 10) {
                            item.rule_name = item.rule_name.replace(/\（/g, '\n').replace(/\）/g, '');
                        }
                        this.optionRuleValue[index].series[0].data[0] = { value: value, name: item.rule_name }
                        this.optionRuleValueIntance[index] && this.optionRuleValueIntance[index].setOption(this.optionRuleValue[index], true);
                    });
                }
            }
            this.setDashboardTime();
        }, () => {
            this.setDashboardTime();
        })
    }

    getAlarmTypeNumber() {
        // this.tagService.getAlarmTypeCustomized(this.eqtList.join(',')).then((result: any) => {
        //     this.keyType.series[0].data = []
        //     this.craftType.xAxis[0].data = [];
        //     this.craftType.series[0].data = []
        //     if (result.code == 1) {
        //         this.cdTypeList = result.list;
        //         this.customizedHand();
        //         //默认显示第一个和第二个
        //         this.changeKeyType();
        //         this.changeKCraftType();
        //     }
        //     this.setTypeNumberTime();
        // }, () => {
        //     this.setTypeNumberTime();
        // })

        this.tagService.getCustomizedType(this.eqtList.join(','),this.category_type).then((result: any) => {
            this.keyType.series[0].data = []
            this.craftType.xAxis[0].data = [];
            this.craftType.series[0].data = []
            //先区分类型
            let nameList= [];
            let cdTypeTitle = [];
            let indexData = 0;
            let  cdTypeList = [];
            result.list.forEach((item, index) => {
        
                if(nameList[item.customized_type_name]) {
                    //已经存在不用添加
                    cdTypeList[indexData-1].push(item);
                } else {
                    cdTypeList[indexData] = [];
                    nameList[item.customized_type_name] = item.customized_type_name;
                    cdTypeTitle.push({
                        title:item.customized_type_name,
                        index:indexData,
                    })
                    cdTypeList[indexData].push(item);
                    indexData++;
                }
            })
            this.cdTypeList  = cdTypeList;
            this.cdTypeTitle = cdTypeTitle;
            //默认显示第一个和第二个
            this.changeKeyType();
            this.changeKCraftType();
            this.setTypeNumberTime();
        }, () => {
            this.setTypeNumberTime();
        })
    }

    customizedHand() {
        //获取title
        this.cdTypeTitle = [];
        
        this.cdTypeList.forEach((item, index) => {
            let title = '';
            item.forEach(data => {
                title = data.customized_type_name;
            })
            this.cdTypeTitle.push({
                title: title,
                index: index
            })
        })
    }

    getEqtDetail() {
        this.tagService.getEqtDetail(this.id).then((result: any) => {
            if (result.code == 1) {
                result.data.image_url && (this.avatarUrl = FILE_DOWNLOAD_EQT + "&fileName=" + result.data.image_url);
            }
        })
    }

    changeKey() {
        this.timeTypeNumber && clearInterval(this.timeTypeNumber);
        this.timeTypeNumber = setTimeout(() => {
            this.setTypeNumberTime();
        }, 30000)
        setTimeout(() => {
            if (this.optionSelect.keySelectTyle == 1) {
                this.keyType.series[0].data = [];
                this.cdTypeList.length > this.optionSelect.keySelect && this.cdTypeList[this.optionSelect.keySelect].forEach(item => {
                    this.keyType.series[0].data.push(
                        { value: item.count, name: item.rule_type_item_name, index:item.customized_type_index }
                    )
                })
            } else if (this.optionSelect.keySelectTyle == 2) {
                this.keyType.xAxis[0].data = [];
                this.keyType.series[0].data = [];
                this.cdTypeList.length > this.optionSelect.keySelect && this.cdTypeList[this.optionSelect.keySelect].forEach(item => {
                    this.keyType.xAxis[0].data.push(item.rule_type_item_name);
                    this.keyType.series[0].data.push(
                        { value: item.count, name: item.rule_type_item_name, index:item.customized_type_index  }
                    )
                })
            }
            this.keyTypeIntance && this.keyTypeIntance.setOption(this.keyType);
        }, 500)
    }

    changeKeyType() {
        setTimeout(() => {
            if (this.optionSelect.keySelectTyle == 1) {
                this.keyType = this.chartTypeList[0];
                this.keyType.series[0].data = [];
            } else if (this.optionSelect.keySelectTyle == 2) {
                this.keyType = this.chartTypeList[1];
                this.keyType.xAxis[0].data = [];
                this.keyType.series[0].data = [];
            }
            this.changeKey();
            this.keyTypeIntance && this.keyTypeIntance.setOption(this.keyType);
        }, 500)
    }

    changeCraft() {
        this.timeTypeNumber && clearInterval(this.timeTypeNumber);
        this.timeTypeNumber = setTimeout(() => {
            this.setTypeNumberTime();
        }, 30000)
        setTimeout(() => {
            if (this.optionSelect.craftSelectType == 1) {
                this.craftType.series[0].data = [];
                this.cdTypeList.length > this.optionSelect.craftSelect && this.cdTypeList[this.optionSelect.craftSelect].forEach(item => {
                    this.craftType.series[0].data.push(
                        { value: item.count, name: item.rule_type_item_name, index:item.customized_type_index  }
                    )
                })
            } else if (this.optionSelect.craftSelectType == 2) {
                this.craftType.xAxis[0].data = [];
                this.craftType.series[0].data = [];
                this.cdTypeList.length > this.optionSelect.craftSelect && this.cdTypeList[this.optionSelect.craftSelect].forEach(item => {
                    this.craftType.xAxis[0].data.push(item.rule_type_item_name);
                    this.craftType.series[0].data.push(
                        { value: item.count, name: item.rule_type_item_name , index:item.customized_type_index }
                    )
                })
            }
            this.craftTypeIntance && this.craftTypeIntance.setOption(this.craftType);
        }, 500)
    }

    changeKCraftType() {
        setTimeout(() => {
            if (this.optionSelect.craftSelectType == 1) {
                this.craftType = this.chartTypeList[0];
                this.craftType.series[0].data = [];
            } else if (this.optionSelect.craftSelectType == 2) {
                this.craftType = this.chartTypeList[1];
                this.craftType.xAxis[0].data = [];
                this.craftType.series[0].data = [];
            }
            this.changeCraft();
            this.craftTypeIntance && this.craftTypeIntance.setOption(this.craftType);
        }, 500)
    }

    changePriorityType() {
        this.timePriority && clearInterval(this.timePriority);
        this.timePriority = setTimeout(() => {
            this.setPrriorityTime();
        }, 30000)

        setTimeout(() => {
            if (this.optionSelect.prioritySelectType == 2) {
                this.priorityType = this.format.extend(this.chartTypeList[0]);
                this.priorityType.series[0].data = [];
                this.priorityType.series[0].data = [{
                    name: '高优先级',
                    value: this.priority.h
                }, {
                    name: '中优先级',
                    value: this.priority.m
                }, {
                    name: '低优先级',
                    value: this.priority.l
                }]
            } else if (this.optionSelect.prioritySelectType == 3) {
                this.priorityType = this.format.extend(this.chartTypeList[1]);
                this.priorityType.xAxis[0].data = ['高优先级', '中优先级', '低优先级'];
                this.priorityType.series[0].data = [this.priority.h, this.priority.m, this.priority.l];
            }
            this.priorityTypeIntance && this.priorityTypeIntance.setOption(this.priorityType);
        }, 500)
    }

    ngOnDestroy(): void {
        this.timerOrder && clearInterval(this.timerOrder);
        this.timePriority && clearInterval(this.timePriority);
        this.timeDashboard && clearInterval(this.timeDashboard);
        this.timeTypeNumber && clearInterval(this.timeTypeNumber);
    }

    chartClick(event): void {
        console.log(event)
        let index = event.data.index;
        if(this.category_type=="pkg") {
            //包装
            if(event.data.index==1) {
                index = 1;
            } else  if(event.data.index==2) {
                index = 2;
            }

        } else if(this.category_type=='uty') {
              //动力
            if(event.data.index==3) {
                index = 1;
            }  else  if(event.data.index==1) {
                index = 2;
            }  else  if(event.data.index==2) {
                index = 3;
            } 

          
        } else if(this.category_type=="brew") {
            //酿造
            if(event.data.index==1) {
                index = 2;
            }  else  if(event.data.index==3) {
                index = 1;
            } else  if(event.data.index==4) {
                index = 2;
            }   else  if(event.data.index==5) {
                index = 2;
            } 
        }

        this.dataService.setCustomized({
            index: index,
            id: event.data.name,
        })
    }
}  