import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataService } from "../../../DataService";
import {
    RESOURCEGROUPASSIGNMENT_LIST,
    ADD_RESOURCEGROUPASSIGNMENT,
    UPDATE_RESOURCEGROUPASSIGNMENT,
    DELETE_RESOURCEGROUPASSIGNMENT,
    GETRESOURCElIST
} from '../../../app.constants';
import { ResService } from '../../../core/common/res.service';
@Injectable()
export class ResourceGroupAssignmentService extends ResService {
    constructor( private http: Http,
        private dataService: DataService) {
        super();
    }
    getResourceGroupAssignmentList(pageIndex:any, pageSize:any,search:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        params.set("resource_group_description", search.resource_group_description);
        params.set("resource_description", search.resource_description);
        return this.http.post(RESOURCEGROUPASSIGNMENT_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getResourceList() : Promise<any> {
        return this.http.post(GETRESOURCElIST,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    addResourceGroupAssignment(param:any) : Promise<any> {
       let params =   this.setResourceGroupAssignmentParams(param);
        return this.http.post(ADD_RESOURCEGROUPASSIGNMENT,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    updateResourceGroupAssignment(param:any) : Promise<any> {
        let params =   this.setResourceGroupAssignmentParams(param);
        params.set("id", param.id);
         return this.http.post(UPDATE_RESOURCEGROUPASSIGNMENT,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     deleteResourceGroupAssignment(_id:string,): Promise<any> {
        let params =new URLSearchParams();
        params.set("id", _id);
         return this.http.post(DELETE_RESOURCEGROUPASSIGNMENT,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }
     setResourceGroupAssignmentParams(param:any) {
        let params =new URLSearchParams();
        params.set("resource_group_id", param.resource_group_id);
        params.set("resource_id", param.resource_id);
        params.set("description", param.description);
        params.set("resource_name", param.resource_name);
        params.set("last_update_by", param.last_update_by);
        return params;
    }


}

