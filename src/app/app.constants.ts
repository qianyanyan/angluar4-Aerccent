//系统ajax请求地址

// let ipAdress ='http://172.29.38.140:2809'; //叶冬服务172.29.36.150
let ipAdress = window.location.protocol+"//"+window.location.host;
if(ipAdress.indexOf('localhost') >=1) {
       //ipAdress = 'http://172.31.193.126:2809';
      // ipAdress = 'http://localhost:2809';
      // ipAdress = 'http://172.31.193.127:2809';
    ipAdress = 'http://localhost:2818';
      // ipAdress = 'http:/172.29.34.39:2809';  //叶东服务
    //   ipAdress = 'http://172.29.39.235:2810';
}
  ipAdress = "http://172.31.193.126:2818";
// const wuhanIpAddress = 'http://172.31.193.128:8030/api/v1.0/';
//const wuhanIpAddress = 'http://172.31.193.126:9110/api/v1.0/';   //测试环境
const wuhanIpAddress = 'http://172.31.193.126:2818/wuhanmanager/api/v1.0/';   //测试环境
    // const wuhanIpAddress = 'http://172.31.193.151:9110/api/v1.0/';
// const wuhanIpAddress = 'http://172.29.39.63:9120/api/v1.0/';
// const wuhanIpAddress = 'http://172.29.38.234:8080/api/v1.0/';
// const wuhanIpAddress = 'http://172.31.193.127:2809/api/v1.0/';

// const wuhanIpAddress = 'http://172.31.193.126:9110/api/v1.0/';

// const wuhanIpAddress = 'http://172.31.193.126:9110/api/v1.0/';


//tab1导出
export const exportAddressOrder = wuhanIpAddress + 'eqlReportApi/exportOrderExcelMultiple';
//tab2导出
export const exportOperation = wuhanIpAddress + 'eqlReportApi/exportOperationExcelMultiple';
//tab3导出
export const exportOperationParam = wuhanIpAddress + 'eqlReportApi/exportOperationParamMultiple';
//tab2 浸出物明细导出 
export const exportOperationMX = wuhanIpAddress + 'eqlReportApi/exportGiGrDetailMultiple';
//总图数据
export const WH_ZT_SERVICE = wuhanIpAddress + 'eqlReportApi/plantTree';
//获取总图默认工厂id
export const WH_ZT_FACTORYID = wuhanIpAddress + 'eqlReportApi/getPlantByPlantCode';
//总图数据接口
export const WH_ALL_SERVICE = wuhanIpAddress + 'eqlReportApi/eqlDataAnalysis';
//总图订单类型接口
export const WH_SN_SERVICE = wuhanIpAddress + 'eqlReportApi/selectShortName';

//详情图树状结构
export const WH_XFQY_SERVICE = wuhanIpAddress + 'eqlReportApi/equipmentTree';
//根据细分区域名称和工厂编号查询细分区域Id gotoExtractDetail
export const WH_GETXFQYID_SERVICE = wuhanIpAddress + 'eqlReportApi/gotoExtractDetail';
//详情图头部明细
export const WH_TBMX_SERVICE = wuhanIpAddress + 'eqlReportApi/selectExtractLossRatioSum';
//详情图tab订单
export const WH_DD_SERVICE = wuhanIpAddress + 'eqlReportApi/selectOrderExtractLossDetail';



//详情图tab订单
export const WH_DD_ORDER_NUMBER_SERVICE = wuhanIpAddress + 'eqlReportApi/getOrderList';
//详情图tab工序
export const WH_GX_SERVICE = wuhanIpAddress + 'eqlReportApi/selectOperationExtractLossDetail';
//详情图tab工艺参数
export const WH_GYCS_SERVICE = wuhanIpAddress + 'eqlReportApi/selectOperationParamExtractLossDetail';
//详情图下载excel
export const WH_XQEXCEL_SERVICE = wuhanIpAddress + 'eqlReportApi/exportOrderExcel';

export const WH_DD_MULTI_SERVICE = wuhanIpAddress + 'eqlReportApi/selectOrderExtractLossDetailByMultiple';
//详情图tab工序
export const WH_GX_MULTI_SERVICE = wuhanIpAddress + 'eqlReportApi/selectOperationExtractLossDetailByMultiple';
//详情图tab工艺参数
export const WH_GYCS_MULTI_SERVICE = wuhanIpAddress + 'eqlReportApi/selectOperationParamExtractLossDetailByMultiple';

//
export const ORDER_LIST_SERVICE = wuhanIpAddress + 'shopOrderApi/selectOrderList';

export const SHOP_ORDER_API = wuhanIpAddress + 'shopOrderApi';

//export const URL_NAME =ipAdress+'/api/v1.0';
export const URL_NAME = ipAdress;
export const URL_NAME_YD = "http://172.29.34.70:2815";

export const SHOP_YEAR = URL_NAME+'/shopOrderType'; 
export const ORDER_TYPESERVICE = SHOP_YEAR+'/getShopOrderTypeList';
export const ORDER_UPDATETYPESERVICE = SHOP_YEAR+'/updateShopOrderType';
export const ORDER_DELETE = SHOP_YEAR+'/deleteShopOrderType';
export const ORDER_AddSERVICE = SHOP_YEAR+'/addShopOrderType';


export const PLANT_YEAR = URL_NAME+'/Plant'; 
export const STATUS_YEAR = URL_NAME+'/status';  
export const PLANT_GETLIST = PLANT_YEAR+'/getPlantByList'; 
export const PLANT_ADDLIST = PLANT_YEAR+'/addPlant';
export const PLANT_UPDATELIST = PLANT_YEAR+'/updatePlant';
export const PLANT_DELETELIST = PLANT_YEAR+'/deletePlant';

export const STATUS_GETLIST = STATUS_YEAR+'/getStatusList';
export const STATUS_ADDLIST = STATUS_YEAR+'/addStatus';
export const TIMER_YEAR = URL_NAME+'/abi/singleLineInfoDay';                        //报警曲线多天
export const USER_INFO_SERVICE = URL_NAME+'/userInfo';                              //用户服务
export const EQT_SERVICE = URL_NAME +'/basicdata/eqt';                                         //设备服务
export const ALARM = URL_NAME +'/monitor/alarm';                                             //设备服务
export const ROLE_SERVICE = URL_NAME +'/security/role';                                       //角色服务
export const MODULE_SERVICE = URL_NAME +'/security/module';                                   //模块服务
export const DEPT_SERVICE = URL_NAME +'/security/dept';                                       //部门服务
export const EMP_SERVICE = URL_NAME +'/security/emp';                                         //员工服务
export const USER_SERVICE = URL_NAME +'/security/user';                                       //员工服务
export const PRO_PLAN_SERVICE = URL_NAME +'/order/productionPlan';                         //产计划服务
export const PRO_CURRENT_SERVICE = URL_NAME +'/order/productionCurrentInfo';               //当前生产信息服务
export const MATL_SERVICE = URL_NAME +'/basicdata/matl';                                       //物料服务
export const UNIT_SERVICE = URL_NAME +'/basicdata/unit';                                       //单位服务
export const EQT_TYPE_SERVICE = URL_NAME +'/basicdata/eqtType';                                //设备类型服务
export const PROP_SERVICE = URL_NAME +'/basicdata/prop';                                       //属性服务
export const PROP_INST_SERVICE = URL_NAME +'/basicdata/propInst';                              //属性实例服务
export const BRAND_SERVICE = URL_NAME +'/basicdata/brand';                                       //品牌服务
export const MATL_PLANT_SERVICE = URL_NAME +'/basicdata/matlPlant';                            //物料工厂服务
export const MATL_OTHER_SERVICE = URL_NAME +'/basicdata/matlOther';                            //物料其他服务
export const UPLOAD_FILE_SERVICE = URL_NAME +'/basicdata/uploadFile';                          //文件上传服务
export const RULE_SERVICE = URL_NAME +'/basicdata/rule';                                       //规则服务
export const RULE_INST_SERVICE = URL_NAME +'/basicdata/ruleInst';                              //规则实例服务
export const CUSTOMIZED_TYPE_SERVICE = URL_NAME +'/basicdata/customizedType';                  //自定义类型服务
export const RULE_TYPE_ITEM_SERVICE = URL_NAME +'/basicdata/ruleTypeItem';                  //规则自定义类型
export const KPI_SERVICE = URL_NAME +'/basicdata/KPI';                                         //KPI指标
export const SHIFT_SERVICE = URL_NAME +'/basicdata/ShiftCategory';                             //班次配置
export const OPERATION_SERVICE = URL_NAME +'/basicdata/Operation';                             //工序配置
export const ORG_STRUCTURE_SERVICE = URL_NAME + '/basicdata/orgStructure';                  //组织结构
export const RESOURCE_SERVICE = URL_NAME +'/basicdata/Resource';                             //资源配置
export const PLANT_SERVICE = URL_NAME +'/basicdata/Plant';                                  //工厂
export const WORK_SERVICE = URL_NAME +'/basicdata/WorkCenterDesc';                          //工作重心
export const WORKCENTER_SERVICE = URL_NAME +'/basicdata/WorkCenter';                       //工作中心
export const DEPLOYS = URL_NAME +'/basicdata/router'; 
export const ROUTERSTEP = URL_NAME +'/basicdata/routerStep';                                      //工艺步骤
export const ROUTERNEXTSTEP = URL_NAME +'/basicdata/RouterNextStep';                                  //工艺顺序
export const GETGY = URL_NAME +'/basicdata/Plant';
export const RESOURCEGROUP_SERVICE = URL_NAME +'/basicdata/ResourceGroup';                  //资源组配置
export const RESOURCEGROUPASSIGNMENT_SERVICE = URL_NAME +'/basicdata/ResourceGroupAssignment';     //资源组分配
export const BOM_SERVICE = URL_NAME +'/basicdata/Bom';                                      //Bom配置
export const MALT_SERVICE = URL_NAME +'/basicdata/matl';                                //malt_description
export const SETUPMATRIX = URL_NAME +'/basicdata/setupMatrix'; 
export const BOM_C_SERVICE = URL_NAME +'/basicdata/BomComponent';                          //Bom组件
export const BOMID_SERVICE = URL_NAME +'/basicdata/Bom';                                   //Bom id
export const UNITCONVERTION = URL_NAME +'/basicdata/UnitConvertion';
export const VALUEDESC = URL_NAME +'/basicdata/ValueDescMap';
export const MAPPINGREC = URL_NAME +'/basicdata/MappingRecipeMatlCode';
export const WORKCENTERDEC = URL_NAME +'/basicdata/WorkCenterDesc';


export const BOM_STEP_SERVICE = URL_NAME +'/basicdata/BomStep';                            //BOM步骤
export const ROUTER_STEP_SERVICE = URL_NAME +'/basicdata/routerStep';                       //工艺步骤
export const USER_SERVICE_LOGIN = USER_INFO_SERVICE+'/login';                       //登录
export const USER_MODIFY_PASSWORD = USER_INFO_SERVICE +'/security/modifyPassword';                       //修改密码


export const EQT_TREE = EQT_SERVICE+'/getEqtTree';                                  //设备树
export const EQT_PRODUCT_LIST = EQT_SERVICE+'/getEqtProductLine';                   //设备产线信息
export const PRODUCT_EQT  = EQT_SERVICE+'/getProductLineEqt';                       //产线下面的设备信息
export const EQT_ORDER = EQT_SERVICE+'/getEqtOrder';                                //设备订单信息
export const EQT_POSITION = EQT_SERVICE+'/getEqtPosition';                          //设备位置
export const EQT_ROLE_TREE = EQT_SERVICE+'/getRoleEqtTree';                         //设备角色树
export const EQT_LIST = EQT_SERVICE+'/getEqtList';                                  //设备列表
export const ADD_EQT = EQT_SERVICE+'/addEqt';                                       //添加设备
export const UPDATE_EQT = EQT_SERVICE+'/updateEqt';                                 //更新设备
export const DELETE_EQT = EQT_SERVICE+'/deleteEqt';                                 //删除设备
export const EQT_DETAIL = EQT_SERVICE+'/getEqtDetail';                              //设备详情
export const UPDATE_EQT_BASE_INFO  = EQT_SERVICE+'/updateEqtBaseInfo';              //更新设备基本信息
export const IMPORT_EQT = EQT_SERVICE+'/import';                           //导入设备
export const EXPORT_EQT = EQT_SERVICE+'/export';                          //导出设备

export const ALARM_LIST = ALARM+'/getAlarmList';                                    //报警数
export const ALARM_PRIORITY_COUNT = ALARM+'/getAlarmPriorityCount';                 //报警级别数
export const ALARM_EQT_RULE_DESC = ALARM+'/getEqtRuleDesc';                         //概览信息在线值
export const ALARM_TYPE_NUMBER = ALARM+'/getAlarmTypeNumber';                       //报警自定义类型数量
export const ALARM_EQT_LIST = ALARM+'/getEqtAlarmList';                             //报警和指标列表
export const ALARM_EQT_COUNT = ALARM+'/getEqtAlarm';                             //当前报警数
export const ALARM_TYPE_CUSTOMIZED = ALARM+'/getAlarmTypeCustomized';               //10个报警自定义类型数量
export const ALARM_CUSTOMIZED_TYPE = ALARM+'/getCustomizedType';
export const INDICATORS_TREND = ALARM+ '/getAlarmTrendHBase';                        //指标趋势
export const ALARM_TREND =  ALARM+'/getAlarmTrendHBase';                                 //报警趋势
export const ALARM_CONFIRMED = ALARM+'/alarmConfirmed';                             //报警确认
export const ALARM_RULE_TYPE_ITEM = ALARM+'/getRuleTypeItem';                       //规则自定义类型
export const THREE_D_STATUS = ALARM+'/getThreeDStatus';                             //指标监控结果
export const ALARM_BTN_PERMISSION = ALARM+'/getBtnPermission';                      //按钮权限
export const ALARM_H_LIST = ALARM + '/getHAlarmList';                      //高级权限报警列表

export const ROLE_LIST = ROLE_SERVICE+'/getRoleList';                               //获取角色列表
export const ADD_ROLE = ROLE_SERVICE+'/addRole';                                    //添加角色
export const UPDATE_ROLE = ROLE_SERVICE+'/updateRole';                              //更新角色
export const DELETE_ROLE = ROLE_SERVICE+'/deleteRole';                              //删除角色
export const ROLE_INFO = ROLE_SERVICE+'/getRoleDetailInfo';                         //角色详情
export const ROLE_USER_LIST = ROLE_SERVICE+'/getRoleUserList';                      //角色用户列表

export const MODULE_LIST = MODULE_SERVICE+'/getModuleList';                         //模块列表
export const ADD_MODULE = MODULE_SERVICE+'/addModule';                              //添加列表
export const UPDATE_MODULE = MODULE_SERVICE+'/updateModule';                        //更新模块
export const DELETE_MODULE = MODULE_SERVICE+'/deleteModule';                        //删除模块

export const DEPT_LIST = DEPT_SERVICE+'/getDeptList';                               //部门列表
export const ADD_DEPT = DEPT_SERVICE+'/addDept';                                    //添加部门列表
export const UPDATE_DEPT = DEPT_SERVICE+'/updateDept';                              //更新部门
export const DELETE_DEPT = DEPT_SERVICE+'/deleteDept';                              //更删除部门

export const EMP_LIST = EMP_SERVICE+'/getEmpList';                                  //获取员工列表
export const ADD_EMP = EMP_SERVICE+'/addEmp';                                       //添加员工
export const UPDATE_EMP = EMP_SERVICE+'/updateEmp';                                 //更新员工
export const DELETE_EMP = EMP_SERVICE+'/deleteEmp';                                 //删除员工

export const USER_LIST = USER_SERVICE+'/getUserList';                               //获取用户列表
export const ADD_USER = USER_SERVICE+'/addUser';                                    //添加用户
export const UPDATE_USER = USER_SERVICE+'/updateUser';                              //更新用户
export const DELETE_USER = USER_SERVICE+'/deleteUser';                              //删除用户
export const ROLE_USER = USER_SERVICE+'/setRole';                                   //设置角色
export const DEPT_USER = USER_SERVICE+'/setDept';                                   //设置部门

export const PRO_PLAN_LIST = PRO_PLAN_SERVICE+'/getProductionPlanList';             //获取生产计划列表
export const ADD_PRO_PLAN = PRO_PLAN_SERVICE+'/addProductionPlan';                  //添加生产计划
export const UPDATE_PRO_PLAN = PRO_PLAN_SERVICE+'/updateProductionPlan';            //更新生产计划
export const DELETE_PRO_PLAN = PRO_PLAN_SERVICE+'/deleteProductionPlan';            //删除生产计划
export const PRO_PLAN_SAP = PRO_PLAN_SERVICE+'/getProductSapPror';                  //获取当前产线下的订单
export const IMPORT_PRO_PLAN = PRO_PLAN_SERVICE+'/import';                           //导入生产计划
export const EXPORT_PRO_PLAN = PRO_PLAN_SERVICE+'/export';                          //导出生产计划

export const PRO_CURRENT_LIST = PRO_CURRENT_SERVICE+'/getProductionCurrentInfoList';//获取当前生产列表
export const ADD_PRO_CURRENT = PRO_CURRENT_SERVICE+'/addProductionCurrentInfo';     //添加当前生产
export const UPDATE_PRO_CURRENT = PRO_CURRENT_SERVICE+'/updateProductionCurrentInfo';//更新当前生产
export const DELETE_PPRO_CURRENT = PRO_CURRENT_SERVICE+'/deleteProductionCurrentInfo';//删除当前生产
export const IMPORT_PPRO_CURRENT = PRO_CURRENT_SERVICE+'/import';                           //导入当前生产
export const EXPORT_PPRO_CURRENT = PRO_CURRENT_SERVICE+'/export';                          //导出当前生产

export const MATL_LIST = MATL_SERVICE+'/getMatlList';                               //获取物料列表
export const ADD_MATL = MATL_SERVICE+'/addMatl';                                    //添加物料
export const UPDATE_MATL = MATL_SERVICE+'/updateMatl';                              //更新物料
export const DELETE_MATL = MATL_SERVICE+'/deleteMatl';                              //删除物料
export const IMPORT_MATL = MATL_SERVICE+'/import';                                  //导入物料
export const EXPORT_MATL = MATL_SERVICE+'/export';                                  //导出物料

export const UNIT_LIST = UNIT_SERVICE+'/getUnitList';                               //单位列表
export const ADD_UNIT = UNIT_SERVICE+'/addUnit';                                    //添加单位
export const UPDATE_UNIT = UNIT_SERVICE+'/updateUnit';                              //更新单位
export const DELETE_UNIT = UNIT_SERVICE+'/deleteUnit';                              //删除单位
export const IMPORT_UNIT = UNIT_SERVICE+'/import';                           //导入单位
export const EXPORT_UNIT = UNIT_SERVICE+'/export';                          //导出单位

export const EQT_PLAN_LIST = PLANT_SERVICE+'/getPlantList';           //工厂代码
export const EQT_TYPE_LIST = EQT_TYPE_SERVICE+'/getEqtTypeList';  
export const EQTY_TYPE_LIST = EQT_TYPE_SERVICE+'/getEqtTypeDetail';                  //设备类型列表
export const ADD_EQT_TYPE = EQT_TYPE_SERVICE+'/addEqtType';                         //添加设备类型
export const UPDATE_EQT_TYPE = EQT_TYPE_SERVICE+'/updateEqtType';                   //更新设备类型
export const DELETE_EQT_TYPE = EQT_TYPE_SERVICE+'/deleteEqtType';                   //删除设备类型
export const IMPORT_EQT_TYPE = EQT_TYPE_SERVICE+'/import';                   //导入设备类型
export const EXPORT_EQT_TYPE = EQT_TYPE_SERVICE+'/export';                   //导出设备类型

export const PROP_LIST = PROP_SERVICE+'/getPropList';                               //属性列表
export const ADD_PROP = PROP_SERVICE+'/addProp';                                    //添加属性
export const UPDATE_PROP = PROP_SERVICE+'/updateProp';                              //更新属性
export const DELETE_PROP = PROP_SERVICE+'/deleteProp';                              //删除属性
export const IMPORT_PROP = PROP_SERVICE+'/import';                           //导入自定义类型
export const EXPORT_PROP = PROP_SERVICE+'/export';                          //导出自定义类型

export const PROP_INST_LIST = PROP_INST_SERVICE+'/getPropInstList';                 //属性实例列表
export const ADD_PROP_INST = PROP_INST_SERVICE+'/addPropInst';                      //添加属性实例
export const UPDATE_PROP_INST = PROP_INST_SERVICE+'/updatePropInst';                //更新属性实例
export const DELETE_PROP_INST = PROP_INST_SERVICE+'/deletePropInst';                //删除属性实例
export const IMPORT_PROP_INST = PROP_INST_SERVICE+'/import';                                  //导入属性实例
export const EXPORT_PROP_INST = PROP_INST_SERVICE+'/export';                                  //导出属性实例

export const RULE_LIST = RULE_SERVICE+'/getRuleList';                               //规则列表
export const ADD_RULE = RULE_SERVICE+'/addRule';                                    //添加规则
export const UPDATE_RULE = RULE_SERVICE+'/updateRule';                              //更新规则
export const DELETE_RULE = RULE_SERVICE+'/deleteRule';                              //删除规则
export const IMPORT_RULE = RULE_SERVICE+'/import';                                  //导入规则
export const EXPORT_RULE = RULE_SERVICE+'/export';                                  //导出规则

export const RULE_INST_LIST = RULE_INST_SERVICE+'/getRuleInstList';                 //规则实例列表
export const ADD_RULE_INST = RULE_INST_SERVICE+'/addRuleInst';                      //添加规则实例
export const UPDATE_RULE_INST = RULE_INST_SERVICE+'/updateRuleInst';                //更新规则实例
export const DELETE_RULE_INST = RULE_INST_SERVICE+'/deleteRuleInst';                //删除规则实例
export const IMPORT_RULE_INST = RULE_INST_SERVICE+'/import';                                  //导入规则
export const EXPORT_RULE_INST = RULE_INST_SERVICE+'/export';                                  //导出规则
export const RULE_INST_PROP = RULE_INST_SERVICE + '/getRuleInstPropValue';                 //更改属性值


export const BRAND_LIST = BRAND_SERVICE+'/getBrandList';                            //品牌列表
export const ADD_BRAND = BRAND_SERVICE+'/addBrand';                                 //添加品牌
export const UPDATE_BRAND = BRAND_SERVICE+'/updateBrand';                           //更新品牌
export const DELETE_BRAND = BRAND_SERVICE+'/deleteBrand';                           //删除品牌
export const IMPORT_BRAND = BRAND_SERVICE+'/import';                                  //导入品牌
export const EXPORT_BRAND = BRAND_SERVICE+'/export';                                  //导出品牌

export const MATL_PLANT_LIST = MATL_PLANT_SERVICE+'/getMatlPlantList';              //物料工厂列表
export const ADD_MATL_PLANT = MATL_PLANT_SERVICE+'/addMatlPlant';                   //添加物料工厂
export const UPDATE_MATL_PLANT = MATL_PLANT_SERVICE+'/updateMatlPlant';             //更新物料工厂
export const DELETE_MATL_PLANT = MATL_PLANT_SERVICE+'/deleteMatlPlant';             //删除物料工厂
export const IMPORT_MATL_PLANT = MATL_PLANT_SERVICE + '/import';             //删除物料工厂
export const EXPORT_MATL_PLANT = MATL_PLANT_SERVICE + '/export';                    //导出物料工厂

export const MATL_OTHER_LIST = MATL_OTHER_SERVICE+'/getMatlOtherList';              //物料其他信息列表
export const ADD_MATL_OTHER = MATL_OTHER_SERVICE+'/addMatlOther';                   //添加物料其他信息
export const UPDATE_MATL_OTHER = MATL_OTHER_SERVICE+'/updateMatlOther';             //更新物料其他信息
export const DELETE_MATL_OTHER = MATL_OTHER_SERVICE+'/deleteMatlOther';             //删除物料其他信息
export const IMPORT_MATL_OTHER = MATL_OTHER_SERVICE + '/import';             //更新物料其他信息
export const EXPORT_MATL_OTHER = MATL_OTHER_SERVICE + '/export';             //删除物料其他信息

export const FILE_UPDATE_EQT = UPLOAD_FILE_SERVICE+'/moreFileUpload?key=eqt';       //设备图片上传
export const FILE_DOWNLOAD_EQT = UPLOAD_FILE_SERVICE+'/downloadImg?key=eqt';        //设备图片上传
export const FILE_UPDATE_RULE = UPLOAD_FILE_SERVICE+'/moreFileUpload?key=eqt';       //报警图片上传
export const FILE_DOWNLOAD_RULE = UPLOAD_FILE_SERVICE+'/downloadImg?key=eqt';        //报警图片上传

export const CUSTOMIZED_TYPE_LIST = CUSTOMIZED_TYPE_SERVICE+'/getCustomizedTypeList';         //自定义类型列表
export const ADD_MATL_CUSTOMIZED_TYPE = CUSTOMIZED_TYPE_SERVICE+'/addCustomizedType';         //添加自定义类型
export const UPDATE_MATL_CUSTOMIZED_TYPE = CUSTOMIZED_TYPE_SERVICE+'/updateCustomizedType';   //更新自定义类型
export const DELETE_MATL_CUSTOMIZED_TYPE = CUSTOMIZED_TYPE_SERVICE+'/deleteCustomizedType';   //删除自定义类型
export const IMPORT_CUSTOMIZED_TYPE = CUSTOMIZED_TYPE_SERVICE+'/import';                           //导入自定义类型
export const EXPORT_CUSTOMIZED_TYPE = CUSTOMIZED_TYPE_SERVICE+'/export';                          //导出自定义类型
// 

export const RULE_TYPE_ITEM_LIST = RULE_TYPE_ITEM_SERVICE+'/getRuleTypeItemList';         //规则自定义类型列表
export const ADD_RULE_TYPE_ITEM = RULE_TYPE_ITEM_SERVICE+'/addRuleTypeItem';         //添加规则自定义类型
export const UPDATE_RULE_TYPE_ITEM = RULE_TYPE_ITEM_SERVICE+'/updateRuleTypeItem';   //更新规则自定义类型
export const DELETE_RULE_TYPE_ITEM = RULE_TYPE_ITEM_SERVICE+'/deleteRuleTypeItem';   //删除规则自定义类型
export const IMPORT_RULE_TYPE_ITEM = RULE_TYPE_ITEM_SERVICE+'/import';              //导入规则自定义类型
export const EXPORT_RULE_TYPE_ITEM = RULE_TYPE_ITEM_SERVICE+'/export';              //导出规则自定义类型
export const PRO_TYPE_ITEM_LIST = URL_NAME+'/prodLine/getProdLineList ';    //组织编码
 
export const ACTINOTYPE = URL_NAME +'/action/export';                                //行动方案导出excel
export const GETACTIONTYPE = URL_NAME +'/ruleInst/getActionRuleInst';                      //行动方案数据
export const GETACTIONTYPELIST = URL_NAME +'/action/getActionList';                      //行动方案数据列表
export const UPDATAACTIONTYPELIST = URL_NAME +'/action/updateAction';                      //更新行动方案数据列表
export const ADDACTIONTYPELIST = URL_NAME +'/action/addAction';                      //添加行动方案数据列表
export const DELETEACTIONTYPE = URL_NAME +'/action/deleteAction';                      //行动方案数据
export const GETACTIONTYPES = URL_NAME+'/action/getActionByRuleInstIdList';           //获取行动方案列表

export const KPI_LIST = KPI_SERVICE+'/getKPIList';                               //获取kpi列表
export const ADD_KPI = KPI_SERVICE+'/addKPI';                                    //添加kpi
export const UPDATE_KPI = KPI_SERVICE+'/updateKPI';                              //更新kpi
export const DELETE_KPI = KPI_SERVICE+'/deleteKPI';                              //删除kpi


export const SHIFT_LIST = SHIFT_SERVICE+'/getShiftCategoryList';                               //获取班次配置列表
export const ADD_SHIFT = SHIFT_SERVICE+'/addShiftCategory';                                    //添加班次配置
export const UPDATE_SHIFT = SHIFT_SERVICE+'/updateShiftCategory';                              //更新班次配置
export const DELETE_SHIFT = SHIFT_SERVICE+'/deleteShiftCategory';                              //删除班次配置


export const OPERATION_LIST = OPERATION_SERVICE+'/getOperationList';                               //获取工序配置列表
export const ADD_OPERATION = OPERATION_SERVICE+'/addOperation';                                    //添加工序配置
export const UPDATE_OPERATION = OPERATION_SERVICE+'/updateOperation';                              //更新工序配置
export const DELETE_OPERATION = OPERATION_SERVICE+'/deleteOperation';                              //删除工序配置

export const ORG_STRUCTURE_LIST = ORG_STRUCTURE_SERVICE + '/getOrgList';                  //组织架构
export const ADD_ORG_STRUCTURE = ORG_STRUCTURE_SERVICE + '/addOrg';                      //新增组织架构
export const UPDATE_ORG_STRUCTURE = ORG_STRUCTURE_SERVICE + '/updateOrg';                 //更新组织架构
export const DELETE_ORG_STRUCTURE = ORG_STRUCTURE_SERVICE +"/deleteOrg";                   //删除组织架构
export const IMPORT_ORG_STRUCTURE = ORG_STRUCTURE_SERVICE + '/import';              //导入组织架构
export const EXPORT_ORG_STRUCTURE = ORG_STRUCTURE_SERVICE + '/export';              //导出组织架构

export const PLANT_LIST = PLANT_SERVICE+'/getPlantForOption';                               //工厂下拉列表列表
export const WORK_LIST = WORK_SERVICE+'/getWorkCenterDescForOption';                               //工作中心列表列表
export const RESOURCE_LIST = RESOURCE_SERVICE+'/getResourceList';                               //获取资源配置列表
export const ADD_RESOURCE = RESOURCE_SERVICE+'/addResource';                                    //添加资源配置
export const UPDATE_RESOURCE = RESOURCE_SERVICE+'/updateResource';                              //更新资源配置
export const DELETE_RESOURCE = RESOURCE_SERVICE+'/deleteResource';                              //删除资源配置

export const WORKCENTER_LIST = WORKCENTER_SERVICE+'/getWorkCenterList';                               //获取工作中心列表
export const ADD_WORKCENTER = WORKCENTER_SERVICE+'/addWorkCenter';                                    //添加工作中心
export const UPDATE_WORKCENTER = WORKCENTER_SERVICE+'/updateWorkCenter';                              //更新工作中心
export const DELETE_WORKCENTER = WORKCENTER_SERVICE+'/deleteWorkCenter';                              //删除工作中心
export const EQT_ORG_STRUCTURE = ORG_STRUCTURE_SERVICE + "/getEqtList";                   //删除组织架构
export const RG_STRUCTURE_DETAIL = ORG_STRUCTURE_SERVICE + "/getOrgDetail";                   //删除组织架构
export const UPDATE_RG_STRUCTURE_DETAIL = ORG_STRUCTURE_SERVICE + "/updateOrgDetail";         //更新组织架构详情

export const RESOURCEGROUP_LIST = RESOURCEGROUP_SERVICE+'/getResourceGroupList';                               //获取资源组配置列表
export const ADD_RESOURCEGROUP = RESOURCEGROUP_SERVICE+'/addResourceGroup';                                    //添加资源组配置
export const UPDATE_RESOURCEGROUP = RESOURCEGROUP_SERVICE+'/updateResourceGroup';                              //更新资源组配置
export const DELETE_RESOURCEGROUP = RESOURCEGROUP_SERVICE+'/deleteResourceGroup';                              //删除资源组配置
export const PLAN_RESOURCEGROUP = RESOURCE_SERVICE+'/getResourceByPlantCodeList';  
export const DEPLOY = DEPLOYS+'/findRouterList';                                                 //工艺配置
export const ADDDEPLOY = DEPLOYS+'/addRouter';                                                   //新增工艺配置
export const UPDATEDEPLOY = DEPLOYS+'/updateRouter';                                             //更新工艺配置
export const DELETEDEPLOY = DEPLOYS+'/deleteRouter';                                             //删除工艺配置
export const SETETEDEPLOY = DEPLOYS+'/selectRouterOption';
  // prodLine/getProdLineList
export const ROUTER = ROUTERSTEP+'/findRouterStepList';                                          //工艺步骤
export const UPDATEROUTER = ROUTERSTEP+'/updateRouterStep';                                      //更新工艺步骤
export const DELETEROUTER = ROUTERSTEP+'/deleteRouterStep';                                      //删除工艺步骤
export const FINDROUTER = ROUTERSTEP+'/addRouterStep';                                           //新增工艺步骤
export const UNITLISTS =  UNIT_SERVICE+'/getUnitList';                                           //数量单位

export const GETROUTERNEXTSTEP = ROUTERNEXTSTEP+'/getRouterNextStepList';                        //工艺顺序
export const UPDATEROUTERNEXTSTEP = ROUTERNEXTSTEP+'/updateRouterNextStep';                      //更新工艺顺序
export const DELETEROUTERNEXTSTEP = ROUTERNEXTSTEP+'/deleteRouterNextStep';                      //删除工艺顺序
export const ADDROUTERNEXTSTEP = ROUTERNEXTSTEP+'/addRouterNextStep';                            //新增工艺顺序   

export const SELECTOPTIONS = OPERATION_SERVICE+'/selectOperationOption';                                         

export const GETGONGYI = GETGY+"/getPlantForOption";

export const GETROUOTEOPTION = ROUTERSTEP+'/getAllRouterStepCodeForOption';
export const GETDESCOPTION = ROUTERSTEP+'/getMatlDescForOption';                                 //工艺步骤

export const GETSTATUS = DEPLOYS+'/getStatusForOption';//状态

export const RESOURCEGROUPASSIGNMENT_LIST = RESOURCEGROUPASSIGNMENT_SERVICE+'/getResourceGroupAssignmentList';                  //获取资源组分配列表
export const ADD_RESOURCEGROUPASSIGNMENT = RESOURCEGROUPASSIGNMENT_SERVICE+'/addResourceGroupAssignment';                       //添加资源组分配
export const UPDATE_RESOURCEGROUPASSIGNMENT = RESOURCEGROUPASSIGNMENT_SERVICE+'/updateResourceGroupAssignment';                 //更新资源组分配
export const DELETE_RESOURCEGROUPASSIGNMENT = RESOURCEGROUPASSIGNMENT_SERVICE+'/deleteResourceGroupAssignment';                 //删除资源组分配

export const BOM_LIST = BOM_SERVICE+'/getBomList';                               //获取BOM配置列表
export const ADD_BOM = BOM_SERVICE+'/addBom';                                    //添加BOM配置
export const UPDATE_BOM = BOM_SERVICE+'/updateBom';                              //更新BOM配置
export const DELETE_BOM = BOM_SERVICE+'/deleteBom';                              //删除BOM配置
export const MALT_LIST = MALT_SERVICE+'/getMatlDescForOption';                               //物料描述下拉列表列表


export const SETUPLIST = SETUPMATRIX+'/findSetupMatrixList';                       //get程序矩阵
export const SETUPOPTION = SETUPMATRIX+'/selectUnitOption';                        //查询时间单位
export const ADDSETUPOPTION = SETUPMATRIX+'/addSetupMatrix';                       //新增程序矩阵
export const UPDATESETUPOPTION = SETUPMATRIX+'/updateSetupMatrix';                       //uodate
export const DELETESETUPOPTION = SETUPMATRIX+'/deleteSetupMatrix ';                       //delete


export const BOM_C_LIST = BOM_C_SERVICE+'/getBomComponentList';                               //获取BOM组件列表
export const ADD_BOM_C = BOM_C_SERVICE+'/addBomComponent';                                    //添加BOM组件
export const UPDATE_BOM_C = BOM_C_SERVICE+'/updateBomComponent';                              //更新BOM组件
export const DELETE_BOM_C = BOM_C_SERVICE+'/deleteBomComponent';                              //删除BOM组件
export const BOMID_LIST= BOMID_SERVICE+'/getBomForOption';                               //BOM id下拉列表

export const  UNITCONVER = UNITCONVERTION +'/getUnitConvertionList';                               //获取单位换算列表
export const  ADDUNITCONVER = UNITCONVERTION +'/addUnitConvertion';                               //新增单位换算列表
export const  UPDATEUNITCONVER = UNITCONVERTION +'/updateUnitConvertion';                               //更新单位换算列表
export const  DELETEUNITCONVER = UNITCONVERTION +'/deleteUnitConvertion';                               //删除单位换算列表

export const  GEIRULEVALUE = VALUEDESC +'/getValueDescMapList';                               //获取规则值描述
export const  ADDRULEVALUE = VALUEDESC +'/addValueDescMap';                               //新增规则值描述
export const  UPDATERULEVALUE = VALUEDESC +'/updateValueDescMap';                               //更新规则值描述
export const  DELETERULEVALUE = VALUEDESC +'/deleteValueDescMap';                               //删除规则值描述
export const  RULEVALUECANLIST = UNITCONVERTION +'/getRuleDescForOption';                               //新增规则值描述下拉

export const  MAPPINGVALUE = MAPPINGREC+'/getMappingRecipeMatlCodeList';                               //获取规则值描述
export const  WORKGETOPTION = WORKCENTERDEC+'/getWorkCenterDescForOption'
export const  GETMATLDEC = MATL_SERVICE+'/getMatlDescForOption';
export const  ADDMAPPINGVALUE = MAPPINGREC+'/addMappingRecipeMatlCode';
export const  UPDATEMAPPINGVALUE = MAPPINGREC+'/updateMappingRecipeMatlCode';
export const  DELETEMAPPINGVALUE = MAPPINGREC+'/deleteMappingRecipeMatlCode';

export const BOM_STEP_LIST = BOM_STEP_SERVICE+'/getBomStepList';                               //获取BOM步骤列表
export const ADD_BOM_STEP = BOM_STEP_SERVICE+'/addBomStep';                                    //添加BOM步骤
export const UPDATE_BOM_STEP = BOM_STEP_SERVICE+'/updateBomStep';                              //更新BOM步骤
export const DELETE_BOM_STEP = BOM_STEP_SERVICE+'/deleteBomStep';                              //删除BOM步骤
export const ROUTER_STEP= ROUTER_STEP_SERVICE+'/getRouterStepCodeForOption';                   //工艺步骤下拉列表


export const SELECTTYPE = MATL_PLANT_SERVICE+'/getMatlPlantList';                             //物料
export const SELECTOPTINS = RESOURCE_SERVICE +'/getResourceList';                             //资源
export const GETRESOURCElIST = RESOURCEGROUP_SERVICE +'/getResourceGroupList';                             //资源组描述

export const LOGIN = ipAdress + '/oauth/api/v1/login?';   