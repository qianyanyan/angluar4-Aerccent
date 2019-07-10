import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataService } from "../../../DataService";
import {
    RESOURCEGROUP_LIST,
    ADD_RESOURCEGROUP,
    UPDATE_RESOURCEGROUP,
    DELETE_RESOURCEGROUP,
    PLANT_LIST
} from '../../../app.constants';
import { ResService } from '../../../core/common/res.service';
@Injectable()
export class ResourceGroupService extends ResService {
    constructor( private http: Http,
        private dataService: DataService) {
        super();
    }
    getResourceGroupList(pageIndex:any, pageSize:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        return this.http.post(RESOURCEGROUP_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    addResourceGroup(param:any) : Promise<any> {
       let params =   this.setResourceGroupParams(param);
        return this.http.post(ADD_RESOURCEGROUP,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    updateResourceGroup(param:any) : Promise<any> {
        let params =   this.setResourceGroupParams(param);
        params.set("id", param.id);
         return this.http.post(UPDATE_RESOURCEGROUP,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     deleteResourceGroup(_id:string,): Promise<any> {
        let params =new URLSearchParams();
        params.set("id", _id);
         return this.http.post(DELETE_RESOURCEGROUP,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }
     setResourceGroupParams(param:any) {
        let params =new URLSearchParams();
        params.set("plant_code", param.plant_code);
        params.set("resource_group", param.resource_group);
        params.set("description", param.description);
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

}

