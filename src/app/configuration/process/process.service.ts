import { Injectable } from "@angular/core";
import { Http, URLSearchParams } from "@angular/http";
import { DataService } from "../../DataService";
import { ResService } from "../../core/common/res.service";
import {
  OPERATION_LIST,
  ADD_OPERATION,
  UPDATE_OPERATION,
  DELETE_OPERATION,
  PLANT_LIST,
  SELECTOPTINS
} from "../../app.constants";
@Injectable()
export class ProcessService extends ResService {
  constructor(private http: Http, private dataService: DataService) {
    super();
  }
  getOperationList(pageIndex: any, pageSize: any,search:any): Promise<any> {
    let params = new URLSearchParams();
    params.set("pageNum", pageIndex);
    params.set("count", pageSize);
    params.set("description", search.description);
    params.set("resource_type_description", search.resource_type_description);
    params.set("default_resource_description", search.default_resource_description);
    return this.http
      .post(OPERATION_LIST, params)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  addOperation(param: any): Promise<any> {
    let params = this.setOperationParams(param);
    return this.http
      .post(ADD_OPERATION, params)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  updateOperation(param: any): Promise<any> {
    let params = this.setOperationParams(param);
    params.set("id", param.id);
    return this.http.post(UPDATE_OPERATION, params).toPromise().then(this.extractData)
    .catch(this.handleError);
  }



  getPlantList(): Promise<any> {
    return this.http
      .post(PLANT_LIST, null)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  deleteOperation(_id: string): Promise<any> {
    let params = new URLSearchParams();
    params.set("id", _id);
    return this.http
      .post(DELETE_OPERATION, params)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  setOperationParams(param: any) {
    let params = new URLSearchParams();
    params.set("plant_code", param.plant_code);
    params.set("operation_code", param.operation_code);
    params.set("revision", param.revision);
    params.set("current_revision", param.current_revision);
    params.set("description", param.description);
    params.set("status_id", param.status_id);
    params.set("resource_type", param.resource_type);
    params.set("resource_type_id", param.resource_typeID);
    params.set("default_resource_id", param.default_resource_id);
    params.set("erp_control_key", param.erp_control_key);
    params.set("erp_work_center", param.erp_work_center);
    return params;
  }
}
