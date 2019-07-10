import { Injectable } from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { DataService } from "../../DataService";
import { 
    ORDER_TYPESERVICE,
    ORDER_AddSERVICE,
    ORDER_UPDATETYPESERVICE,
    ORDER_DELETE,
    IMPORT_UNIT
} from '../../app.constants';
import { ResService } from '../../core/common/res.service';
@Injectable()
export class OrderTypeService extends ResService{

    constructor( 
        private http: Http,
        private dataService: DataService,
        private httpClient: HttpClient
        ) {
        super();
    }
    getOrderTypeList(search:any,field:any) : Promise<any> {
        let params = new URLSearchParams();
        params.set("data", JSON.stringify(search));
        params.set("fieldSort",field.fieldSort );
        params.set("fieldOrderBy", field.fieldOrderBy);
        return this.http.post(ORDER_TYPESERVICE, params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    
    addOrderType(param:any) : Promise<any> {
       let params =   this.setAddOrderTypeParams(param);
        return this.http.post(ORDER_AddSERVICE,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    updateOrderType(param:any) : Promise<any> {
        let params =   this.setAddOrderTypeParams(param);
        params.set("id", param.id);
         return this.http.post(ORDER_UPDATETYPESERVICE,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     deleteOrderType(ids:any,last_update_by:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("ids", JSON.stringify(ids));
        params.set("last_update_by",this.dataService.userInfo.value.user.id);
         return this.http.post(ORDER_DELETE,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

    setAddOrderTypeParams(param:any) {
        let params =new URLSearchParams();
        params.set("shop_order_code", param.shop_order_code);
        params.set("erp_order_type", param.erp_order_type);
        
        params.set("description", param.description);
        // params.set("unit_name", param.unit_name);
        // params.set("remark", param.remark);
        if (param.create_order_by_scada) {
            params.set("create_order_by_scada", "1");
        } else {
            params.set("create_order_by_scada", "0");
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