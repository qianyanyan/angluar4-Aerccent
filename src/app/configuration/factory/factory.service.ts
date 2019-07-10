import { Injectable } from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { DataService } from "../../DataService";
import { 
    PLANT_GETLIST,
    PLANT_ADDLIST,
    PLANT_UPDATELIST,
    PLANT_DELETELIST,
    IMPORT_UNIT
} from '../../app.constants';
import { ResService } from '../../core/common/res.service';
@Injectable()
export class FactoryService extends ResService{

    constructor( 
        private http: Http,
        private dataService: DataService,
        private httpClient: HttpClient
        ) {
        super();
    }
    getFactoryList(search:any,field:any,pageIndex:any, pageSize:any) : Promise<any> {
        let params = new URLSearchParams();
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        params.set("data", JSON.stringify(search));
        params.set("fieldSort",field.fieldSort );
        params.set("fieldOrderBy", field.fieldOrderBy);
        return this.http.post(PLANT_GETLIST, params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    
    addFactory(param:any) : Promise<any> {
       let params =   this.setAddFactoryParams(param);
        return this.http.post(PLANT_ADDLIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    updateFactory(param:any) : Promise<any> {
        let params =   this.setAddFactoryParams(param);
        params.set("plant_id", param.plant_id);
         return this.http.post(PLANT_UPDATELIST,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     deleteFactory(plant_ids:any,last_update_by:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("plant_ids", JSON.stringify(plant_ids));
        params.set("last_update_by",this.dataService.userInfo.value.user.id);
         return this.http.post(PLANT_DELETELIST,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

    setAddFactoryParams(param:any) {
        let params =new URLSearchParams();
        params.set("plant_code", param.plant_code);
        // if(param.unit_symbol) {
        //     params.set("unit_symbol", encodeURIComponent(param.unit_symbol));
        // }
        params.set("plant_short_name", param.plant_short_name);
        params.set("plant_name", param.plant_name);
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