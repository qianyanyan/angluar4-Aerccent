import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataService } from "../../DataService";
import {
    STATUS_GETLIST,
    STATUS_ADDLIST,
    UPDATE_SHIFT,
    DELETE_SHIFT,
    EQT_PLAN_LIST
} from '../../app.constants';
import { ResService } from '../../core/common/res.service';
@Injectable()
export class StatusService extends ResService {
    constructor( private http: Http,
        private dataService: DataService) {
        super();
    }
    getStatusList(search:any,pageIndex:any, pageSize:any,field:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        params.set("data", JSON.stringify(search));
        params.set("fieldSort",field.fieldSort );
        params.set("fieldOrderBy", field.fieldOrderBy);
        return this.http.post(STATUS_GETLIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    getPlanList() : Promise<any> {
        return this.http.post(EQT_PLAN_LIST,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    addStatus(param:any) : Promise<any> {
       let params =   this.setStatusParams(param);
        return this.http.post(STATUS_ADDLIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    updateStatus(param:any) : Promise<any> {
        let params =   this.setStatusParams(param);
        params.set("id", param.id);
         return this.http.post(UPDATE_SHIFT,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     deleteStatus(_id:any,): Promise<any> {
        let params =new URLSearchParams();
        params.set("shiftCategory_ids",JSON.stringify(_id) );
         return this.http.post(DELETE_SHIFT,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }
     setStatusParams(param:any) {
        let params =new URLSearchParams();
        params.set("plant_code", param.plant_code);
        params.set("status_code", param.status_code);
        params.set("status_description", param.status_description);
        params.set("status_group", param.status_group);
        params.set("current_revision", param.current_revision);
        params.set("default_status", param.default_status);
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
       
        return params; 					

    }
}
