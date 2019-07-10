import { Injectable } from "@angular/core";
import { Http, URLSearchParams } from "@angular/http";
import { DataService } from "../../DataService";
import {
  RESOURCE_LIST,
  ADD_RESOURCE,
  UPDATE_RESOURCE,
  DELETE_RESOURCE,
  PLANT_LIST,
  WORK_LIST
} from "../../app.constants";
import { ResService } from "../../core/common/res.service";
@Injectable()
export class ResourceService extends ResService {
  constructor(private http: Http, private dataService: DataService) {
    super();
  }
  getResourceList(pageIndex: any, pageSize: any,search:any): Promise<any> {
    let params = new URLSearchParams();
    params.set("pageNum", pageIndex);
    params.set("count", pageSize);		
    params.set("resource_code", search.resource_code);
    params.set("resource_description", search.resource_description);
    params.set("work_center_description", search.work_center_description);
    return this.http
      .post(RESOURCE_LIST, params)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  addResource(param: any): Promise<any> {
    let params = this.setResourceParams(param);
    return this.http
      .post(ADD_RESOURCE, params)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  updateResource(param: any): Promise<any> {
    let params = this.setResourceParams(param);
    params.set("id", param.id);
    return this.http
      .post(UPDATE_RESOURCE, params)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  deleteResource(_id: string): Promise<any> {
    let params = new URLSearchParams();
    params.set("id", _id);
    return this.http
      .post(DELETE_RESOURCE, params)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  setResourceParams(param: any) {
    let params = new URLSearchParams();
    params.set("id", param.id);
    params.set("resource_code", param.resource_code);
    params.set("plant_code", param.plant_code);
    params.set("description", param.description);
    params.set("resource_name", param.resource_name);
    params.set("work_center_id", param.work_center_id);
    params.set("status_id", param.status_id);
    params.set("erp_location", param.erp_location);
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
  getWorkList(): Promise<any> {
    return this.http
      .post(WORK_LIST, null)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
}
