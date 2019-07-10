import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataService } from "../../DataService";
import { 
    EQT_LIST,
    ADD_EQT,
    UPDATE_EQT,
    DELETE_EQT,
    EQT_DETAIL,
    UPDATE_EQT_BASE_INFO,
    PROP_INST_LIST,
    ADD_PROP_INST,
    UPDATE_PROP_INST,
    DELETE_PROP_INST,
    PROP_LIST,
    PRO_TYPE_ITEM_LIST,
    PLAN_RESOURCEGROUP,
    UNIT_LIST,
    RULE_INST_LIST,
    ADD_RULE_INST,
    UPDATE_RULE_INST,
    DELETE_RULE_INST,
    RULE_LIST,
    IMPORT_EQT,
    EQT_PLAN_LIST,
    EQT_TYPE_LIST,
    IMPORT_PROP_INST,
    IMPORT_RULE_INST,
    GETACTIONTYPE,
    GETACTIONTYPELIST,
    UPDATAACTIONTYPELIST,
    DELETEACTIONTYPE,
    ADDACTIONTYPELIST,
    ORG_STRUCTURE_LIST,
    ADD_ORG_STRUCTURE,
    RULE_INST_PROP,
    UPDATE_ORG_STRUCTURE,
    DELETE_ORG_STRUCTURE,
    EQT_ORG_STRUCTURE,
    RG_STRUCTURE_DETAIL,
    UPDATE_RG_STRUCTURE_DETAIL,
    IMPORT_ORG_STRUCTURE
} from '../../app.constants';
import { ResService } from '../../core/common/res.service';


@Injectable()
export class EqtService extends ResService{

    constructor( private http: Http,private dataService: DataService) {
        super();
    }
    getEqtList() : Promise<any> {
        let params = new URLSearchParams();
        params.set("user_id", this.dataService.userInfo.value.user.id);
        return this.http.post(EQT_LIST, params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getEqtTypeList() : Promise<any> {
        return this.http.post(EQT_TYPE_LIST,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    getResourceByPlantCodeList(param:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("plant_code", '');
        return this.http.post(PLAN_RESOURCEGROUP,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    
    getPlanList() : Promise<any> {
        return this.http.post(EQT_PLAN_LIST,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    getProdLineLists() : Promise<any> {
        return this.http.post(PRO_TYPE_ITEM_LIST,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    
    addEqt(param:any) : Promise<any> {
       let params =   this.setAddEqtParams(param);
        return this.http.post(ADD_EQT,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    addUpdate(param:any) : Promise<any> {
        let params =   this.setAddEqtParams(param);
        params.set("eqt_id", param.id);
         return this.http.post(UPDATE_EQT,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     deleteEqt(eqt_id:any,last_update_by): Promise<any> {
        let params =new URLSearchParams();
        params.set("eqt_id", eqt_id);
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
         return this.http.post(DELETE_EQT,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

    setAddEqtParams(param:any) {
        let params =new URLSearchParams();
        params.set("eqt_code", param.eqt_code);
        params.set("eqt_detail", param.eqt_detail);
        params.set("eqt_name", param.eqt_name);
        params.set("eqt_type_id", param.eqt_type_id);
        params.set("is_valid", "1");
        params.set("last_update_by",this.dataService.userInfo.value.user.id);
        params.set("sort", param.sort);
        params.set("upper_eqt_id", param.upper_eqt_id);
      
        return params;
    }

    getEqtDetail(eqt_id:string) {
        let params =new URLSearchParams();
        params.set("eqt_id", eqt_id);
         return this.http.post(EQT_DETAIL,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
    }

    eqtUpload(formData:FormData) {
        return this.http.post(IMPORT_EQT,formData).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    updateEqtBaseInfo(param:any) {
        let params =new URLSearchParams();
        params.set("eqt_id", param.id);
        params.set("image_url", param.image_url);
        params.set("eqt_name", param.eqt_name);
        params.set("eqt_detail", param.eqt_detail);
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
         return this.http.post(UPDATE_EQT_BASE_INFO,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
    }
   
    getPropInstList(eqt_id: string, pageIndex: any, pageSize: any, search:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("eqt_id", eqt_id);
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        params.set("prop_name", search.prop_name);
        params.set("prop_short_name", search.prop_short_name);
        params.set("prop_inst_name", search.prop_inst_name);
        return this.http.post(PROP_INST_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    addPropInst(param:any) : Promise<any> {
        let params =   this.setPropInstParams(param);
         return this.http.post(ADD_PROP_INST,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }
 
     updatePropInst(param:any) : Promise<any> {
        let params =   this.setPropInstParams(param);
        params.set("prop_inst_id", param.prop_inst_id);
        return this.http.post(UPDATE_PROP_INST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

   

    deletePropInst(prop_inst_id:string,last_update_by:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("prop_inst_id", prop_inst_id);
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
        return this.http.post(DELETE_PROP_INST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    
    propInstUpload(formData:FormData) {
        return this.http.post(IMPORT_PROP_INST,formData).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    setPropInstParams(param:any) {
        let params =new URLSearchParams();
        params.set("prop_inst_code", param.prop_inst_code);
        params.set("prop_id", param.prop_id);
        params.set("prop_short_name", param.prop_short_name);
        params.set("prop_inst_name", param.prop_inst_name);
        params.set("unit_id", param.unit_id);
        params.set("prop_type", param.prop_type);
        params.set("is_valid","1");
        params.set("priority", param.priority);
        params.set("category", param.category);
        if(param.prop_value) {
            params.set("prop_value", encodeURIComponent(param.prop_value));
        }
    
        params.set("eqt_id", param.eqt_id);
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
        return params;
    }

    getPropList(prop_name:string,pageIndex:any, pageSize:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("prop_name", prop_name);
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        return this.http.post(PROP_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getUnitList() : Promise<any> {
        return this.http.post(UNIT_LIST,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getRuleInstList(eqt_id: string, pageIndex: any, pageSize: any, search:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("eqt_id", eqt_id);
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        params.set("rule_name", search.rule_name);
        params.set("para_acq_method", search.para_acq_method);
        params.set("rule_type", search.rule_type);
        params.set("priority", search.priority);
        params.set("matl_name", search.matl_name);
        params.set("rule_inst_name", search.rule_inst_name);
    
        return this.http.post(RULE_INST_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    addRuleInst(param:any) : Promise<any> {
        let params =   this.setRuleInstParams(param);
         return this.http.post(ADD_RULE_INST,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }
 
     updateRuleInst(param:any) : Promise<any> {
        let params =   this.setRuleInstParams(param);
        params.set("id", param.id);
        return this.http.post(UPDATE_RULE_INST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    deleteRuleInst(id: string, rule_inst_code:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("id", id);
        params.set("rule_inst_code", rule_inst_code);
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
        return this.http.post(DELETE_RULE_INST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    ruleInstUpload(formData:FormData) {
        return this.http.post(IMPORT_RULE_INST,formData).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getRuleInstPropValue(param: any): Promise<any> {
  
        let params = this.setRuleInstParams(param);
      
        return this.http.post(RULE_INST_PROP, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    setRuleInstParams(param:any) {
        let params =new URLSearchParams();
        params.set("rule_inst_code", param.rule_inst_code);
        params.set("rule_inst_name", param.rule_inst_name);
        params.set("para_acq_method", param.para_acq_method);
        params.set("rule_id", param.rule_id);
        params.set("rule_type", param.rule_type);
        params.set("matl_id", param.matl_id);
        params.set("eqt_id", param.eqt_id);
        params.set("priority", param.priority);
        params.set("unit_id", param.unit_id);
        params.set("category", param.category);
        
        if(param.formula) {
            params.set("formula", encodeURIComponent(param.formula));
        }
        if(param.standard_value) {
            params.set("standard_value", encodeURIComponent(param.standard_value));
        }
        if(param.output_parameter) {
            params.set("output_parameter", encodeURIComponent(param.output_parameter));
        }
        if (param.customized_type) {
            params.set("customized_type", encodeURIComponent(param.customized_type));
        }
        if(param.is_valid) {
            params.set("is_valid", "1");
        } else {
            params.set("is_valid", "0");
        }
        params.set("image_url", param.image_url);
        params.set("last_update_by",this.dataService.userInfo.value.user.id);
        return params;
    }

    getRuleList(rule_name:string,pageIndex:any, pageSize:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("rule_name", rule_name);
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        return this.http.post(RULE_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getActionRuleInst(eqt_id:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("eqt_id", eqt_id);
        return this.http.post(GETACTIONTYPE,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getActionList(pageNum:string,count:string,rule_inst_name:string,rule_inst_id:string,eqt_id:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("pageNum", pageNum);
        params.set("count", count);
        params.set("rule_inst_name", rule_inst_name);
        params.set("rule_inst_id", rule_inst_id);
        params.set("eqt_id", eqt_id);
        return this.http.post(GETACTIONTYPELIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    updataActionList(rule_inst_id:string,eqt_id:string,action_name:string,last_update_by:string,action_detail:string,category:string,remark:string,is_valid:string,id:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("rule_inst_id", rule_inst_id);
        params.set("eqt_id", eqt_id);
        params.set("action_name", action_name);
        params.set("last_update_by", last_update_by);
        params.set("action_detail", action_detail);
        params.set("category", category);
        params.set("remark", remark);
        params.set("is_valid", is_valid);
        params.set("id", id);
        return this.http.post(UPDATAACTIONTYPELIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    deleteActionList(id:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("id", id);
        return this.http.post(DELETEACTIONTYPE,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    addActionRuleInst(rule_inst_id:string,eqt_id:string,action_name:string,last_update_by:string,action_detail:string,category:string,remark:string,is_valid:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("rule_inst_id", rule_inst_id);
        params.set("eqt_id", eqt_id);
        params.set("action_name", action_name);
        params.set("last_update_by", last_update_by);
        params.set("action_detail", action_detail);
        params.set("category", category);
        params.set("remark", remark);
        params.set("is_valid", is_valid);
        return this.http.post(ADDACTIONTYPELIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getOrgList(): Promise<any> {
        let params = new URLSearchParams();
        params.set("user_id", this.dataService.userInfo.value.user.id);
        // params.set("plant_id", 'CN01');
        return this.http.post(ORG_STRUCTURE_LIST, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    addOrg(param: any): Promise<any> {
        let params = this.setAddOrgParams(param);
        return this.http.post(ADD_ORG_STRUCTURE, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    updateOrg(param: any): Promise<any> {
        let params = this.setAddOrgParams(param);
        params.set('id', param.id);
        return this.http.post(UPDATE_ORG_STRUCTURE, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    deleteOrg(id: any):Promise<any> {
        let params = new URLSearchParams();
        params.set('id', id);
        return this.http.post(DELETE_ORG_STRUCTURE, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    setAddOrgParams(param: any) {
        let params = new URLSearchParams();
        params.set("org_code", param.org_code);
        params.set("org_name", param.org_name);
        params.set("is_other_type", param.is_other_type);
        params.set("org_type_id", param.org_type_id);
        params.set("category_type", param.category_type);
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
        params.set("sort", param.sort);
        params.set("upper_org_id", param.upper_org_id);
        params.set("role_id", param.role_id);
        params.set("plant_id", param.plant_id);
        params.set("plant_code", param.plant_code);
        params.set("erp_resource_code", param.erp_resource_code);
        if (param.resource_id) {
            params.set("resource_id", param.resource_id);
        }
        
        params.set("path", param.path);
        if (param.is_valid) {
            params.set("is_valid", "1");
        } else {
            params.set("is_valid", "0");
        }
        return params;
    }

    getOrgEqtList(): Promise<any> {
        let params = new URLSearchParams();
        params.set("plant_id", 'CN01');
        return this.http.post(EQT_ORG_STRUCTURE, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    getOrgDetail(id: string) {
        let params = new URLSearchParams();
        params.set("id", id);
        return this.http.post(RG_STRUCTURE_DETAIL, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    updateOrgDetail(param: any) {
        let params = new URLSearchParams();
        params.set("id", param.id);
        params.set("image_url", param.image_url);
        params.set("org_name", param.org_name);
        params.set("org_detail", param.org_detail);
        params.set("resource_id", param.resource_id);
        params.set("category_type", param.category_type);
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
        return this.http.post(UPDATE_RG_STRUCTURE_DETAIL, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    orgUpload(formData: FormData) {
        return this.http.post(IMPORT_ORG_STRUCTURE, formData).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

}
 