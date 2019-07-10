import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataService } from "../DataService";
import { 
    EQT_TREE, 
    ALARM_LIST, 
    EQT_ORDER,
    ALARM_PRIORITY_COUNT,
    ALARM_EQT_RULE_DESC,
    ALARM_TYPE_NUMBER,
    ALARM_EQT_LIST,
    EQT_POSITION,
    EQT_ROLE_TREE,
    ALARM_TYPE_CUSTOMIZED,
    INDICATORS_TREND,
    ALARM_TREND,
    ALARM_CONFIRMED,
    ALARM_RULE_TYPE_ITEM,
    ALARM_EQT_COUNT,
    EQT_DETAIL,
    THREE_D_STATUS,
    ALARM_CUSTOMIZED_TYPE,
    ALARM_BTN_PERMISSION,
    TIMER_YEAR,
    GETACTIONTYPES
} from '../app.constants';
import { ResService } from '../core/common/res.service';
 
 


@Injectable()
export class TagService extends ResService{

    constructor( private http: Http, private dataService: DataService) {
        super();
    }

    getRoleEqtTree(user_id) : Promise<any> {
        let params =new URLSearchParams();
        params.set("user_id", user_id);
        return this.http.post(EQT_ROLE_TREE,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    /** 报警曲线图按年份显示*/
    graphAlarm(category,occur_date_start,rule_inst_id) : Promise<any>{
        let params =new URLSearchParams();
        params.set("category", category);
        params.set("occur_date_start",occur_date_start);
        params.set("rule_inst_id",rule_inst_id);
        return this.http.post(TIMER_YEAR,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getAlarmList( ) : Promise<any> {
        return this.http.post(ALARM_LIST,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    
    getEqtOrder(eqt_id):Promise<any> {
        let params =new URLSearchParams();
        params.set("eqt_id", eqt_id);
        return this.http.post(EQT_ORDER,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    
    getAlarmPriorityCount(eqt_id):Promise<any> {
        let params =new URLSearchParams();
        params.set("eqt_id", eqt_id);
        return this.http.post(ALARM_PRIORITY_COUNT,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getEqtRuleDesc(eqt_id,erp_matl_code):Promise<any> {
        let params =new URLSearchParams();
        params.set("eqt_id", eqt_id);
        params.set("erp_matl_code",erp_matl_code);
        return this.http.post(ALARM_EQT_RULE_DESC,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    
    getAlarmTypeNumber(eqt_id):Promise<any> {
        let params =new URLSearchParams();
        params.set("eqt_id", eqt_id);
        return this.http.post(ALARM_TYPE_NUMBER,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getAlarmTypeCustomized(eqt_id):Promise<any> {
        let params =new URLSearchParams();
        params.set("eqt_id", eqt_id);
        return this.http.post(ALARM_TYPE_CUSTOMIZED,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    

    getAlarmEqtList( seach_input,erp_matl_code,eqt_id,rule_type, serachText):Promise<any> {
        let params =new URLSearchParams();
        params.set("eqt_id", eqt_id);
        params.set("rule_type", rule_type);
        params.set("rule_inst_name2",seach_input);
        params.set("erp_matl_code",erp_matl_code);
        if(serachText) {
            params.set("rule_inst_name", serachText.rule_inst_name);
            params.set("eqt_name", serachText.eqt_name);
            params.set("priority", serachText.priority);
            params.set("customized_type_1", serachText.customized_name_1);
            params.set("customized_type_2", serachText.customized_name_2);
            params.set("customized_type_3", serachText.customized_name_3);
            params.set("status", serachText.status);
        }
   
        return this.http.post(ALARM_EQT_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getEqtAlarm(eqt_id):Promise<any> {
        let params =new URLSearchParams();
        params.set("eqt_id", eqt_id); 
        return this.http.post(ALARM_EQT_COUNT,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    
    getThreeList() {
        return this.http.get("assets/data/3d.json").toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getEqtPosition(eqt_id):Promise<any> {
        let params =new URLSearchParams();
        params.set("eqt_id", eqt_id); 
        return this.http.post(EQT_POSITION,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getIndicatorsTrend(eqt_id:string,rule_inst_id:string,day:string):Promise<any> {
        let params =new URLSearchParams();
        params.set("eqt_id", eqt_id); 
        params.set("rule_inst_id", rule_inst_id);
        params.set("day", day); 
        return this.http.post(INDICATORS_TREND,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getAlarmTrend(eqt_id:string,rule_inst_id:string,day:string):Promise<any> {
        let params =new URLSearchParams();
        params.set("eqt_id", eqt_id); 
        params.set("rule_inst_id", rule_inst_id); 
        params.set("day", day); 
        return this.http.post(ALARM_TREND,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    alarmConfirmed(id:string,confirmed_by:string,action:string,rule_inst_id):Promise<any> {
        let params =new URLSearchParams();
        params.set("id", id); 
        params.set("action", action); 
        params.set("confirmed_by",  this.dataService.userInfo.value.user.id); 
        params.set("rule_inst_id", rule_inst_id)
        return this.http.post(ALARM_CONFIRMED,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    
    
    getRuleTypeItem():Promise<any> {
        return this.http.post(ALARM_RULE_TYPE_ITEM,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getEqtDetail(eqt_id:string) {
        let params =new URLSearchParams();
        params.set("eqt_id", eqt_id);
         return this.http.post(EQT_DETAIL,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
    }
    
    getThreeDStatuss(eqt_id:string){
        let params =new URLSearchParams();
        params.set("eqt_id", eqt_id);
      
         return this.http.post(THREE_D_STATUS,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
    }
    getCustomizedType(eqt_id:string,category:string){
        let params =new URLSearchParams();
        params.set("eqt_id", eqt_id);
        params.set("category_type",category);
         return this.http.post(ALARM_CUSTOMIZED_TYPE,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
    }

    getBtnPermission(){
        let params =new URLSearchParams();
        params.set("user_id", this.dataService.userInfo.value.user.id);
        return this.http.post(ALARM_BTN_PERMISSION,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    
    getActionTypes(rule_inst_id:string){
        let params =new URLSearchParams();
        params.set("rule_inst_id", rule_inst_id);
         return this.http.post(GETACTIONTYPES,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
    }
}