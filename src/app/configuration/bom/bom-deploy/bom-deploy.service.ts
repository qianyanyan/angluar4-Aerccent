
import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataService } from "../../../DataService";
import {
    BOM_LIST,
    ADD_BOM,
    UPDATE_BOM,
    DELETE_BOM,
    PLANT_LIST,
    MALT_LIST
} from '../../../app.constants';
import { ResService } from '../../../core/common/res.service';
@Injectable()
export class BomDeployService extends ResService {
    constructor( private http: Http,
        private dataService: DataService) {
        super();
    }
    getBomList(pageIndex:any, pageSize:any,search:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        params.set("matl_description", search.matl_description);
        return this.http.post(BOM_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    addBom(param:any) : Promise<any> {
       let params =   this.setBomParams(param);
        return this.http.post(ADD_BOM,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    updateBom(param:any) : Promise<any> {
        let params =   this.setBomParams(param);
        params.set("id", param.id);
         return this.http.post(UPDATE_BOM,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     deleteBom(_id:string,): Promise<any> {
        let params =new URLSearchParams();
        params.set("id", _id);
         return this.http.post(DELETE_BOM,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }
     setBomParams(param:any) {
        let params =new URLSearchParams();
        params.set("id", param.id);
        params.set("plant_code", param.plant_code);
        params.set("header_matl", param.matl_descriptionID);
        params.set("bom_type", param.bom_type);
        params.set("revision", param.revision);
        params.set("current_revision", param.current_revision);
        params.set("base_quantity", param.base_quantity);
        params.set("last_update_by", param.last_update_by);
        return params;

    }
    getPlantList(): Promise<any> {
      return this.http
        .post(PLANT_LIST, null)
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

