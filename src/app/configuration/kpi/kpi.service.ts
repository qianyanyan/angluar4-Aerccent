


import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataService } from "../../DataService";
import {
    KPI_LIST,
    ADD_KPI,
    UPDATE_KPI,
    DELETE_KPI,
    UNITLISTS,
    PLANT_LIST
} from '../../app.constants';
import { ResService } from '../../core/common/res.service';

@Injectable()
export class KpiService extends ResService{
    constructor( private http: Http,private dataService: DataService) {
        super();
    }
    
    getKPIList(pageIndex:any, pageSize:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        return this.http.post(KPI_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    addKPI(param:any) : Promise<any> {
       let params =   this.setKPIParams(param);
        return this.http.post(ADD_KPI,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    
    getgcCode(): Promise<any> {
        return this.http.post(PLANT_LIST, null).toPromise()
        .then(this.extractData).catch(this.handleError);
    }

    updateKPI(param:any) : Promise<any> {
        let params =   this.setKPIParams(param);
        params.set("id", param.id);
         return this.http.post(UPDATE_KPI,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     deleteKPI(kpi_id:string,): Promise<any> {
        let params =new URLSearchParams();
        params.set("id", kpi_id);
         return this.http.post(DELETE_KPI,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

    setKPIParams(param:any) {
        let params =new URLSearchParams();
        params.set("plant_code", param.plant_code);
        params.set("target_type", param.target_type);
        params.set("organization_id", param.organization_id);
        params.set("version", param.version);
        params.set("current_version", param.current_version);
        params.set("period_type", param.period_type);
        params.set("period_start", param.period_start);
        params.set("period_end", param.period_end);
        params.set("valid_from", param.valid_from);
        params.set("valid_to", param.valid_to);
        params.set("target_value", param.target_value);
        params.set("unit_id", param.unit_id);
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
        return params;
    }	
    setKPIPlant(param:any) {
        let params =new URLSearchParams();
        params.set("plant_code", param.plant_code);
        params.set("kpi_id", param.kpi_id);
        params.set("last_update_by",this.dataService.userInfo.value.user.id);
        return params;
    }
    setKPIOther(param:any) {
        let params =new URLSearchParams();
        params.set("id", param.id);
        params.set("subitem", param.subitem);
        params.set("volume", param.volume);
        params.set("last_update_by",this.dataService.userInfo.value.user.id);
        return params;
    }
    getgongYidanwei(): Promise<any> {
        return this.http.post(UNITLISTS,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
}
 