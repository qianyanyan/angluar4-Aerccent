import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataService } from "../../DataService";
import {
    STATUS_GETLIST,
    STATUS_ADDLIST,
    STATUS_UPDATELIST,
    STATUS_DELTELIST,
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
         return this.http.post(STATUS_UPDATELIST,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     deleteStatus(ids:any,): Promise<any> {
        let params =new URLSearchParams();
        params.set("ids",JSON.stringify(ids) );
         return this.http.post(STATUS_DELTELIST,params).toPromise()
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
