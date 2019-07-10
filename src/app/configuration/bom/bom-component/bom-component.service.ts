import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataService } from "../../../DataService";
import {
    BOM_C_LIST,
    ADD_BOM_C,
    UPDATE_BOM_C,
    DELETE_BOM_C,
    BOMID_LIST,
    MALT_LIST
} from '../../../app.constants';
import { ResService } from '../../../core/common/res.service';
@Injectable()
export class BomComponentService extends ResService {
    constructor( private http: Http,
        private dataService: DataService) {
        super();
    }
    getBomComponentList(pageIndex:any, pageSize:any,search:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        params.set("bom_id", search.bom_id);
        params.set("component_description", search.component_description);
        return this.http.post(BOM_C_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    addBomComponent(param:any) : Promise<any> {
       let params =   this.setBomComponentParams(param);
        return this.http.post(ADD_BOM_C,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    updateBomComponent(param:any) : Promise<any> {
        let params =   this.setBomComponentParams(param);
        params.set("id", param.id);
         return this.http.post(UPDATE_BOM_C,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     deleteBomComponent(_id:string,): Promise<any> {
        let params =new URLSearchParams();
        params.set("id", _id);
         return this.http.post(DELETE_BOM_C,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }
     setBomComponentParams(param:any) {
        let params =new URLSearchParams();
        params.set("bom_id", param.bom_id);
        params.set("sequence", param.sequence);
        params.set("component_id", param.matl_descriptionID);
        params.set("bom_component_type", param.bom_component_type);
        params.set("valid_start", param.valid_start);
        params.set("valid_end", param.valid_end);
        params.set("quantity", param.quantity);
        params.set("unit_description", param.unit_description);
        params.set("erp_change_number", param.erp_change_number);
        params.set("erp_sequence", param.erp_sequence);
        params.set("last_update_by", param.last_update_by);
        return params;
    }
    getBomIdList(): Promise<any> {
      return this.http
        .post(BOMID_LIST, null)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    getMaltList(): Promise<any> {
        return this.http
          .post(MALT_LIST, null)
          .toPromise()
          .then(this.extractData)
          .catch(this.handleError);
      }
}

