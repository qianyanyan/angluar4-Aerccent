import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataService } from "../../DataService";
import { 
    PROP_LIST,
    ADD_PROP,
    UPDATE_PROP,
    DELETE_PROP,
    UNIT_LIST,
    IMPORT_PROP
} from '../../app.constants';
import { ResService } from '../../core/common/res.service';
@Injectable()
export class PropService extends ResService{

    constructor( private http: Http,private dataService: DataService) {
        super();
    }
    getPropList(pageIndex:any, pageSize:any, serach:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        params.set("prop_short_name", serach.prop_short_name);
        params.set("prop_name", serach.prop_name);
        return this.http.post(PROP_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getUnitList() : Promise<any> {
        return this.http.post(UNIT_LIST,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }


    
    addProp(param:any) : Promise<any> {
       let params =   this.setPropParams(param);
        return this.http.post(ADD_PROP,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    updateProp(param:any) : Promise<any> {
        let params =   this.setPropParams(param);
        params.set("prop_id", param.prop_id);
         return this.http.post(UPDATE_PROP,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     deleteProp(prop_id:string,last_update_by:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("prop_id", prop_id);
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
         return this.http.post(DELETE_PROP,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

    setPropParams(param:any) {
        let params =new URLSearchParams();
        params.set("prop_code", param.prop_code);
        params.set("unit_id", param.unit_id);
        params.set("prop_short_name", param.prop_short_name);
        params.set("prop_name", param.prop_name);
        params.set("remark", param.remark);
        
        if (param.is_valid) {
            params.set("is_valid", "1");
        } else {
            params.set("is_valid", "0");
        }
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
        return params;
    }

    handleUpload(formData:FormData) {
        return this.http.post(IMPORT_PROP,formData).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

}