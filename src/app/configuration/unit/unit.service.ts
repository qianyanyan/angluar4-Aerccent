import { Injectable } from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { DataService } from "../../DataService";
import { 
    UNIT_LIST,
    ADD_UNIT,
    UPDATE_UNIT,
    DELETE_UNIT,
    IMPORT_UNIT
} from '../../app.constants';
import { ResService } from '../../core/common/res.service';
@Injectable()
export class UnitService extends ResService{

    constructor( 
        private http: Http,
        private dataService: DataService,
        private httpClient: HttpClient
        ) {
        super();
    }
    getUnitList(search:any,field:any) : Promise<any> {
        let params = new URLSearchParams();
        params.set("data", JSON.stringify(search));
        params.set("fieldSort",field.fieldSort );
        params.set("fieldOrderBy", field.fieldOrderBy);
        return this.http.post(UNIT_LIST, params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    
    addUnit(param:any) : Promise<any> {
       let params =   this.setAddUnitParams(param);
        return this.http.post(ADD_UNIT,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    updateUnit(param:any) : Promise<any> {
        let params =   this.setAddUnitParams(param);
        params.set("unit_id", param.unit_id);
         return this.http.post(UPDATE_UNIT,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     deleteUnit(unit_ids:any,last_update_by:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("unit_ids", JSON.stringify(unit_ids));
        params.set("last_update_by",this.dataService.userInfo.value.user.id);
         return this.http.post(DELETE_UNIT,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

    setAddUnitParams(param:any) {
        let params =new URLSearchParams();
        params.set("unit_code", param.unit_code);
        if(param.unit_symbol) {
            params.set("unit_symbol", encodeURIComponent(param.unit_symbol));
        }
        params.set("unit_short_name", param.unit_short_name);
        params.set("unit_name", param.unit_name);
        params.set("remark", param.remark);
        if (param.is_valid) {
            params.set("is_valid", "1");
        } else {
            params.set("is_valid", "0");
        }
        params.set("last_update_by",this.dataService.userInfo.value.user.id);
        return params;
    }

    handleUpload(formData:FormData) {
        return this.http.post(IMPORT_UNIT,formData).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

}