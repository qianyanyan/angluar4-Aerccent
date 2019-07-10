import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataService } from "../../DataService";
import { 
    EQTY_TYPE_LIST,
    ADD_EQT_TYPE,
    UPDATE_EQT_TYPE,
    DELETE_EQT_TYPE,
    IMPORT_EQT_TYPE
} from '../../app.constants';
import { ResService } from '../../core/common/res.service';

@Injectable()
export class EqtTypeService extends ResService{

    constructor( private http: Http,private dataService: DataService) {
        super();
    }
    getEqtTypeList(search,field:any) : Promise<any> {
        let params = new URLSearchParams();
        params.set("data", JSON.stringify(search));
        params.set("fieldSort",field.fieldSort );
        params.set("fieldOrderBy", field.fieldOrderBy);
        return this.http.post(EQTY_TYPE_LIST, params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    
    addEqtType(param:any) : Promise<any> {
       let params =   this.setEqtTypeParams(param);
        return this.http.post(ADD_EQT_TYPE,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    updateEqtType(param:any) : Promise<any> {
        let params =   this.setEqtTypeParams(param);
        params.set("eqt_type_id", param.eqt_type_id);
         return this.http.post(UPDATE_EQT_TYPE,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     deleteEqtType(eqt_type_id:any,last_update_by:string): Promise<any> {
        let params =new URLSearchParams();
        console.log(eqt_type_id)
        params.set("eqt_type_ids", JSON.stringify(eqt_type_id));
        // params.set("last_update_by", this.dataService.userInfo.value.user.id);
         return this.http.post(DELETE_EQT_TYPE,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     setEqtTypeParams(param:any) {
        let params =new URLSearchParams();
        params.set("eqt_type_code", param.eqt_type_code);
        params.set("short_name", param.short_name);
        params.set("eqt_type_name", param.eqt_type_name);
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
        return this.http.post(IMPORT_EQT_TYPE,formData).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

}