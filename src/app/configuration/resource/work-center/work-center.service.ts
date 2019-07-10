import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataService } from "../../../DataService";
import {
    WORKCENTER_LIST,
    ADD_WORKCENTER,
    UPDATE_WORKCENTER,
    DELETE_WORKCENTER,
    WORK_LIST,
    PLANT_LIST
} from '../../../app.constants';
import { ResService } from '../../../core/common/res.service';
@Injectable()
export class WorkCenterService extends ResService {
    constructor( private http: Http,
        private dataService: DataService) {
        super();
    }
    getWorkCenterList(pageIndex:any, pageSize:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        return this.http.post(WORKCENTER_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    addWorkCenter(param:any) : Promise<any> {
       let params =   this.setWorkCenterParams(param);
        return this.http.post(ADD_WORKCENTER,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    updateWorkCenter(param:any) : Promise<any> {
        let params =   this.setWorkCenterParams(param);
        params.set("id", param.id);
         return this.http.post(UPDATE_WORKCENTER,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     deleteWorkCenter(_id:string,_work_center_desc_id:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("id", _id);
        params.set("work_center_desc_id", _work_center_desc_id);
         return this.http.post(DELETE_WORKCENTER,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }
     setWorkCenterParams(param:any) {
        let params =new URLSearchParams();
        params.set("plant_code", param.plant_code);
        params.set("work_center_code", param.work_center_code);
        params.set("short_description", param.short_description);
        params.set("is_wip", param.is_wip);
        params.set("is_gi_fifo", param.is_gi_fifo);
        params.set("is_gr_fifo", param.is_gr_fifo);
        params.set("work_center_category", param.work_center_category);
        params.set("work_center_type", param.work_center_type);
        params.set("erp_work_center", param.erp_work_center);
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
    getWorkList() : Promise<any> {
      return this.http.post(WORK_LIST,null).toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
}

