import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataService } from "../DataService";
import { 
    SELECT_PLANT_OPTION, 
    SELECT_SHOP_ORDER_TYPE_OPTION,
    SELECT_WORK_CENTER_OPTION,
    SELECT_PLANT_MATL_OPTION,
    SELECT_SHIFT_CATEGORY_OPTION,
    SELECT_ORDER_LIST,
    SELECT_GI_GR_LIST,
    ADD_GI,
    UPDATE_GI,
    DELETE_GI,
    SYNC_GI,
    ADD_GR,
    UPDATE_GR,
    DELETE_GR,
    SYNC_GR,
    SELECT_UNIT_OPTION,
    SELECT_RESOURCE_OPTION,
    SELECT_SCADA_OP_RUN_ID_OPTION,
    SELECT_ERP_BATCH_NUMBER_OPTION,
    TO_UPDATE_GI,
    TO_UPDATE_GR
} from './order.constants'; 
import { ResService } from '../core/common/res.service';
 
@Injectable()
export class AllOrderService extends ResService{

    constructor( private http: Http,private dataService: DataService) {
        super();
    }
    selectPlantOption() : Promise<any> {
        return this.http.post(SELECT_PLANT_OPTION,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    selectShopOrderTypeOption(): Promise<any> {
        return this.http.post(SELECT_SHOP_ORDER_TYPE_OPTION, null).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    
    selectWorkCenterOption(plantCode:string): Promise<any> {
        let params = new URLSearchParams();
        params.set("plantCode", plantCode);
        return this.http.post(SELECT_WORK_CENTER_OPTION, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    } 
    selectPlantMatlOption(plantCode: string, shopOrderTypeId:string): Promise<any> {
        let params = new URLSearchParams();
        params.set("plantCode", plantCode);
        params.set("shopOrderTypeId", shopOrderTypeId);
        return this.http.post(SELECT_PLANT_MATL_OPTION, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    selectShiftCategoryOption(plantCode: string): Promise<any> {
        let params = new URLSearchParams();
        params.set("plantCode", plantCode);
        return this.http.post(SELECT_SHIFT_CATEGORY_OPTION, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    selectResourceOption(plantCode): Promise<any> {
        let params = new URLSearchParams();
        params.set("plantCode", plantCode); 
        return this.http.post(SELECT_RESOURCE_OPTION, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    selectUnitList(): Promise<any> {
        return this.http.post(SELECT_UNIT_OPTION, null).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    selectScadaOpRunIdOption(plantCode: string, resourceId: string): Promise<any> {
        let params = new URLSearchParams();
        params.set("plantCode", plantCode);
        params.set("resourceId", resourceId)
        return this.http.post(SELECT_SCADA_OP_RUN_ID_OPTION, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    selectErpBatchNumberOption(resourceId: string, matlId: string): Promise<any> {
        let params = new URLSearchParams();
        params.set("resourceId", resourceId);
        params.set("matlId", matlId)
        return this.http.post(SELECT_ERP_BATCH_NUMBER_OPTION, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    selectOrderList(param, pageIndex: any, pageSize: any): Promise<any> {
        let params = new URLSearchParams();
        params.set("plantCode", param.plantCode || null);
        params.set("shopOrderTypeId", param.shopOrderTypeId || null);
        params.set("workCenterId", param.workCenterId || null);
        params.set("scadaOrderId", param.scadaOrderId || null);
        params.set("matlId", param.matlId || null);
        params.set("orderStartDate", param.orderStartDate || null);
        params.set("orderEndDate", param.orderEndDate || null);
        params.set("shiftId", param.shiftCategoryId || null);
        params.set("gigrStartDate", param.gigrStartDate || null);
        params.set("gigrStartDate", param.gigrStartDate || null);
        params.set("gigrEndDate", param.gigrEndDate || null);
      
        params.set("pageNum", pageIndex);
        params.set("pageSize", pageSize);
        return this.http.post(SELECT_ORDER_LIST, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    selectGiGrList(param, optionNum:any): Promise<any> {
        let params = new URLSearchParams();
        params.set("plantCode", param.plantCode);
        params.set("shopOrderTypeId", param.shopOrderTypeId || null);
        params.set("workCenterId", param.workCenterId || null);
        params.set("scadaOrderId", param.scadaOrderId || null);
        params.set("matlId", param.matlId || null);
        params.set("orderStartDate", param.orderStartDate || null);
        params.set("orderEndDate", param.orderEndDate || null);
        params.set("shiftId", param.shiftCategoryId || null);
        params.set("gigrStartDate", param.gigrStartDate || null);
        params.set("gigrStartDate", param.gigrStartDate || null);
        params.set("gigrEndDate", param.gigrEndDate || null);
        params.set("optionNum", optionNum);
        params.set("isViewExtract", param.isQuantity);
        params.set("isViewDst", param.isGowhere);
        // params.set("plantCode", "CN54");
        // params.set("shopOrderTypeId","10");
        // params.set("optionNum", "6");
        return this.http.post(SELECT_GI_GR_LIST, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    addGi(param:any): Promise<any> {
        return this.http.post(ADD_GI, this.setGiParams(param)).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    setGiParams(param: any) {
        let params = new URLSearchParams();
        params.set("id", param.id || null);
        params.set("plantCode", param.plantCode);
        params.set("unitId", param.unitId || null);
        params.set("shopOrderTypeId", param.shopOrderTypeId || null);
        params.set("og", param.og || null);
        params.set("quantity", param.quantity || null);
        params.set("issuedResourceId", param.issuedResourceId || null);
        params.set("producingResourceId", param.producingResourceId || null);
        params.set("issuedScadaOpRunId", param.issuedScadaOpRunId || null);
        params.set("producingScadaOpRunId", param.producingScadaOpRunId || null);
        params.set("issuedMatlId", param.issuedMatlId || null);
        params.set("producingMatlId", param.producingMatlId || null);
        params.set("issuedErpBatchNumber", param.issuedErpBatchNumber || null);
        params.set("producingErpBatchNumber", param.producingErpBatchNumber || null);
        params.set("shiftDate", param.time || null);
        params.set("shiftCategoryId", param.shiftCategoryId);
        return params;
    }

    toUpdateGi(id:string): Promise<any> {
        let params = new URLSearchParams();
        params.set("giId", id);
        return this.http.post(TO_UPDATE_GI, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }


    updateGi(param: any): Promise<any> {
        return this.http.post(UPDATE_GI, this.setGiParams(param)).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    deleteGi(id: string): Promise<any> { 
        let params = new URLSearchParams();
        params.set("id", id);
        return this.http.post(DELETE_GI, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    syncGiSap(id: string): Promise<any> {
        let params = new URLSearchParams();
        params.set("ids", id);
        return this.http.post(SYNC_GI, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    addGr(param:any): Promise<any> { 
        return this.http.post(ADD_GR, this.setGrParams(param)).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    setGrParams(param: any) {
        let params = new URLSearchParams();
        params.set("id", param.id || null);
        params.set("plantCode", param.plantCode);
        params.set("unitId", param.unitId || null);
        params.set("shopOrderTypeId", param.shopOrderTypeId || null);
        params.set("og", param.og || null);
        params.set("quantity", param.quantity || null);
        params.set("receiptResourceId", param.receiptResourceId || null);
        params.set("receiptScadaOpRunId", param.receiptScadaOpRunId || null);
        params.set("receiptMatlId", param.receiptMatlId || null);
        params.set("receiptErpBatchNumber", param.receiptErpBatchNumber || null);
        params.set("shiftDate", param.time || null);
        params.set("shiftCategoryId", param.shiftCategoryId);
        return params;
    }

    updateGr(param: any): Promise<any> {
        let params = new URLSearchParams();
        return this.http.post(UPDATE_GR, this.setGrParams(param)).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    toUpdateGr(id: string): Promise<any> {
        let params = new URLSearchParams();
        params.set("grId", id);
        return this.http.post(TO_UPDATE_GR, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    deleteGr(id:string): Promise<any> {
        let params = new URLSearchParams();
        params.set("id", id);
        return this.http.post(DELETE_GR, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    syncGrSap(id: string): Promise<any> {
        let params = new URLSearchParams();
        params.set("ids", id);
        return this.http.post(SYNC_GR, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }


} 