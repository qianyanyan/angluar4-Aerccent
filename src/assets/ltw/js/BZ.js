var app = angular.module('myApp1', []);
app.filter('filter1', [function() { //可以注入依赖
	return function(num) {
		if(num) {
			return Number(num).toFixed(2);
		}
	}
}])
app.controller('myCtrl1', ['$scope', '$http', function($scope, $http) {
	//tab切换
	$scope.app1Tabs1C = function() {
		$scope.app1Tabs = 1;
		window.sessionStorage.setItem("tabsNum1",'1');
		//$scope.getGLYData();
		window.history.go(0)
	}
	$scope.app1Tabs2C = function() {
		$scope.app1Tabs = 2
		window.sessionStorage.setItem("tabsNum1","2");
		$scope.getTabs2Data(1)
	}
	$scope.app1Tabs3C = function() {
		$scope.app1Tabs = 3
		window.sessionStorage.setItem("tabsNum1","3")
		$scope.getTabs3Data(1)
	}
	$scope.app1Tabs4C = function() {
		$scope.app1Tabs = 4
		window.sessionStorage.setItem("tabsNum1","4")
		$scope.getTabs3Data(1)
	}

	$scope.category =  ["请选择"];
	$scope.categoryDay = "请选择";
	$scope.categoryMonth = "请选择";


	$scope.kipType = ["按月查询","按日期查询"];
	$scope.kipSelectType = $scope.kipType[0];
	$http({
		method: 'get',
		headers: headers,
		url: ipAdress + '/report/abi/getCategory',
	}).success(function(data) {
		var list  = data.data;
		for( var i =0; i<list.length; i++) {
			$scope.category.push(list[i].category);
		}
	}).error(function(data) {
		console.error('服务器繁忙，请稍后再试！');
	});


	$scope.touchVal = function(){

		$http({
			method: 'get',
			headers: headers,
			url: ipAdress + '/basicdata/eqt/getEquipmentByUpperId',
			params: {
				"upper_eqt_id":$scope.nodeDays,
				"category_type":'pkg'
			}
		}).success(function(data) {
			$scope.shebei = data.list;
		}).error(function(data) {
			console.error('服务器繁忙，请稍后再试！');
		});
		if($scope.shebeis){
			$http({
				method:'get',
				headers: headers,
				url: ipAdress +'/basicdata/ruleInst/selectRuleInstTreeList',
				params: {
					"eqt_id":$scope.shebeis,
				}
			}).success(function(data) {
				if(data.list == null || data.list.length == 0){
					$('.tips').show(200);
					$('.modal-body').html('该设备暂无指标项');
					$scope.zhibiaos = '';
				}else{
					$scope.zhibiaos = data.list;
				}
			}).error(function(data) {
				console.error('服务器繁忙，请稍后再试！');
			});
		}

	}
	$('.modal-title').html("温馨提示");

	$scope.touchtimer = function(){
	  var startStr = $('.form_datetime').val(),endStr=$('.form_datetimes').val();
	  if($scope.nodeDays == null || $scope.zhibiao == null || $scope.shebeis == null || startStr == '' || endStr ==''){
			$('.tips').show(500);
		 var tiptishi = '';
		 var tiptishis = $scope.nodeDays == null ? '产线,' : '';
		 var tiptishiss = $scope.shebeis == null ? '设备,' : '';
		 var tiptishisss = $('.form_datetime').val() == '' ? '开始时间,' : '';
		 var tiptishissss = $('.form_datetimes').val() =='' ? '结束时间' : '';
			$('.modal-body').html(tiptishis+tiptishiss+tiptishisss+tiptishissss+'不可为空');
		}else{
			let startDate = new Date(startStr),endDate = new Date(endStr);
			let millsStart = startDate.getTime(),millEnd = endDate.getTime();
			let index = (millEnd-millsStart)/1000>(24*3600);//true 
			if(endDate < startDate || index == true){
				$('.tips').show(200);
				let timersize = endDate < startDate ? "开始时间不可以大于结束时间":"";
				let indexsize = index == true ? '开始到结束不可超过24小时': '';
				$('.modal-body').html(timersize+indexsize);
			}else{
				$http({
					method: 'get',
					headers: headers,
					url: ipAdress + '/monitor/alarm/selectRuleInstHistory',
					params: {
						"rule_inst_name":$scope.zhibiao,
						"startDate":$('.form_datetime').val(),
						"endDate":$('.form_datetimes').val(),
					}
				}).success(function(data) {
					if(data.code = 1 && data.list != null){
						if(data.list.length == 0){
							$('.tips').show(200);
							$('.modal-body').html('暂无数据');
							$scope.zhibiaosb = '';
						}else{
							$scope.zhibiaosb = data.list;
						}
					}
				}).error(function(data) {
					console.error('服务器繁忙，请稍后再试！');
				});
			}
		}
	}


	$scope.resettimer = function(){
		$scope.nodeDays = null;
		$scope.shebeis = null;
		$scope.zhibiao = null;
		$('.form_datetime').val('');
		$('.form_datetimes').val('');
	}

	/** 产线*/
	$scope.glylists = function(){
		$http({
			method: 'get',
			headers: headers,
			url: ipAdress + '/basicdata/eqt/getProductLineByType',
			params: {
				"category_type":'pkg'
			}
		}).success(function(data) {
			if(data.code = 1){
				$scope.glyVal = data.list;
			}
		}).error(function(data) {
			console.error('服务器繁忙，请稍后再试！');
		});
	}

	/** 产线*/
	$http({
		method: 'get',
		headers: headers,
		url: ipAdress + '/report/abi/getGlyName',
	}).success(function(data) {
		console.log(data);
		var list  = data.data;

		$scope.glyList = [];
		for( var i =0; i<list.length; i++) {
			$scope.glyList.push(list[i].kpi_name);
		}
		if($scope.glyList.length>0) {
			$scope.glyName = $scope.glyList[0]
		}

	}).error(function(data) {
		console.error('服务器繁忙，请稍后再试！');
	});

	$scope.nodeNameList = [{
		id:"0",
		name:"请选择"
	}];
	$scope.nodeDay = {
		id:"0",
		name:"请选择"
	}
	$scope.nodeMonth ={
		id:"0",
		name:"请选择"
	}
	$http({
		method: 'get',
		headers: headers,
		url: ipAdress + '/report/abi/getNodeName',
	}).success(function(data) {
		var list  = data.data;
		for( var i =0; i<list.length; i++) {
			$scope.nodeNameList.push({
				id:list[i].kpi_name_code,
				name:list[i].node_id
			});
		}
	}).error(function(data) {
		console.error('服务器繁忙，请稍后再试！');
	});


	$(".aapContent ul li").on("click", function() {
		$(this).css("border-bottom", "0").siblings("li").css("border-bottom", "1px solid #dcdcdc")

	})
	$(function() {
		var tabsNum1 = window.sessionStorage.getItem("tabsNum1");
		if(tabsNum1 == 1) {
			$scope.app1Tabs = 1;
			$scope.$apply();
			$(".aapContent ul li").eq(0).css("border-bottom", "0").siblings("li").css("border-bottom", "1px solid #dcdcdc")
		} else if(tabsNum1 == 2) {
			$scope.app1Tabs = 2;
			$scope.$apply();
			$scope.getTabs2Data(1)
			$(".aapContent ul li").eq(1).css("border-bottom", "0").siblings("li").css("border-bottom", "1px solid #dcdcdc")
		} else if(tabsNum1 == 3) {
			$scope.app1Tabs = 3;
			$scope.$apply();
			$scope.getTabs3Data(1)
			$(".aapContent ul li").eq(2).css("border-bottom", "0").siblings("li").css("border-bottom", "1px solid #dcdcdc")
		}
	})


	$("#startTimeKPI").datetimepicker({
		autoclose: true,
        todayBtn: true,
        startView: 'year',
        minView:'year',
        maxView:'decade',
        language:  'zh-CN',
        format: 'yyyy-mm',
		pickerPosition: "bottom-right"
	}).on('changeDate', function(ev) {
		var starttime = $("#startTimeKPI").val();
		$("#endTimeKPI").datetimepicker('setStartDate', starttime);
	});

	//结束时间的插件
	$("#endTimeKPI").datetimepicker({
		minView: "month",
		language: 'zh-CN',
		format: 'yyyy',
		autoclose: true,
		todayBtn: true,
		startView: 4,
		minView: 4,
		pickerPosition: "bottom-right"
	}).on('changeDate', function(ev) {
		var starttime = $("#startTimeKPI").val();
		var endtime = $("#endTimeQKPI").val();
		$("#startTimeKPI").datetimepicker('setEndDate', endtime);
		$("#endTimeKPI").datetimepicker('hide');
		//$scope.getGLYData()
	});


	$("#startTimeQX").datetimepicker({
		autoclose: true,
        todayBtn: true,
        startView: 'year',
        minView:'year',
        maxView:'decade',
        language:  'zh-CN',
        format: 'yyyy-mm',
		pickerPosition: "bottom-right"
	}).on('changeDate', function(ev) {
		var starttime = $("#startTimeQX").val();
		$("#endTimeQX").datetimepicker('setStartDate', starttime);
	});

	//结束时间的插件
	$("#endTimeQX").datetimepicker({
		autoclose: true,
        todayBtn: true,
        startView: 'year',
        minView:'year',
        maxView:'decade',
        language:  'zh-CN',
        format: 'yyyy-mm',
		pickerPosition: "bottom-left"
	}).on('changeDate', function(ev) {
		var starttime = $("#startTimeQX").val();
		var endtime = $("#endTimeQX").val();
		$("#startTimeQX").datetimepicker('setEndDate', endtime);
		$("#endTimeQX").datetimepicker('hide');
		//$scope.getGLYData()
	});

	//tabs2时间选择
	$("#startTimetabs2").datetimepicker({
		autoclose: true,
        todayBtn: true,
        startView: 'year',
        minView:'year',
        maxView:'decade',
        language:  'zh-CN',
        format: 'yyyy-mm',
		pickerPosition: "bottom-right"
	}).on('changeDate', function(ev) {
		var starttime = $("#startTimetabs2").val();
	});

		//tabs3时间选择
	$("#startTimetabs3").datetimepicker({
		minView: "month",
		language: 'zh-CN',
		format: 'yyyy',
		autoclose: true,
		todayBtn: true,
		startView: 4,
		minView: 4,
		pickerPosition: "bottom-right"
	}).on('changeDate', function(ev) {
		var starttime = $("#startTimetabs3").val();
	});

	//日报表查询，清除功能
	$scope.searchBtn = function() {
		$(".searchBtn").addClass("searchBtnC");
		$(".cleanBtn").removeClass("cleanBtnC");
		$scope.getTabs2Data(1);
	}
	$scope.cleanBtn = function() {
		$(".Category").val('');
		$("#startTimetabs2").val('');
		$scope.getTabs2Data(1);
	}

	//月报表查询，清除功能
	$scope.searchBtn1 = function() {
		$(".searchBtn1").addClass("searchBtnC1");
		$(".cleanBtn1").removeClass("cleanBtnC1");
		$scope.getTabs3Data(1);
	}
	$scope.cleanBtn1 = function() {
		$(".Category1").val('');
		$("#startTimetabs3").val('');
		$scope.getTabs3Data(1);
	}

	$(function() {
		//$scope.getGLYData()
	})
	$scope.getGLYData = function() {
		var nowYear = new Date().getFullYear();
		var  c_year_s;
		var  c_year_e;

		//先判断选择类型
		if($scope.kipSelectType=="按月查询") {
			c_year_s = $("#startTimeQX").val();
			c_year_e = $("#endTimeQX").val();
			if(!c_year_s) {
				c_year_s = nowYear+"-"+"01";
			}
			if(!c_year_e) {
				c_year_e = nowYear+"-"+"12";
			}
			$("#startTimeQX").val(c_year_s);
			$("#endTimeQX").val(c_year_e);
		} else {
			c_year_s = $("#startTimeKPI").val();
			c_year_e = $("#endTimeKPI").val();

			if(!c_year_s) {
				var m = new Date().getMonth()+1;
				if(m<10) {
					m ="0"+m;
				}
				c_year_s = nowYear+"-"+m;
			}

			$("#startTimeKPI").val(c_year_s);
			c_year_e = c_year_s+"-31";
			c_year_s = c_year_s+"-01";

		}


		var time = [];
		var data1 = [];
		var data2 = [];
		var data3 = [];

		$http({
			method: 'get',
			headers: headers,
			url: ipAdress + '/report/abi/GLYInfo',
			params: {
				"c_year_s": c_year_s,
				"c_year_e": c_year_e,
				"glyName": $scope.glyName,
				"kipType":$scope.kipSelectType
			}
		}).success(function(data) {
			for(var i = 0; i < data.data.length; i++) {
				if($scope.kipSelectType=="按月查询") {
					time.push(data.data[i].c_year+"-"+data.data[i].c_month);
				} else {
					time.push(data.data[i].c_day);
				}

				data1.push(data.data[i].budget);
				data2.push(data.data[i].actual);
				data3.push(data.data[i].challenge);
			}
			getChart4Data(time, data1, data2, data3);

		}).error(function(data) {
			console.error('服务器繁忙，请稍后再试！');
		});
	}

	$scope.clearGLYData = function() {
		$("#startTimeQX").val('');
		$("#endTimeQX").val('');
	}

	//日报表获取数据
	$scope.getTabs2Data = function(pageNum) {
		var category = '';
		if($scope.categoryDay!="请选择") {
			category = $scope.categoryDay;
		}
		var nodeId= '';
		if($scope.nodeDay.id!="0") {
			nodeId  = $scope.nodeDay.name;
		}

		var c_date=$("#startTimetabs2").val();
		$("#pageNum1").val(pageNum)
		if(!c_date) {
			var myDate = new Date();
			var m = myDate.getMonth()+1;
			if(m<10) {
				m ="0"+m;
			}
			c_date = myDate.getFullYear()+"-"+m;
			$("#startTimetabs2").val( myDate.getFullYear()+"-"+m);
		}
		//优先级
		$http({
			method: 'get',
			headers: headers,
			url: ipAdress + '/report/abi/dayKpiInfo',
			params: {
				"page": pageNum,
				"numPerPage": 10,
				"category":category,
				"nodeId":nodeId,
				"c_date":c_date
			}

		}).success(function(data) {
			if(data.falg="true") {
				$scope.tabs2Result = data.data;
				console.log($scope.tabs2Result);
				// console.log($scope.tabs2Result);
				// for(var i=0;i<$scope.tabs2Result.length;i++){
				// 	console.log($scope.tabs2Result[i].kpi_name+",kpi_name,"+i+$scope.tabs2Result[i].node_id);
				// }

				$("#count1").html(data.count);
				var page = data.count / 20;
				var pageNum = data.pageNum;
				var tOrf = true;
				if(pageNum > 1) {
					$(".prev1").on("click", function() {
						if(pageNum > 1 && tOrf) {
							pageNum--;
							tOrf = false;
							$("#pageNum1").val(Math.ceil(pageNum))
							$scope.getTabs2Data(Math.ceil(pageNum))
						} else {
							return
						}
					})
				} else {
					pageNum = 1
				}
				if(pageNum < page) {
					$(".next1").on("click", function() {
						if(pageNum < page && tOrf) {
							pageNum++;
							tOrf = false;
							$("#pageNum1").val(pageNum)
							$scope.getTabs2Data(pageNum)
						} else {
							return
						}

					})
				} else {
					pageNum = page
				}
				if(page < 1) {
					$("#page1").html("1")
				} else {
					$("#page1").html(Math.ceil(page))
				}

				//	输入页数搜索按钮
				$("#pageNum1").on("change input", function() {
					var inputCont = $(this).val().replace(/[^0-9]/g, "");
					if($(this).val() <= Math.ceil(page)) {
						$scope.getTabs2Data(inputCont)
						$(this).val(inputCont)
					} else {
						$("#pageNum1").on("blur", function() {
							$("#pageNum1").val("1")
						})
					}
				})
				$("#pageNum1").on("blur", function() {
					if($("#pageNum1").val() == "") {
						$("#pageNum1").val("1")
					}
				})

			}
		}).error(function(data) {
			console.error('服务器繁忙，请稍后再试！');
		});

	}

	//月报表获取数据
	$scope.getTabs3Data = function(pageNum) {
		var category = '';
		if($scope.categoryMonth!="请选择") {
			category = $scope.categoryMonth;
		}

		var nodeId= '';
		if($scope.nodeMonth.id!="0") {
			nodeId  = $scope.nodeMonth.name;
		}

		var c_date=$("#startTimetabs3").val()
		$("#pageNum2").val(pageNum)
		if(!c_date) {
			var myDate = new Date();

			c_date = myDate.getFullYear();
			$("#startTimetabs3").val( c_date);
		}

		//优先级
		$http({
			method: 'get',
			headers: headers,
			url: ipAdress + '/report/abi/monthKpiInfo',
			params: {
				"page": pageNum,
				"numPerPage": 10,
				"category":category,
				"nodeId":nodeId,
				"c_date":c_date
			}

		}).success(function(data) {
			if(data.falg="true") {
				$scope.tabs3Result = data.data
				console.log($scope.tabs3Result);
				var page = data.count / 20;
				var pageNum = data.pageNum;
				var tOrf = true;
				if(pageNum > 1) {
					$(".prev2").on("click", function() {
						if(pageNum > 1 && tOrf) {
							pageNum--;
							tOrf = false;
							$("#pageNum2").val(Math.ceil(pageNum))
							$scope.getTabs3Data(Math.ceil(pageNum))
						} else {
							return
						}
					})
				} else {
					pageNum = 1
				}
				if(pageNum < page) {
					$(".next2").on("click", function() {
						if(pageNum < page && tOrf) {
							pageNum++;
							tOrf = false;
							$("#pageNum2").val(pageNum)
							$scope.getTabs3Data(pageNum)
						} else {
							return
						}
					})
				} else {
					pageNum = page
				}
				if(page < 1) {
					$("#page2").html("1")
				} else {
					$("#page2").html(Math.ceil(page))
				}

				//	输入页数搜索按钮
				$("#pageNum2").on("change input", function() {
					var inputCont = $(this).val().replace(/[^0-9]/g, "")
					if($(this).val() <= Math.ceil(page)) {
						$scope.getTabs3Data(inputCont)
						$(this).val(inputCont)
					} else {
						$("#pageNum2").on("blur", function() {
							$("#pageNum2").val("1")
						})
					}
				})
				$("#pageNum2").on("blur", function() {
					if($("#pageNum2").val() == "") {
						$("#pageNum2").val("1")
					}
				})
			}
		}).error(function(data) {
			console.error('服务器繁忙，请稍后再试！');
		});

	}
	var myChart4;
	if (myChart4 != null && myChart4 != "" && myChart4 != undefined) {
        myChart4.dispose();
    }
	function getChart4Data(time, data1, data2, data3) {
		var myChart4 = echarts.init(document.getElementById('BZCahrt'));
		option4 = {
			title: {
				text: '莆田工厂KPI柱形图',
				textStyle: {
					fontSize: 22,
					align: 'center'
				},
				left: '44%',
			},
			tooltip: {
				formatter: '{a}: <br/>{b}: {c}'
			},
			legend: {
				icon: "roundRect",
				itemWidth: 30,
				itemHeight: 6,
				right: 30,
				top: 40,

				data: [{
						name: '预算值',
						icon: 'diamond'
					},
					{
						name: '实际值'
					},
					{
						name: '挑战值',
						icon: 'diamond'
					}
				],
				textStyle: {
					color: "#000",
					fontSize: 12,

				},
			},
			grid: {
				left: '3%',
				top: '20%',
				right: '4%',
				bottom: '10%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: time,
				axisTick: {
					alignWithLabel: true
				}
			}],
			yAxis: [{
				type: 'value',
				axisLabel: {
					show: true,
					formatter: "{value}"
				},

			}],
			series: [{
					name: '预算值',
					type: 'line',
					barWidth: '15%',
					color: "red",
					symbol: 'diamond',
					symbolSize: 8,
					data: data1
				},
				{
					name: '实际值',
					type: 'bar',
					barWidth: '15%',
					color: "yellow",
					itemStyle: {
						normal: {
							color: function(params) {
								var index = params.dataIndex;
								var colorList = [
									'yellow', 'red', 'green'
								];
								if(data2[index] < data1[index]) {
									return colorList[1]
								} else if(data2[index] > data1[index] && data2[index] < data3[index]) {
									return colorList[0]
								} else if(data2[index] > data3[index]) {
									return colorList[2]
								} else {
									return colorList[2]
								}

							},
							label: {
								show: true, //开启显示
								position: 'top', //在上方显示
								formatter: function(a) {
									var aaa = a.data;
									//										console.log()
									return aaa;
								},
								textStyle: { //数值样式
									color: 'black',
									fontSize: 10
								}
							}
						}
					},
					data: data2
				},
				{
					name: '挑战值',
					type: 'line',
					barWidth: '15%',
					color: "blue",
					symbol: 'diamond',
					symbolSize: 8,
					data: data3
				},

			]
		};
		myChart4.setOption(option4);
	}
}]);
