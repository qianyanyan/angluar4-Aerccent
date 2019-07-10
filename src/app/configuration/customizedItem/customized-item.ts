import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataService } from "../../DataService";
import { 
    RULE_TYPE_ITEM_LIST,
    ADD_RULE_TYPE_ITEM,
    UPDATE_RULE_TYPE_ITEM,
    DELETE_RULE_TYPE_ITEM,
    CUSTOMIZED_TYPE_LIST,
    IMPORT_RULE_TYPE_ITEM
} from '../../app.constants';
import { ResService } from '../../core/common/res.service';
 
 
@Injectable()
export class CustomizedItemService extends ResService{
    constructor( private http: Http, private dataService: DataService) {
        super();
    }
    getRuleTypeItemList() : Promise<any> {
        return this.http.post(RULE_TYPE_ITEM_LIST,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    
    addRuleTypeItem(param:any) : Promise<any> {
       let params =   this.setRuleTypeItemParams(param);
        return this.http.post(ADD_RULE_TYPE_ITEM,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    updateRuleTypeItem(param:any) : Promise<any> {
        let params =   this.setRuleTypeItemParams(param);
        params.set("rule_type_item_id", param.rule_type_item_id);
        return this.http.post(UPDATE_RULE_TYPE_ITEM,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
     }

     deleteRuleTypeItem(rule_type_item_id:string,last_update_by:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("rule_type_item_id", rule_type_item_id);
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
        return this.http.post(DELETE_RULE_TYPE_ITEM,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
     }

     setRuleTypeItemParams(param:any) {
        let params =new URLSearchParams();
        params.set("rule_type_item_code", param.rule_type_item_code);
        params.set("rule_type_item_name", param.rule_type_item_name);
        params.set("rule_type_id", param.rule_type_id);
        params.set("category_type", param.category_type);
        params.set("is_valid","1");
        params.set("remark", param.remark);
        params.set("last_update_by",this.dataService.userInfo.value.user.id);
        return params;
    }
    getCustomizedTypeList() : Promise<any> {
        return this.http.post(CUSTOMIZED_TYPE_LIST,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    handleUpload(formData:FormData) {
        return this.http.post(IMPORT_RULE_TYPE_ITEM,formData).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
}