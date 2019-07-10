import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataService } from "../DataService";
import { 
    PRO_PLAN_LIST,
    ADD_PRO_PLAN,
    UPDATE_PRO_PLAN,
    DELETE_PRO_PLAN,
    EQT_PRODUCT_LIST,
    PRO_CURRENT_LIST,
    PRODUCT_EQT,
    PRO_PLAN_SAP,
    ADD_PRO_CURRENT,
    UPDATE_PRO_CURRENT,
    DELETE_PPRO_CURRENT,
    MATL_LIST
} from '../app.constants';
import { ResService } from '../core/common/res.service';
 
@Injectable()
export class  StatisticsService extends ResService{

    constructor( private http: Http,private dataService: DataService) {
        super();
    }
    getProductionPlanList(
        eqt_id:string,
        startMin:string,
        startMax:string,
        endMin:string,
        endMax:string,
        pageIndex:any, pageSize:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("eqt_id", eqt_id);
        params.set("startMin", startMin);
        params.set("startMax", startMax);
        params.set("endMin", endMin);
        params.set("endMax", endMax);
        params.set("pageIndex", pageIndex);
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        return this.http.post(PRO_PLAN_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    addProductionPlan(param:any) : Promise<any> {
        let params = this.setProductionPlanParams(param);
        return this.http.post(ADD_PRO_PLAN,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    setProductionPlanParams(param:any) {
        let params =new URLSearchParams();
        params.set("id", param.id);
        params.set("eqt_id", param.eqt_id);
        params.set("sap_pror", param.sap_pror);
        params.set("sap_bacnb", param.sap_bacnb);
        params.set("erp_matl_code", param.erp_matl_code);
        params.set("matl_name", param.matl_name);
        params.set("prodqty_planned_pc", param.prodqty_planned_pc);
        params.set("prodqty_planned_hl", param.prodqty_planned_hl);
        params.set("brand_id", param.brand_id);
        params.set("remark", param.remark);
        params.set("starttime_planned", param.starttime_planned);
        params.set("endtime_planned", param.endtime_planned);
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
        return params;
    }

    
    updateProductionPlan(param:any) : Promise<any> {
        let params = this.setProductionPlanParams(param);
        return this.http.post(UPDATE_PRO_PLAN,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    } 

    deleteProductionPlan(id: any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("id", id);
        return this.http.post(DELETE_PRO_PLAN,params).toPromise()
        .then(this.extractData)
    }    

    getEqtProductLine() : Promise<any> {
        return this.http.post(EQT_PRODUCT_LIST,null).toPromise()
        .then(this.extractData)
    }

    getProductionCurrentInfoList(pro_id:string,pageIndex:any, pageSize:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("pro_id", pro_id);
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        return this.http.post(PRO_CURRENT_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getProductLineEqt(upper_eqt_id:string) : Promise<any> {
        let params =new URLSearchParams();
        params.set("upper_eqt_id", upper_eqt_id);
        return this.http.post(PRODUCT_EQT,params).toPromise()
        .then(this.extractData)
    }

    getProductSapPror(eqt_id:string, time:string) : Promise<any> {
        let params =new URLSearchParams();
        params.set("eqt_id", eqt_id);
        params.set("time", time);   
        return this.http.post(PRO_PLAN_SAP,params).toPromise()
        .then(this.extractData)
    }

    addProductionCurrentInf(param:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("eqt_id", param.eqt_id);
        params.set("sap_pror", param.sap_pror);
        return this.http.post(ADD_PRO_CURRENT,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    updateProductionCurrentInfo(param:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("id", param.id);
        params.set("eqt_id", param.eqt_id);
        params.set("sap_pror", param.sap_pror);
        if(param.is_finished==true) {
            params.set("is_finished", '1');
        }
        return this.http.post(UPDATE_PRO_CURRENT,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    deleteProductionCurrentInfo(id: any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("id", id);
        return this.http.post(DELETE_PPRO_CURRENT,params).toPromise()
        .then(this.extractData)
    }   

    getMatlList(matl_name:string,pageIndex:any, pageSize:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("matl_name", matl_name);
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        return this.http.post(MATL_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    
}