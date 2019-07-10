import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataService } from "../../DataService";
import { 
    CUSTOMIZED_TYPE_LIST,
    ADD_MATL_CUSTOMIZED_TYPE,
    UPDATE_MATL_CUSTOMIZED_TYPE,
    DELETE_MATL_CUSTOMIZED_TYPE,
    IMPORT_CUSTOMIZED_TYPE
} from '../../app.constants';
import { ResService } from '../../core/common/res.service';
 
@Injectable()
export class CustomizedTypeService extends ResService{
    constructor( private http: Http, private dataService: DataService) {
        super();
    }
    getCustomizedTypeList() : Promise<any> {
        return this.http.post(CUSTOMIZED_TYPE_LIST,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    
    addCustomizedType(param:any) : Promise<any> {
       let params =   this.setCustomizedTypeParams(param);
        return this.http.post(ADD_MATL_CUSTOMIZED_TYPE,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    updateCustomizedType(param:any) : Promise<any> {
        let params =   this.setCustomizedTypeParams(param);
        params.set("Customized_type_id", param.Customized_type_id);
        return this.http.post(UPDATE_MATL_CUSTOMIZED_TYPE,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
     }

     deleteCustomizedType(Customized_type_id:string,last_update_by:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("Customized_type_id", Customized_type_id);
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
        return this.http.post(DELETE_MATL_CUSTOMIZED_TYPE,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
     }

     setCustomizedTypeParams(param:any) {
        let params =new URLSearchParams();
        params.set("customized_type_code", param.customized_type_code);
        params.set("customized_type_id", param.customized_type_id);
        params.set("customized_type_name", param.customized_type_name);
        params.set("is_valid_alarm", param.is_valid_alarm ? "1":"0");
        params.set("is_valid_kpi", param.is_valid_kpi ? "1" :"0");
        params.set("is_valid","1");
        params.set("remark", param.remark);
        params.set("last_update_by",this.dataService.userInfo.value.user.id);
        return params;
    }

    handleUpload(formData:FormData) {
        return this.http.post(IMPORT_CUSTOMIZED_TYPE,formData).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
}