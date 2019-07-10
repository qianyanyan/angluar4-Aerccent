import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataService } from "../../DataService";
import { 
    RULE_LIST,
    ADD_RULE,
    UPDATE_RULE,
    DELETE_RULE,
    UNIT_LIST,
    ALARM_RULE_TYPE_ITEM,
    IMPORT_RULE
} from '../../app.constants';
import { ResService } from '../../core/common/res.service';
@Injectable()
export class RuleService extends ResService{
    constructor( private http: Http,private dataService: DataService) {
        super();
    }
    getRuleList(pageIndex: any, pageSize: any, search:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        params.set("rule_name", search.rule_name);
        params.set("priority", search.priority);
        params.set("rule_type", search.rule_type);
        params.set("para_acq_method", search.para_acq_method);
        return this.http.post(RULE_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getUnitList() : Promise<any> {
        return this.http.post(UNIT_LIST,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    addRule(param:any) : Promise<any> {
       let params =   this.setRuleParams(param);
        return this.http.post(ADD_RULE,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    updateRule(param:any) : Promise<any> {
        let params =   this.setRuleParams(param);
        params.set("rule_id", param.rule_id);
         return this.http.post(UPDATE_RULE,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     deleteRule(rule_id:string,last_update_by:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("rule_id", rule_id);
        params.set("last_update_by",  this.dataService.userInfo.value.user.id);
         return this.http.post(DELETE_RULE,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

    setRuleParams(param:any) {
        let params =new URLSearchParams();
        params.set("rule_code", param.rule_code);
        params.set("rule_type", param.rule_type);
        params.set("rule_name", param.rule_name);
        params.set("priority", param.priority);
        params.set("unit_id", param.unit_id);
        params.set("area", param.area);
        params.set("para_acq_method", param.para_acq_method);
        // params.set("customized_type_1", param.customized_type_1);
        // params.set("customized_type_2", param.customized_type_2);
        // params.set("customized_type_3", param.customized_type_3);
        // params.set("customized_type_3", param.customized_type_3);
        if (param.is_valid) {
            params.set("is_valid", "1");
        } else {
            params.set("is_valid", "0");
        }
        if (param.customized_type) {
            params.set("customized_type", encodeURIComponent(param.customized_type));
        }
        if(param.formula) {
            params.set("formula", encodeURIComponent( param.formula));
        }
        params.set("remark", param.remark);
        params.set("last_update_by",  this.dataService.userInfo.value.user.id);
        return params;
    }

    getRuleTypeItem():Promise<any> {
        return this.http.post(ALARM_RULE_TYPE_ITEM,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    handleUpload(formData:FormData) {
        return this.http.post(IMPORT_RULE,formData).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

}