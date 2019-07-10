import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataService } from "../../../DataService";
import {
    BOM_STEP_LIST,
    ADD_BOM_STEP,
    UPDATE_BOM_STEP,
    DELETE_BOM_STEP,
    MALT_LIST,
    ROUTER_STEP,
    BOM_C_LIST
} from '../../../app.constants';
import { ResService } from '../../../core/common/res.service';
@Injectable()
export class BomStepService extends ResService {
    constructor( private http: Http,
        private dataService: DataService) {
        super();
    }
    getBomStepList(pageIndex:any, pageSize:any,search:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        params.set("matl_description", search.matl_description);
        params.set("router_step_code", search.router_step_code);
        return this.http.post(BOM_STEP_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    addBomStep(param:any) : Promise<any> {
       let params =   this.setBomStepParams(param);
        return this.http.post(ADD_BOM_STEP,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    updateBomStep(param:any) : Promise<any> {
        let params =   this.setBomStepParams(param);
        params.set("id", param.id);
         return this.http.post(UPDATE_BOM_STEP,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     deleteBomStep(_id:string,): Promise<any> {
        let params =new URLSearchParams();
        params.set("id", _id);
         return this.http.post(DELETE_BOM_STEP,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }
     setBomStepParams(param:any) {
        let params =new URLSearchParams();
        params.set("id", param.id);
        params.set("bom_component_id", param.bom_component_id);
        params.set("matl_description", param.matl_description);
        params.set("router_step_id", param.router_step_code);
        params.set("last_update_by", param.last_update_by);
        return params;
    }
    getMaltList(): Promise<any> {
      return this.http
        .post(MALT_LIST, null)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    getRouterStepList(_bom_component_id:any): Promise<any> {
        return this.http
          .post(ROUTER_STEP+'?bom_component_id='+_bom_component_id, null)
          .toPromise()
          .then(this.extractData)
          .catch(this.handleError);
      }
      getBomComponentList(pageIndex:any, pageSize:any,search:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        params.set("component_description", search.component_description);
        return this.http.post(BOM_C_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
}

