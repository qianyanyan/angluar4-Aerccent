 
import {SHOP_ORDER_API} from "../app.constants";
export const SELECT_PLANT_OPTION = SHOP_ORDER_API + '/selectPlantOption'; // 查询工厂物料信息

export const SELECT_SHOP_ORDER_TYPE_OPTION = SHOP_ORDER_API + '/selectShopOrderTypeOption';  //查询订单类型集合

export const SELECT_WORK_CENTER_OPTION = SHOP_ORDER_API + '/selectWorkCenterOption'; //查询生产线集合

export const SELECT_PLANT_MATL_OPTION = SHOP_ORDER_API + '/selectPlantMatlOption';  //查询工厂物料信息

export const SELECT_SHIFT_CATEGORY_OPTION = SHOP_ORDER_API + '/selectShiftCategoryOption'; //查询班次集合

export const SELECT_ORDER_LIST = SHOP_ORDER_API + '/selectOrderList'; //订单总览

export const SELECT_GI_GR_LIST = SHOP_ORDER_API + '/selectGiGrList'; //投入产出集合

export const ADD_GI = SHOP_ORDER_API + '/addGi'; //新增订单投入

export const TO_UPDATE_GI = SHOP_ORDER_API + '/toUpdateGi'; //查询需要更新的gi订单投入信息

export const UPDATE_GI = SHOP_ORDER_API + '/updateGi'; //更新订单产出

export const DELETE_GI = SHOP_ORDER_API + '/deleteGi'; //删除订单投入

export const SYNC_GI = SHOP_ORDER_API + '/syncGiSap'; //订单投入同步

export const ADD_GR = SHOP_ORDER_API + '/addGr'; //新增订单产出

export const TO_UPDATE_GR = SHOP_ORDER_API + '/toUpdateGr'; //查询需要更新的gr订单投入信息

export const UPDATE_GR = SHOP_ORDER_API + '/updateGr'; //更新订单产出

export const DELETE_GR = SHOP_ORDER_API + '/deleteGr'; //删除订单产出

export const SYNC_GR = SHOP_ORDER_API + '/syncGrSap'; //订单产出同步

export const SELECT_RESOURCE_OPTION = SHOP_ORDER_API + '/selectResourceOption'; //根据工厂编号和生产线查询资源


export const SELECT_UNIT_OPTION = SHOP_ORDER_API + '/selectUnitOption'; //查询单位

export const SELECT_SCADA_OP_RUN_ID_OPTION = SHOP_ORDER_API + '/selectScadaOpRunIdOption'; //根据工厂编号查询Scada
 
export const SELECT_ERP_BATCH_NUMBER_OPTION = SHOP_ORDER_API + '/selectErpBatchNumberOption'; //查询erpBatchNumber集合接口


 