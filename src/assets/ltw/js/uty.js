var app = angular.module('myApp', []);
app.filter('filter1', [function() { //可以注入依赖
	return function(num) {
		if(num) {
			return Number(num).toFixed(2);
		}
	}
}])
app.controller('myCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
	$(function() {
		var tabsNum = window.sessionStorage.getItem("tabsNum");
		if(tabsNum == 1) {
			$scope.tabCode = 1
			$scope.$apply();
			$(".aapContent ul li").eq(0).css("border-bottom", "0").siblings("li").css("border-bottom", "1px solid #dcdcdc")
			//$scope.getTabs1Data(1)
		} else if(tabsNum == 2) {
			$scope.tabCode = 2
			$scope.$apply()
			$scope.getTabs2Data()
			$(".aapContent ul li").eq(1).css("border-bottom", "0").siblings("li").css("border-bottom", "1px solid #dcdcdc")
		} else if(tabsNum == 3) {
			$scope.tabCode = 3
			$scope.$apply()
		//	$scope.getTabs3Data()
			$(".aapContent ul li").eq(2).css("border-bottom", "0").siblings("li").css("border-bottom", "1px solid #dcdcdc")
		} else {
			
		}
		$("#startTime").datetimepicker({
			minView: "month",
			language: 'zh-CN',
			format: 'yyyy-mm-dd',
			autoclose: true,
			todayBtn: true,
			pickerPosition: "bottom-right"
		}).on('changeDate', function(ev) {
			var starttime = $("#startTime").val();
			$("#endTime").datetimepicker('setStartDate', starttime);
		 
		});

		//结束时间的插件 
		$("#endTime").datetimepicker({
			minView: "month",
			language: 'zh-CN',
			format: 'yyyy-mm-dd',
			autoclose: true,
			todayBtn: true,
			pickerPosition: "bottom-left"
		}).on('changeDate', function(ev) {
			var starttime = $("#startTime").val();
			var endtime = $("#endTime").val();
			$("#startTime").datetimepicker('setEndDate', endtime);
			$("#endTime").datetimepicker('hide');

		});
		$("#startTime2").datetimepicker({
			minView: "month",
			language: 'zh-CN',
			format: 'yyyy-mm-dd',
			autoclose: true,
			todayBtn: true,
			pickerPosition: "bottom-right"
		}).on('changeDate', function(ev) {
			var starttime = $("#startTime2").val();
			$("#endTime2").datetimepicker('setStartDate', starttime);

		});

		//结束时间的插件 
		$("#endTime2").datetimepicker({
			minView: "month",
			language: 'zh-CN',
			format: 'yyyy-mm-dd',
			autoclose: true,
			todayBtn: true,
			pickerPosition: "bottom-left"
		}).on('changeDate', function(ev) {
			var starttime = $("#startTime").val();
			var endtime = $("#endTime").val();
			$("#startTime2").datetimepicker('setEndDate', endtime);
			$("#endTime2").datetimepicker('hide');
		});
		$("#startTime3").datetimepicker({
			minView: "month",
			language: 'zh-CN',
			format: 'yyyy-mm-dd',
			autoclose: true,
			todayBtn: true,
			pickerPosition: "bottom-right"
		}).on('changeDate', function(ev) {
			var starttime = $("#startTime3").val();
			$("#endTime3").datetimepicker('setStartDate', starttime);

		});

		//结束时间的插件 
		$("#endTime3").datetimepicker({
			minView: "month",
			language: 'zh-CN',
			format: 'yyyy-mm-dd',
			autoclose: true,
			todayBtn: true,
			pickerPosition: "bottom-left"
		}).on('changeDate', function(ev) {
			var starttime = $("#startTime3").val();
			var endtime = $("#endTime3").val();
			$("#startTime3").datetimepicker('setEndDate', endtime);
			$("#endTime3").datetimepicker('hide');

		});

		$("#startTime4").datetimepicker({
			minView: "month",
			language: 'zh-CN',
			format: 'yyyy-mm-dd',
			autoclose: true,
			todayBtn: true,
			pickerPosition: "bottom-right"
		}).on('changeDate', function(ev) {
			var starttime = $("#startTime4").val();
			$("#endTime4").datetimepicker('setStartDate', starttime);
		});

		//结束时间的插件 
		$("#endTime4").datetimepicker({
			minView: "month",
			language: 'zh-CN',
			format: 'yyyy-mm-dd',
			autoclose: true,
			todayBtn: true,
			pickerPosition: "bottom-left"
		}).on('changeDate', function(ev) {
			var starttime = $("#startTime4").val();
			var endtime = $("#endTime4").val();
			$("#startTime4").datetimepicker('setEndDate', endtime);
			$("#endTime4").datetimepicker('hide');

		});

		$("#startTimeQX").datetimepicker({
			minView: "month",
			language: 'zh-CN',
			format: 'yyyy-mm-dd',
			autoclose: true,
			todayBtn: true,
			pickerPosition: "bottom-right"
		}).on('changeDate', function(ev) {
			var starttime = $("#startTimeQX").val();
			$("#endTimeQX").datetimepicker('setStartDate', starttime);
		});

		//结束时间的插件 
		$("#endTimeQX").datetimepicker({
			minView: "month",
			language: 'zh-CN',
			format: 'yyyy-mm-dd',
			autoclose: true,
			todayBtn: true,
			pickerPosition: "bottom-left"
		}).on('changeDate', function(ev) {
			var starttime = $("#startTimeQX").val();
			var endtime = $("#endTimeQX").val();
			$("#startTimeQX").datetimepicker('setEndDate', endtime);
			$("#endTimeQX").datetimepicker('hide');
		});
	})

	$scope.getSelectData = function() {
			//优先级下拉
			$http({
				method: 'get',
				headers: headers,
				url: ipAdress + '/report/abi/yxjList',
			}).success(function(data) {
				$scope.yxjData = data.data
				$scope.yxjData = [{"priority":"H"},{"priority":"M"},{"priority":"L"}]
	
			}).error(function(data) {
				console.error('服务器繁忙，请稍后再试！');
			});
		
			//自定义类型1选择下拉框
			$http({
				method: 'get',
				headers: headers,
				url: ipAdress + '/abi/zdyType',
				params: {
					"c_type": '3'
				}
			}).success(function(data) {
				console.log(data);
				if(data.data != "") {
					$scope.zdylx1 = data.data
				}
			}).error(function(data) {
				console.error('服务器繁忙，请稍后再试！');
			});
	
			//自定义类型2选择下拉框
			$http({
				method: 'get',
				headers: headers,
				url: ipAdress + '/report/abi/zdyType',
				params: {
					"c_type": ''
				}
			}).success(function(data) {
				if(data.data != "") {
					$scope.zdylx2 = data.data;
				}
			}).error(function(data) {
				console.error('服务器繁忙，请稍后再试！');
			});
	
			//自定义类型3选择下拉框
			$http({
				method: 'get',
				headers: headers,
				url: ipAdress + '/report/abi/zdyType',
				params: {
					"c_type": ''
				}
			}).success(function(data) {
				if(data.data != "") {
					$scope.zdylx3 = data.data
				}
			}).error(function(data) {
				console.error('服务器繁忙，请稍后再试！');
			});
	
		//获取设备列表
		$http({
			method: 'get',
			headers: headers,
			url: ipAdress + '/basicdata/eqt/getEqtTree'
		}).success(function(data) {
			$scope.typeData = data.data
		}).error(function(data) {
			console.error('服务器繁忙，请稍后再试！');
		});
	}

	$scope.getTabs1Data = function(pageNum) {
		var c_type;
		var rule_inst_name = $(".bjx").val();
		var priorit;
		if($(".btnContent1").text().replace(/^\s*|\s*$/g, "") === "---请选择---") {
			priorit = ""
		} else {
			priorit = $(".btnContent1").text()
		}
		var eqt_name = $(".WZposition").val();
		var occur_date_start = $("#startTime").val();
		var occur_date_end = $("#endTime").val();
		var confirm_date_start = $("#startTime2").val();
		var confirm_date_end = $("#endTime2").val();
		var close_date_start = $("#startTime3").val();
		var close_date_end = $("#endTime3").val();
		var zdylxVal1 = $(".btnContent2").text();
		var zdylxVal2 = $(".btnContent3").text();
		var zdylxVal3 = $(".btnContent4").text();
		var zdylxVal11;
		var zdylxVal22;
		var zdylxVal33;
		if($(".btnContent2").text().replace(/^\s*|\s*$/g, "") === "---请选择---") {
			zdylxVal11 = ""
		} else {
			for(var i = 0; i < $scope.zdylx1.length; i++) {
				if(zdylxVal1 == $scope.zdylx1[i].rule_type_item_name) {
					zdylxVal11 = $scope.zdylx1[i].rule_type_item_code
				}
			}
		 
		}
		if($(".btnContent3").text().replace(/^\s*|\s*$/g, "") === "---请选择---") {
			zdylxVal22 = ""
		} else {
			for(var i = 0; i < $scope.zdylx2.length; i++) {
				if(zdylxVal2 == $scope.zdylx2[i].rule_type_item_name) {
					zdylxVal22 = $scope.zdylx2[i].rule_type_item_code
				}
			}

		}
		if($(".btnContent4").text().replace(/^\s*|\s*$/g, "") === "---请选择---") {
			zdylxVal33 = ""
		} else {
			for(var i = 0; i < $scope.zdylx3.length; i++) {
				if(zdylxVal3 == $scope.zdylx3[i].rule_type_item_name) {
					zdylxVal33 = $scope.zdylx3[i].rule_type_item_code
				}
			}
		}

		$("#pageNum").val(pageNum);
		var categoryType =["uty"];
		$http({
			method: 'get',
			headers: headers,
			url: ipAdress + '/report/abi/AlarmStatusInfo',
			params: {
				"page": pageNum,
				"numPerPage": 10,
				"rule_inst_name": rule_inst_name,
				"priorit": priorit,
				"eqt_name": eqt_name,
				"c_type1": 'customized_type_6',
				"c_type2": 'customized_type_7',
				"c_type3": 'customized_type_8',
				'type_value1': zdylxVal11,
				'type_value2': zdylxVal22,
				'type_value3': zdylxVal33,
				"occur_date_start": occur_date_start,
				"occur_date_end": occur_date_end,
				"confirm_date_start": confirm_date_start,
				"confirm_date_end": confirm_date_end,
				"close_date_start": close_date_start,
				"close_date_end": close_date_end,
				"category":categoryType
			}
		}).success(function(data) {
			if(data != "") {
				$scope.chart2Result = data.data
				for(var i = 0; i < $scope.chart2Result.length; i++) {
					$scope.chart2Result[i].index = i+1;
					if(data.pageNum>1) {
						$scope.chart2Result[i].index  = (data.pageNum-1)*10+(i+1);
					}
					 
					$scope.i = i;
					var eqt_id = $scope.chart2Result[i].eqt_id;
					var eqt_id1;
					for(var j = 0; j < $scope.typeData.length; j++) {
						if(eqt_id == $scope.typeData[j].id) {
							eqt_id1 = $scope.typeData[j].upper_eqt_id;
						}
					}

					//第一步获取生产线	
					var eqt_id2; 
					for(var j = 0; j < $scope.typeData.length; j++) {
						if(eqt_id1 == $scope.typeData[j].id && $scope.typeData[j].eqt_type_name == "生产线") {
								
							$scope.chart2Result[i].a1 = $scope.typeData[j].eqt_name;
							eqt_id2 = $scope.typeData[j].upper_eqt_id;
						} else if(eqt_id1 == $scope.typeData[j].id && $scope.typeData[j].eqt_type_name == "子区域") {
							$scope.chart2Result[i].a2 = $scope.typeData[j].eqt_name;
							eqt_id2 = $scope.typeData[j].upper_eqt_id;
						} else if(eqt_id1 == $scope.typeData[j].id && $scope.typeData[j].eqt_type_name == "区域") {
							$scope.chart2Result[i].a3 = $scope.typeData[j].eqt_name;
							eqt_id2 = $scope.typeData[j].upper_eqt_id;
						}
					}
						 
					//第二步子区域
					var eqt_id3;
					if($scope.chart2Result[i].a3 || $scope.chart2Result[i].a2) {
						//如果a3或者a2存在
						continue;
					}
					 
					for(var j = 0; j < $scope.typeData.length; j++) {
						if(eqt_id2 == $scope.typeData[j].id && $scope.typeData[j].eqt_type_name == "生产线") {
							$scope.chart2Result[i].a2 = $scope.typeData[j].eqt_name;
							eqt_id3 = $scope.typeData[j].upper_eqt_id;
						} else if(eqt_id2 == $scope.typeData[j].id && $scope.typeData[j].eqt_type_name == "子区域") {
							$scope.chart2Result[i].a2 = $scope.typeData[j].eqt_name;
							eqt_id3 = $scope.typeData[j].upper_eqt_id;
						} else if(eqt_id2 == $scope.typeData[j].id && $scope.typeData[j].eqt_type_name == "区域") {
								$scope.chart2Result[i].a3 = $scope.typeData[j].eqt_name;
							eqt_id3 = $scope.typeData[j].upper_eqt_id;
						}
					}

					if($scope.chart2Result[i].a3) {
						continue;
					}
					//第三区域
					var eqt_id4;
					for(var j = 0; j < $scope.typeData.length; j++) {
						if(eqt_id3 == $scope.typeData[j].id && $scope.typeData[j].eqt_type_name == "生产线") {
							$scope.chart2Result[i].a3 = $scope.typeData[j].eqt_name;
							eqt_id4 = $scope.typeData[j].upper_eqt_id;
						} else if(eqt_id3 == $scope.typeData[j].id && $scope.typeData[j].eqt_type_name == "子区域") {
							$scope.chart2Result[i].a2 = $scope.typeData[j].eqt_name;
							eqt_id4  = $scope.typeData[j].upper_eqt_id;
						} else if(eqt_id3 == $scope.typeData[j].id && $scope.typeData[j].eqt_type_name == "区域") {
								$scope.chart2Result[i].a3 = $scope.typeData[j].eqt_name;
							eqt_id4 = $scope.typeData[j].upper_eqt_id;
						}
					}
						 
				}

				$("#count").html(data.count);
				var page = data.count / 20;
				var pageNum = data.pageNum;
				var tOrf = true;
				if(pageNum > 1) {
					$(".prev1").on("click", function() {
						if(pageNum > 1 && tOrf) {
							pageNum--;
							tOrf = false;
							$("#pageNum").val(Math.ceil(pageNum))
							$scope.getTabs1Data(Math.ceil(pageNum))
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
							$("#pageNum").val(pageNum)
							$scope.getTabs1Data(pageNum)
						} else {
							return
						}
					})
				} else {
					pageNum = page
				}
				if(page < 1) {
					$("#page").html("1")
				} else {
					$("#page").html(Math.ceil(page))
				}

				//	输入页数搜索按钮
				$("#pageNum").on("change input", function() {
					var inputCont = $(this).val().replace(/[^0-9]/g, "")
					if($(this).val() <= Math.ceil(page)) {
						$scope.getTabs1Data(inputCont)
						$(this).val(inputCont)
					} else {
						$("#pageNum").on("blur", function() {
							$("#pageNum").val("1")
						})
					}
				})
				$("#pageNum").on("blur", function() {
					if($("#pageNum").val() == "") {
						$("#pageNum").val("1")
					}
				})
			}
		}).error(function(data) {
			console.error('服务器繁忙，请稍后再试！');
		});
	}
	
	$scope.getTabs2Data = function() {
		var startTimeTabs2 = $("#startTime4").val();
		var endTimeTabs2 = $("#endTime4").val();
		//优先级
		$http({
			method: 'get',
			headers: headers,
			url: ipAdress + '/report/abi/PriorityCircle',
			"params": {
				"occur_date_start": startTimeTabs2,
				"occur_date_end": endTimeTabs2,
				"category":"uty"
			}
		}).success(function(data) {
			var data = data.list
			var tabs2Chart2Data = []
			var tabs2Chart2DataName = []
			for(var i = 0; i < data.length; i++) {
				tabs2Chart2Data.push(data[i].num);
				tabs2Chart2DataName.push(data[i].priority);
			}
			$scope.getChart2Data(tabs2Chart2Data, tabs2Chart2DataName);
		}).error(function(data) {
			console.error('服务器繁忙，请稍后再试！');
		});

		//位置列表

		$http({
			method: 'get',
			headers: headers,
			url: ipAdress + '/report/abi/equipList'

		}).success(function(data) {
			$scope.Plist = data.data

		}).error(function(data) {
			console.error('服务器繁忙，请稍后再试！');
		});

		//位置选择
		$scope.typeP = function(id) {
			var equip;
			if($(".btnContentP").text().replace(/^\s*|\s*$/g, "") == "---请选择---") {
				equip = ""
			} else {
				equip = id
			}
			$http({
				method: 'get',
				headers: headers,
				url: ipAdress + '/report/abi/EquipCircle',
				params: {
					"occur_date_start": startTimeTabs2,
					"occur_date_end": endTimeTabs2,
					"equip": equip,
					"category":"uty"
				}
			}).success(function(data) {
				var legendData = [];
				var positionName = $(".btnContentP").text();
				var pY = []
				if(data.list) {
					if(data.list.length > 0) {
						for(var i = 0; i < data.list.length; i++) {
							pY.push(data.list[i].num);
							legendData.push(data.list[i].eqt_name)
						}
						if(data.list.length <= 6 && data.list.length > 0) {
							getChart3Data1(legendData, positionName, pY)
						} else if(data.list.length > 6) {
							getChart3Data(legendData, positionName, pY)
						}
					}
				} else {
					getChart3Data(legendData, positionName, pY)
				}
			}).error(function(data) {
				console.error('服务器繁忙，请稍后再试！');
			});
		}

		//自定义类型选择
		$scope.typeF = function() {
			var c_type;
			switch($(".btnContentT").text().replace(/^\s*|\s*$/g, "")) {
				case "---请选择---":
					c_type = ''
					break;
				case "自定义类型1":
					c_type = 'customized_type_1'
					break;
				case "自定义类型2":
					c_type = 'customized_type_2'
					break;
				case "自定义类型3":
					c_type = 'customized_type_3'
					break;
				default:
					break;
			}
			$http({
				method: 'get',
				headers: headers,
				url: ipAdress + '/report/abi/TypeCircle',
				params: {
					"occur_date_start": startTimeTabs2,
					"occur_date_end": endTimeTabs2,
					"c_type": c_type,
					"category":"uty"

				}
			}).success(function(data) {
				if(data.flag == "true") {
					var typeX = [];
					var typeY = [];
					if(data.list != '') {
						for(var i = 0; i < data.list.length; i++) {
							if(data.list[i].c_type == "empty") {
								data.list.splice(i, 1)
							}
							if(data.list != "") {
								typeX.push(data.list[i].c_type);
								typeY.push(data.list[i].num);

							}

						}
						getChart4Data(typeX, typeY)
					} else {
						getChart4Data(typeX, typeY)
					}

				}
			}).error(function(data) {
				console.error('服务器繁忙，请稍后再试！');
			});
		}
	}


	// $scope.touchshebei = function(){
	// 	$('.touchlist_shebei').show();
	// 	$http({
	// 		method: 'get',
	// 		url: ipAdress + '/abi/equipList'
	// 	}).success(function(data) {
	// 		$scope.Plistnum = data.data;
	// 		console.log($scope.Plistnum);
	// 	}).error(function(data) {
	// 		console.error('服务器繁忙，请稍后再试！');
	// 	});
	// }

	// $scope.touchListnum_shebei = function(num){
	// 	$('.WZposition').val(num);
	// 	$('.touchlist_shebei').hide();
	// }

	$scope.getTabs3Data = function(pageNum) {
		$scope.occur_date_start = $("#startTimeQX").val();
		$scope.occur_date_end = $("#endTimeQX").val();
		//优先级
		$http({
			method: 'get',
			headers: headers,
			url: ipAdress + '/report/abi/singleRuleLine',
			params: {
				"page": pageNum,
				"numPerPage": 20,
				'occur_date_start': $scope.occur_date_start,
				"occur_date_end": $scope.occur_date_end,
				"category":"uty"
			}
		}).success(function(data) {
			if(data != "") {
				var list =  data.data;
					for(var i = 0; i < list.length; i++) {

						list[i].index = i+1;
					 
						if(data.pageNum>1) {
						
							list[i].index = (data.pageNum-1)*20+(i+1);
						}
						console.log(list[i].index)
					}
					$scope.chart3Result =list;

				$("#count2").html(data.count);
				var page = data.count / 20;
				//				var page = 5;
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

		//	单个历史报警曲线折线图点击后最后一个子页面
		$scope.gettabs3TableData = function(pageNum, hour, id, count) {
			$http({
				method: 'get',
				headers: headers,
				url: ipAdress + '/report/abi/singleInfo',
				params: {
					"rule_inst_id": id,
					"hour": hour,
					"page": pageNum,
					"numPerPage": 20,
					'occur_date_start': $scope.occur_date_start,
					"occur_date_end": $scope.occur_date_end,
					"category":"uty"
				}
			}).success(function(data) {
				if(data != "") {
					var list =  data.data;
					for(var i = 0; i < list.length; i++) {
						list[i].index = i+1;
						if(data.pageNum>1) {
							list[i].index  = (data.pageNum-1)*20+(i+1);
						}
					}
					console.log(data);
					$scope.tabs3Table3Data =list;
					
					$("#count3").html(count);
					var page = count / 20;
					var pageNum = data.pageNum;
					var tOrf = true;
					if(pageNum > 1) {
						$(".prev3").on("click", function() {
							if(pageNum > 1 && tOrf) {
								pageNum--;
								tOrf = false;
								$("#pageNum3").val(Math.ceil(pageNum));
								$scope.gettabs3TableData(Math.ceil(pageNum), hour, id, count);
							} else {
								return
							}
						})
					} else {
						pageNum = 1
					}
					if(pageNum < page) {
						$(".next3").on("click", function() {
							console.log(pageNum +","+ page+","+tOrf);
							if(pageNum < page && tOrf) {
								pageNum++;
								tOrf = false;
								$("#pageNum3").val(pageNum)
								$scope.gettabs3TableData(pageNum, hour, id, count)
							} else {
								return
							}
						})
					} else {
						pageNum = page
					}
					if(page < 1) {
						$("#page3").html("1")
					} else {
						$("#page3").html(Math.ceil(page))
					}

					//	输入页数搜索按钮
					$("#pageNum3").on("change input", function() {
						var inputCont = $(this).val().replace(/[^0-9]/g, "")

						if($(this).val() <= Math.ceil(page)) {
							$scope.gettabs3TableData(inputCont, hour, id, count)
							$(this).val(inputCont)
						} else {
							$("#pageNum3").on("blur", function() {
								$("#pageNum3").val("1")
							})
						}
					})
					$("#pageNum3").on("blur", function() {
						if($("#pageNum3").val() == "") {
							$("#pageNum3").val("1")
						}
					})
				}
			}).error(function(data) {
				console.error('服务器繁忙，请稍后再试！');
			});
		}

	}
	//单个历史报警曲线折线图
	$scope.getTabs3ChartData = function(id) {
		//优先级
		$http({
			method: 'get',
			headers: headers,
			url: ipAdress + '/report/abi/singleLineInfo',
			params: {
				"rule_inst_id": id,
				'occur_date_start': $scope.occur_date_start,
				"occur_date_end": $scope.occur_date_end,
				"category":"uty"
			}

		}).success(function(data) {
			console.log(data);
			if(data != "") {
				var tabs3X = [];
				var tabs3Y = [];
				var tabsTime = [];
				for(var i = 0; i < data.list.length; i++) {
					tabs3X.push(data.list[i].c_time);
					tabs3Y.push(data.list[i].num);
					tabsTime.push(data.list[i].c_time);

				}
				$scope.getTabs3Chart1(tabs3X, tabs3Y, id,tabsTime);
			}
		}).error(function(data) {
			console.error('服务器繁忙，请稍后再试！');
		});

	}

	$scope.tabs1C = function() {
		$scope.tabCode = 1;
		window.sessionStorage.setItem("tabsNum", $scope.tabCode);
 		//$scope.getTabs1Data(1)
	}

	$scope.tabs2C = function() {
		$scope.tabCode = 2;
		$scope.getTabs2Data()
		window.sessionStorage.setItem("tabsNum", $scope.tabCode);
	}

	$scope.tabs3C = function() {
		$scope.tabCode = 3;
		//$scope.getTabs3Data(1)
		window.sessionStorage.setItem("tabsNum", $scope.tabCode);
	}
	
	$(".aapContent ul li").on("click", function() {
		$(this).css("border-bottom", "0").siblings("li").css("border-bottom", "1px solid #dcdcdc")
	})
	$scope.chooseContent = function($event) {
		$(".btnContent").text($event.target.innerHTML)
	}
	$scope.chooseContent1 = function($event) {
		$(".btnContent1").text($event.target.innerHTML)
	}
	$scope.chooseContent2 = function($event) {
		$(".btnContent2").text($event.target.innerHTML)
	}
	$scope.chooseContent3 = function($event) {
		$(".btnContent3").text($event.target.innerHTML)
	}
	$scope.chooseContent4 = function($event) {
		$(".btnContent4").text($event.target.innerHTML)
	}
	$scope.chooseContent5 = function($event) {
		$(".btnContent5").text($event.target.innerHTML)
		if($event.target.innerHTML == "优先级") {
			$scope.getTabs2Data()
			$("#main1").css("display", "block")
			$("#main2").css("display", "none")
			$("#main3").css("display", "none")
			$("#btnContentP").css("display", "none");
			$("#btnContentT").css("display", "none");
			$(".btnContentP").text("---请选择---")
			$(".btnContentT").text("---请选择---");
		} else if($event.target.innerHTML == "位置") {
			$scope.getTabs2Data()
			$("#main1").css("display", "none")
			$("#main3").css("display", "block")
			$("#main2").css("display", "none")
			$("#btnContentP").css("display", "block");
			$("#btnContentT").css("display", "none");
			$(".btnContentT").text("---请选择---");
		} else if($event.target.innerHTML == "自定义类型") {
			$scope.getTabs2Data()
			$("#main1").css("display", "none")
			$("#main3").css("display", "none")
			$("#main2").css("display", "block")
			$("#btnContentP").css("display", "none");
			$("#btnContentT").css("display", "block")
			$(".btnContentP").text("---请选择---")
		}
	}

	$scope.chooseContentT = function($event) {
		$(".btnContentT").text($event.target.innerHTML)
	}

	$scope.chooseContentP = function($event, id) {
		$(".btnContentP").text($event.target.innerHTML)
		$scope.chooseContentPID = id
	}

	var myChart2;
	var myChart3;
	var myChart4;
	if(myChart2 != null && myChart != "" && myChart != undefined) {
		myChart2.dispose();
	}

	$scope.getChart2Data = function(data1, data2) {
		$("#main1").height($(".tabs2").height() - 80).width($(".tabs2").width())
		var myChart2 = echarts.init(document.getElementById('main1'), 'purple-passion');
		option2 = {
			legend: {
				orient: 'horizontal',
				icon: "Rect",
				itemWidth: 16,
				itemHeight: 16,
				itemGap: 3,
				right: '45%',
				bottom: 8,
				//			orient: "vertical",
				data: data2,
				textStyle: {
					//				color: "#fff",
					fontSize: 16
				},
			},
			grid: {
				left: '20%',
				//			top: '10%',
				bottom: '20%',
				right: '0%'
			},

			color: ["#4fcbfe", "#fdc051", "#3498d9"],
			series: [{
					name: '各项支出',
					type: 'pie',
					radius: ['0%', "55%"],
					center: ['50%', '50%'],
					legendHoverLink: false,
					hoverAnimation: false,
					data: [{
							value: data1[0],
							name: data2[0]
						},

						{
							value: data1[1],
							name: data2[1]
						},
						{
							value: data1[2],
							name: data2[2]
						}
					],
					label: {
						position: "center",
						normal: {
							// formatter: '{a|{a}}{abg|}\n{hr|}\n {b|{b}：}{c} {per|{d}%} ',
							formatter: '{per|{d}%}\n{a|{b}}\n{hr|}',
							rich: {
								a: {

									fontSize: 11,
									lineHeight: 20,
									align: 'center'
								},
								hr: {
									width: '100%',
									height: 0,
									alien: 'center',
									fontSize: 12,
								},
								per: {
									color: '#000',
									align: 'center',
									fontSize: 12,
								}
							}
						},
					},
					labelLine: {
						length: 4,
						length2: 6
					},
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						},
					}
				}

			]
		}
		myChart2.setOption(option2);
	}

	if(myChart3 != null && myChart != "" && myChart != undefined) {
		myChart3.dispose();
	}

	function getChart3Data(legendData, positionName, pY) {
		$("#main3").height($(".tabs2").height() - 80).width($(".tabs2").width())
		var myChart3 = echarts.init(document.getElementById('main3'), 'purple-passion');
		option3 = {
			color: ["#4472c4", "#4fcbfe", "#a5a5a5", "#fdc051", "#5b9bd5"],
			dataZoom: [{
				show: true, //dataZoom，框选区域缩放，自动与存在的dataZoom控件同步，分别是启用，缩放后退
				// start: 0,
				// end: 30
			}],
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '20%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: legendData,
				axisTick: {
					alignWithLabel: true
				},
				"axisLabel": {
					show: true
				}
			}],

			yAxis: [{
				type: 'value'
			}],

			series: [{
				name: 'num',
				type: 'bar',
				barWidth: 8,
				data: pY
			}]
		};
		myChart3.setOption(option3);
	}
	if(myChart3 != null && myChart != "" && myChart != undefined) {
		myChart3.dispose();
	}

	function getChart3Data1(legendData, positionName, pY) {
		$("#main3").height($(".tabs2").height() - 80).width($(".tabs2").width())
		var myChart31 = echarts.init(document.getElementById('main3'), 'purple-passion');
		option4 = {
			color: ["#4472c4", "#4fcbfe", "#a5a5a5", "#fdc051", "#5b9bd5"],
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '20%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: legendData,
				axisTick: {
					alignWithLabel: true
				},
				"axisLabel": {
					show: false
				}
			}],
			yAxis: [{
				type: 'value'
			}],
			series: [{
				name: 'num',
				type: 'bar',
				barWidth: 10,
				data: pY
			}]
		};
		myChart31.setOption(option4);
	}

	//	getChart4Data()
	if(myChart4 != null && myChart != "" && myChart != undefined) {
		myChart4.dispose();
	}

	function getChart4Data(typeX, typeY) {
		$("#main2").height($(".tabs2").height() - 80).width($(".tabs2").width())
		var myChart4 = echarts.init(document.getElementById('main2'), 'purple-passion');
		option4 = {
			color: ['#3498d9'],
			grid: {
				left: '3%',
				right: '4%',
				top: "30%",
				bottom: '15%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: typeX,
				axisTick: {
					alignWithLabel: true
				}
			}],
			yAxis: [{
				type: 'value'
			}],
			series: [{
				name: 'aaa',
				type: 'bar',
				barWidth: '10%',
				data: typeY
			}]
		};
		myChart4.setOption(option4);
	}
	//页面一查询，清除功能
	$scope.searchBtn = function() {
		$(".searchBtn").addClass("searchBtnC")
		$(".cleanBtn").removeClass("cleanBtnC")
		$scope.getTabs1Data(1)
	}
	$scope.cleanBtn = function() {
		$(".searchBtn").removeClass("searchBtnC")
		$(".cleanBtn").addClass("cleanBtnC")
		$(".bjx").val("");
		$(".btnContent1").text("---请选择---")
		$(".WZposition").val("");
		$(".btnContentT").text("---请选择---")
		$("#startTime").val("");
		$("#endTime").val("");
		$("#startTime2").val("");
		$("#endTime2").val("");
		$("#startTime3").val("");
		$("#endTime3").val("");
		$(".btnContent2").text("---请选择---")
		$(".btnContent3").text("---请选择---")
		$(".btnContent4").text("---请选择---")
		$scope.getTabs1Data(1)
	}
	//页面二查询，清除功能
	$scope.searchBtn1 = function(id) {
		$(".searchBtn1").addClass("searchBtnC1")
		$(".cleanBtn1").removeClass("cleanBtnC1");
		$scope.getTabs2Data();
		$scope.typeF();
		$scope.typeP($scope.chooseContentPID)
	}
	$scope.cleanBtn1 = function() {
		$(".searchBtn1").removeClass("searchBtnC1")
		$(".cleanBtn1").addClass("cleanBtnC1");
		$(".btnContent5").text("---请选择---");
		$("#main1").css("display", "block")
		$("#main2").css("display", "none")
		$("#main3").css("display", "none")
		$("#btnContentP").css("display", "none");
		$("#btnContentT").css("display", "none");
		$(".btnContentP").text("---请选择---")
		$(".btnContentT").text("---请选择---");;
		$("#startTime4").val("");
		$("#endTime4").val("")
		$scope.getTabs2Data();
	}

	//页面三查询，清除功能
	$scope.searchBtn3 = function() {
		$(".searchBtn3").addClass("searchBtnC3")
		$(".cleanBtn3").removeClass("cleanBtnC3");
		$scope.getTabs3Data(1)
	}
	$scope.cleanBtn3 = function() {
		$(".searchBtn3").removeClass("searchBtnC3")
		$(".cleanBtn3").addClass("cleanBtnC3");
		$("#startTimeQX").val("");
		$("#endTimeQX").val("");
		$scope.getTabs3Data(1)
	}

	$scope.showTab3Chart = function($event, BJXPosition) {
		$scope.getTabs3ChartData(BJXPosition);
		$(".tabs3Chart").show();
		$(".closeM").on("click", function() {
			$(".tabs3Chart").hide()
		})
	}

	var tabs3Chart1;

	$scope.getTabs3Chart1 = function(tabs3X, tabs3Y, id,tabsTime) {
		if(tabs3Chart1!= null && tabs3Chart1 != "" && tabs3Chart1!=undefined) {
			tabs3Chart1.dispose();
		}
		tabs3Chart1 = echarts.init(document.getElementById("tabs3Chart1"));
		option = {
			color: ["#3498d9"],
			xAxis: {
				type: 'category',
				name: "时间(小时)",
				nameTextStyle: {
					color: "#000",
					fontSize: 12
				},
				axisLabel:{
				},
				axisTick: {
					show: false
				},
				data: tabs3X
			},
			grid: {
				left: '7%',
				top: '10%',
				bottom: '15%',
				right: '9%'
			},
			yAxis: {
				type: 'value',
				name: "(次数)",
				minInterval: 1,
				nameTextStyle: {
					color: "#000",
					fontSize: 18
				},
				axisLine: {
					//			show: false,

				},
				axisTick: {
					show: false
				},
				axisLabel: {
					show: true,
					color: "#000",
					fontSize: 12,
					margin: 10,
					 
				},
				splitLine: {
					show: false,

					lineStyle: {
						type: "dotted",
						width: 2,
						color: ["red"]
					}
				}
			},
			series: [{
				data: tabs3Y,
				type: 'line',
				markLine: {
					silent: true,
					data: [{
						yAxis: 3
					}],
					lineStyle: {
						color: "red"
					}
				}
			}]
		};
		tabs3Chart1.setOption(option)
	 
		tabs3Chart1.on('click', function(handler, context) {
			$scope.gettabs3TableData(1,  tabsTime[handler.dataIndex], id, handler.data )
			$(".tabs3Table").show();
			$('#pageNum3').val("1");
			$(".closeT").on("click", function() {
				$(".tabs3Table").hide()
			})
		});
	}
	$scope.getSelectData();
}]);