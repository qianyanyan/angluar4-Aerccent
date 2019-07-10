import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataService } from "../../DataService";
import {
    SHIFT_LIST,
    ADD_SHIFT,
    UPDATE_SHIFT,
    DELETE_SHIFT
} from '../../app.constants';
import { ResService } from '../../core/common/res.service';
@Injectable()
export class ShiftService extends ResService {
    constructor( private http: Http,
        private dataService: DataService) {
        super();
    }
    getShiftList(search:any,pageIndex:any, pageSize:any,field:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        params.set("data", JSON.stringify(search));
        params.set("fieldSort",field.fieldSort );
        params.set("fieldOrderBy", field.fieldOrderBy);
        return this.http.post(SHIFT_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    addShift(param:any) : Promise<any> {
       let params =   this.setShiftParams(param);
        return this.http.post(ADD_SHIFT,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    updateShift(param:any) : Promise<any> {
        let params =   this.setShiftParams(param);
        params.set("id", param.id);
         return this.http.post(UPDATE_SHIFT,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     deleteShift(_id:any,): Promise<any> {
        let params =new URLSearchParams();
        params.set("shiftCategory_ids",JSON.stringify(_id) );
         return this.http.post(DELETE_SHIFT,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }
     setShiftParams(param:any) {
        let params =new URLSearchParams();
        params.set("plant_code", param.plant_code);
        params.set("shift_category_code", param.shift_category_code);
        params.set("shift_desc", param.shift_desc);
        params.set("start_hour", param.start_hour);
        params.set("end_hour", param.end_hour);
        params.set("remark", param.remark);
        params.set("is_valid", param.is_valid);
       
        return params; 					

    }
}
