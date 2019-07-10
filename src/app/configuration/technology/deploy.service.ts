import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataService } from "../../DataService";
import {
    BRAND_LIST,
    BOMID_LIST,
    ADD_BRAND,
    UPDATE_BRAND,
    DELETE_BRAND,
    MATL_PLANT_LIST,
    ADD_MATL_PLANT,
    UPDATE_MATL_PLANT,
    DELETE_MATL_PLANT,
    MATL_OTHER_LIST,
    IMPORT_BRAND,
    IMPORT_MATL,
    IMPORT_MATL_PLANT,
    IMPORT_MATL_OTHER,
    DEPLOY,
    ADDDEPLOY,
    GETGONGYI,
    UPDATEDEPLOY,
    DELETEDEPLOY,
    ROUTER,
    UNITLISTS,
    SETETEDEPLOY,
    SELECTOPTIONS,
    FINDROUTER,
    UPDATEROUTER,
    DELETE_MATL_OTHER,
    DELETEROUTER,
    GETROUTERNEXTSTEP,
    SETUPLIST,
    SETUPOPTION,
    ADDSETUPOPTION,
    UPDATESETUPOPTION,
    DELETESETUPOPTION,
    UNITCONVER,
    PLANT_LIST,
    ADDUNITCONVER,
    DELETEUNITCONVER,
    UPDATEUNITCONVER,
    GEIRULEVALUE,
    ADDRULEVALUE,
    RULEVALUECANLIST,
    UPDATERULEVALUE,
    DELETERULEVALUE,
    MAPPINGVALUE,
    WORKGETOPTION,
    GETMATLDEC,
    ADDMAPPINGVALUE,
    UPDATEMAPPINGVALUE,
    DELETEMAPPINGVALUE,
    GETROUOTEOPTION,
    ADDROUTERNEXTSTEP,
    UPDATEROUTERNEXTSTEP,
    DELETEROUTERNEXTSTEP,
    SELECTTYPE,
    SELECTOPTINS,
    GETRESOURCElIST,
    MALT_LIST
} from '../../app.constants';
import { ResService } from '../../core/common/res.service';

@Injectable()
export class deployService extends ResService{
    constructor( private http: Http,private dataService: DataService) {
        super();
    }
    
    
    getdeployList(pageNum:string, count:string,plantCode:string, routerCode:string) : Promise<any> {
        let params =new URLSearchParams();
        params.set('pageNum',pageNum);
        params.set('count ', count );
        params.set('plantCode', plantCode );
        params.set("routerCode", routerCode);
        return this.http.post(DEPLOY,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getMatchingList(pageNum:string, count:string,work_center_description:string, matl_description:string,resource_description:string,resource_group_description:string,plant_code:string) : Promise<any> {
        let params =new URLSearchParams();
        params.set('pageNum',pageNum);
        params.set('count ', count );
        params.set('work_center_description', work_center_description );
        params.set("matl_description", matl_description);
        params.set('resource_description',resource_description);
        params.set('resource_group_description',resource_group_description);
        params.set('plant_code',plant_code);
        return this.http.post(MAPPINGVALUE,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getRuleValueList(pageNum:string, count:string,rule_inst_name:string) : Promise<any> {
        let params =new URLSearchParams();
        params.set('pageNum',pageNum);
        params.set('count ', count );
        params.set('description', rule_inst_name);
        return this.http.post(GEIRULEVALUE,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getunitConversionList(pageNum:string, count:string,matl_description:string, plant_code:string) : Promise<any> {
        let params =new URLSearchParams();
        params.set('pageNum',pageNum);
        params.set('count ', count );
        params.set('matl_description', matl_description);
        params.set("plant_code", plant_code);
        return this.http.post(UNITCONVER,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

   
    getsetupList(pageNum:string, count:string,resourceType:string,secondMatlDesc:string,plantCode:string,firstMatlDesc:string) : Promise<any> {
        let params =new URLSearchParams();
        params.set('pageNum',pageNum);
        params.set('count ', count );
        params.set('resourceDesc', resourceType);
        params.set("firstMatlDesc", secondMatlDesc);
        params.set('secondMatlDesc',plantCode);
        params.set("plantCode",  firstMatlDesc);
        return this.http.post(SETUPLIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getsequenceList(pageNum:string, count:string,router_step_description:string, next_router_step_description:string) : Promise<any> {
        let params =new URLSearchParams();
        params.set('pageNum',pageNum);
        params.set('count ', count );
        params.set('router_step_description', router_step_description );
        params.set("next_router_step_description", next_router_step_description);
        return this.http.post(GETROUTERNEXTSTEP,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    adddeploy(param:any) : Promise<any> {
       let params = this.setdeployParams(param);
        return this.http.post(ADDDEPLOY,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    addsequence(param:any) : Promise<any> {
        let params = this.setsequenceParams(param);
         return this.http.post(ADDROUTERNEXTSTEP,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

    addMatchingFor(param:any) : Promise<any> {
        let params = this.setMatchingParams(param);
         return this.http.post(ADDMAPPINGVALUE,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

    addruleValueDesc(param:any) : Promise<any> {
        let params = this.setRulevaleParams(param);
         return this.http.post(ADDRULEVALUE,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

    addUnitConversion(param:any) : Promise<any> {
        let params = this.setUnitConversionParams(param);
         return this.http.post(ADDUNITCONVER,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

    addProgramMatrix(param:any) : Promise<any> {
        let params = this.setProgeamMatrixParams(param);
         return this.http.post(ADDSETUPOPTION,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }
    
    addprocess(param:any) : Promise<any> {
        let params = this.setprocessParams(param);
         return this.http.post(FINDROUTER,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

    getaddgongYi(): Promise<any> {
        return this.http.post(GETGONGYI,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getaddgyOption(): Promise<any> {
        return this.http.post(GETROUOTEOPTION,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    

    getgzzx(): Promise<any> {
        return this.http.post(WORKGETOPTION,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getmatl(): Promise<any> {
        return this.http.post(GETMATLDEC,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getaddgongchang(): Promise<any> {
        return this.http.post(PLANT_LIST,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getadddanwei(): Promise<any> {
        return this.http.post(SETUPOPTION,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    

    getgongYidanwei(): Promise<any> {
        return this.http.post(UNITLISTS,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getgyNo(): Promise<any> {
        return this.http.post(SETETEDEPLOY,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getgybh(): Promise<any> {
        return this.http.post(SELECTOPTIONS,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    updatedeploy(param:any) : Promise<any> {
        let params =   this.updatedeployParams(param);
         return this.http.post(UPDATEDEPLOY,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     updatematching(param:any) : Promise<any> {
        let params =   this.setmatchingParams(param);
         return this.http.post(UPDATEMAPPINGVALUE,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     getResourceList() : Promise<any> {
         return this.http.post(GETRESOURCElIST,null).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     getResourceLists(resource_description:string,count:string,pageNum:string) : Promise<any> {
        let params =new URLSearchParams();
        params.set('description',resource_description);
        params.set('count',count);
        params.set('pageNum',pageNum);
        return this.http.post(GETRESOURCElIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }


     updateRuleValue(param:any) : Promise<any> {
        let params =   this.setRuleValuesParams(param);
         return this.http.post(UPDATERULEVALUE,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     updateUnitConversion(param:any) : Promise<any> {
        let params =   this.setUnitConversionParam(param);
         return this.http.post(UPDATEUNITCONVER,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     updateProgramMatrix(param:any) : Promise<any> {
        let params =   this.updateProgeamMatrixParams(param);
         return this.http.post(UPDATESETUPOPTION,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     deletedeploy(id:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("routerId", id);
         return this.http.post(DELETEDEPLOY,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     deletematching(id:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("routerId", id);
         return this.http.post(DELETEMAPPINGVALUE,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     deleteRuleValue(id:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("id", id);
         return this.http.post(DELETERULEVALUE,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }
     

     deleteUnitConversion(id:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("id", id);
         return this.http.post(DELETEUNITCONVER,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }
     
     deleteprogram(id:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("Id", id);
         return this.http.post(DELETESETUPOPTION,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }
      
     getstep(pageNum:string, count:string,router_id:string, step_code:string,operation_description:string) : Promise<any> {
        let params =new URLSearchParams();
        params.set('pageNum',pageNum);
        params.set('count', count );
        params.set('router_id', router_id  );
        params.set("step_code", step_code );
        params.set("operation_description", operation_description);
        return this.http.post(ROUTER,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    matlUpload(formData:FormData) {
        return this.http.post(IMPORT_MATL,formData).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    setdeployParams(param:any) {
        let params =new URLSearchParams();
        params.set("plantCode", param.plantCode );
        params.set("routerCode", param.routerCode );
        params.set("routerType", param.routerType  );
        params.set("revision", param.revision );
        params.set('currentRevision',param.currentRevision );
        params.set("bomId", param.bomId);
        params.set("validStartTimeStamp",param.validStart.valueOf());
        params.set("validEndTimeStamp",param.validEnd.valueOf());
        params.set("description",param.description );
        params.set("statusId",param.statusId);
        params.set("id",param.id);
        return params;
    }

    setsequenceParams(param:any) {
        let params =new URLSearchParams();
        params.set("router_step_id", param.router_step_id );
        params.set("next_router_step_id", param.next_router_step_id );
        return params;
    }

    updatedeployParams(param:any) {
        let params =new URLSearchParams();
        params.set("plantCode", param.plantCode );
        params.set("routerCode", param.routerCode );
        params.set("routerType", param.routerType  );
        params.set("revision", param.revision );
        params.set('currentRevision',param.currentRevision );
        params.set("bomId", param.bomId);
        params.set("validStartTimeStamp",param.validStart.valueOf());
        params.set("validEndTimeStamp",param.validEnd.valueOf());
        params.set("description",param.description );
        params.set("statusId",param.statusId);
        params.set("id",param.id);
        return params;
    }
    
    setmatchingParams(param:any) {
        let params =new URLSearchParams();
        params.set("plant_code", param.plant_code);
        params.set("work_center_id", param.short_description);
        params.set("scada_recipe_id", param.scada_recipe_id);
        params.set("matl_code", param.matl_code);
        params.set('matl_name',param.matl_name);
        params.set("revision", param.revision);
        params.set("operation",param.operation);
        params.set("resource_id",param.resource_id);
        params.set("resource_name",param.resource_name );
        params.set("description",param.description);
        params.set("id",param.id);
        return params;
    }

    setMatchingParams(param:any) {
        let params =new URLSearchParams();
        params.set("plant_code", param.plant_code);
        params.set("work_center_id", param.short_description);
        params.set("scada_recipe_id", param.scada_recipe_id);
        params.set("matl_code", param.matl_code);
        params.set('matl_name',param.matl_name);
        params.set("revision", param.revision);
        params.set("operation",param.operation);
        params.set("resource_id",param.resource_id);
        params.set("resource_name",param.resource_name);
        params.set("description",param.description);
        return params;
    }
    
    setRuleValuesParams(param:any) {
        let params =new URLSearchParams();
        params.set("id", param.id);
        params.set("rule_inst_id", param.rule_inst_id);
        params.set("rule_inst_name", param.rule_inst_name);
        params.set("value", param.value);
        params.set('description',param.description );
        return params;
    }

    setRulevaleParams(param:any) {
        let params =new URLSearchParams();
        params.set("rule_inst_id", param.rule_inst_id );
        params.set("rule_inst_name", param.rule_inst_name);
        params.set("value", param.value);
        params.set("description", param.description);
        return params;
    }

    setRuleValueParams(param:any) {
        let params =new URLSearchParams();
        params.set("rule_inst_id", param.rule_inst_id );
        params.set("rule_inst_name", param.rule_inst_name);
        params.set("value", param.value);
        params.set("description", param.description);
        return params;
    }

    setUnitConversionParam(param:any) {
        let params =new URLSearchParams();
        params.set("id", param.id);
        params.set("matl_id", param.matl_id);
        params.set("matl_name", param.matl_name);
        params.set("plant_code", param.plant_code);
        params.set("base_unit_quantity", param.base_unit_quantity);
        params.set('unit_id',param.unit_id);
        params.set("convert_unit_quantity", param.convert_unit_quantity);
        params.set("convert_unit_id",param.convert_unit_id);
        return params;
    }

    setUnitConversionParams(param:any) {
        let params =new URLSearchParams();
        params.set("matl_id", param.matl_id);
        params.set("matl_name", param.matl_name);
        params.set("plant_code", param.plant_code);
        params.set("base_unit_quantity", param.base_unit_quantity);
        params.set('unit_id',param.unit_id);
        params.set("convert_unit_quantity", param.convert_unit_quantity);
        params.set("convert_unit_id",param.convert_unit_id);
        return params;
    }
    
    setProgeamMatrixParams(param:any) {
        let params =new URLSearchParams();
        params.set("plantCode", param.plantCode);
        params.set("resourceType", param.resourceType );
        params.set("resourceId", param.resourceId );
        params.set("resourceDesc", param.resourceDesc );
        params.set('firstMatlId',param.firstMatlId );
        params.set("firstMatlDesc", param.firstMatlDesc );
        params.set("secondMatlId",param.secondMatlId );
        params.set("secondMatlDesc",param.secondMatlDesc );
        params.set("setupTime",param.setupTime );
        params.set("unitId",param.unit_id);
        return params;
    }

    updateProgeamMatrixParams(param:any) {
        let params =new URLSearchParams();
        params.set("id", param.id);
        params.set("plantCode", param.plantCode);
        params.set("resourceType", param.resourceType );
        params.set("resourceId", param.resourceId );
        params.set("resourceDesc", param.resourceDesc );
        params.set('firstMatlId',param.firstMatlId );
        params.set("firstMatlDesc", param.firstMatlDesc );
        params.set("secondMatlId",param.secondMatlId );
        params.set("secondMatlDesc",param.secondMatlDesc );
        params.set("setupTime",param.setupTime );
        params.set("unitId",param.unit_id);
        return params;
    }

    setprocessParams(param:any) {
        let params =new URLSearchParams();
        params.set("routerId", param.routerId);
        params.set("stepCode", param.stepCode);
        params.set("operationId", param.operationId);
        params.set("description", param.description);
        params.set('basicQuantity',param.basicQuantity);
        params.set("quantityUnitId", param.quantityUnitId);
        params.set("timeInProcess",param.timeInProcess);
        params.set("timeUnitId",param.timeUnitId);
        return params;
    }
    
    getBrandTipsList(rule_inst_desc:string, count:any, pageNum:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("rule_inst_desc", rule_inst_desc);
        params.set("pageNum", pageNum);
        params.set("count", count);
        return this.http.post(RULEVALUECANLIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getmathName(matl_name:string,count:string, pageNum:string) : Promise<any> {
        let params =new URLSearchParams();
        params.set('matl_name',matl_name);
        params.set('count',count);
        params.set('pageNum',pageNum);
        return this.http.post(SELECTTYPE,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getMaltList(): Promise<any> {
        return this.http
          .post(MALT_LIST, null)
          .toPromise()
          .then(this.extractData)
          .catch(this.handleError);
    }

    getresourceName(resource_description:string,count:string, pageNum:string) : Promise<any> {
        let params =new URLSearchParams();
        params.set('resource_description',resource_description);
        params.set('count',count);
        params.set('pageNum',pageNum);
        return this.http.post(SELECTOPTINS,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    

    addBrand(param:any) : Promise<any> {
        let params =   this.setBrandParams(param);
         return this.http.post(ADD_BRAND,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }
 
    updateBrand(param:any) : Promise<any> {
        let params =   this.setBrandParams(param);
        params.set("brand_id", param.brand_id);
        return this.http.post(UPDATE_BRAND,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    deleteBrand(brand_id:string,last_update_by:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("brand_id", brand_id);
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
        return this.http.post(DELETE_BRAND,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    brandUpload(formData:FormData) {
        return this.http.post(IMPORT_BRAND,formData).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }


    setBrandParams(param:any) {
        let params =new URLSearchParams();
        params.set("brand_code", param.brand_code);
        params.set("brand_short_name", param.brand_short_name);
        params.set("brand_name", param.brand_name);
        params.set("remark", param.remark);
        params.set('is_valid',param.is_valid);
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
        return params;
    }

    getMatlPlantList(matl_code:string,plant_code:string,matl_name:string, pageIndex:any, pageSize:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("matl_name", matl_name);
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        params.set("matl_code", matl_code);
        params.set("plant_code", plant_code);
        return this.http.post(MATL_PLANT_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
        
    }

    addMatlPlant(param:any) : Promise<any> {
        let params =   this.setMatlPlant(param);
         return this.http.post(ADD_MATL_PLANT,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }
 
     updateMatlPlant(param:any) : Promise<any> {
        let params =   this.setMatlPlant(param);
        params.set("id", param.id);
        return this.http.post(UPDATE_MATL_PLANT,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    updatesequenceOption(param:any) : Promise<any> {
        let params =   this.setsequenceOptions(param);
        params.set("id", param.id);
        return this.http.post(UPDATEROUTERNEXTSTEP,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    deletesequence(id:string,last_update_by:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("id", id);
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
        return this.http.post(DELETEROUTERNEXTSTEP,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    deleteMatlPlant(id:string,last_update_by:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("id", id);
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
        return this.http.post(DELETE_MATL_PLANT,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    setMatlPlant(param:any) {
        let params =new URLSearchParams();
        params.set("plant_code", param.plant_code);
        params.set("matl_id", param.matl_id);
        params.set('is_valid',param.is_valid);
        params.set("last_update_by",this.dataService.userInfo.value.user.id);
        return params;
    }

    setsequenceOptions(param:any) {
        let params =new URLSearchParams();
        params.set("router_step_id", param.router_step_id);
        params.set("next_router_step_id", param.next_router_step_id);
        return params;
    }

    matlPlantUpload(formData: FormData) {
        return this.http.post(IMPORT_MATL_PLANT, formData).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

   
    getMatlOtherList(matl_code:string,speed:string,subitem:string,volume:string,matl_name:string, pageIndex:any, pageSize:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("matl_name", matl_name);
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        params.set('subitem',subitem);
        params.set('volume',volume);
        params.set('speed',speed);
        params.set('matl_code',matl_code);
        return this.http.post(MATL_OTHER_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
        
    }

    deleteprocess(id:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("routerStepId", id);
        return this.http.post(DELETEROUTER,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    updateprocess(param:any) : Promise<any> {
        let params =   this.setprocess(param);
        return this.http.post(UPDATEROUTER,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    deleteMatlOther(id:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("id", id);
        return this.http.post(DELETE_MATL_OTHER,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    setprocess(param:any) {
        let params =new URLSearchParams();
        params.set("id", param.id);
        params.set("routerId", param.routerId);
        params.set("stepCode", param.stepCode);
        params.set('operationId',param.operationId);
        params.set('description',param.description);
        params.set("basicQuantity",param.basicQuantity);
        params.set("quantityUnitId",param.quantityUnitId);
        params.set("timeInProcess",param.timeInProcess);
        params.set("timeUnitId",param.timeUnitId);
        return params;
    }

    matlOtherUpload(formData: FormData) {
        return this.http.post(IMPORT_MATL_OTHER, formData).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
}
 