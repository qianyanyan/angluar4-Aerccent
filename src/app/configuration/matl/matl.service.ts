import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataService } from "../../DataService";
import {
    MATL_LIST,
    ADD_MATL,
    UPDATE_MATL,
    DELETE_MATL,
    BRAND_LIST,
    ADD_BRAND,
    UPDATE_BRAND,
    DELETE_BRAND,
    MATL_PLANT_LIST,
    ADD_MATL_PLANT,
    UPDATE_MATL_PLANT,
    DELETE_MATL_PLANT,
    MATL_OTHER_LIST,
    ADD_MATL_OTHER,
    UPDATE_MATL_OTHER,
    DELETE_MATL_OTHER,
    IMPORT_BRAND,
    IMPORT_MATL,
    IMPORT_MATL_PLANT,
    IMPORT_MATL_OTHER
} from '../../app.constants';
import { ResService } from '../../core/common/res.service';

@Injectable()
export class MatlService extends ResService{
    constructor( private http: Http,private dataService: DataService) {
        super();
    }
    
    getMatlList(matl_name,pp_name,erp_name,pageIndex:any, pageSize:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set('matl_name',matl_name);
        params.set('brand_name',pp_name);
        params.set('erp_matl_code',erp_name);
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        return this.http.post(MATL_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    addMatl(param:any) : Promise<any> {
       let params = this.setMatlParams(param);
        return this.http.post(ADD_MATL,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    updateMatl(param:any) : Promise<any> {
        let params =   this.setMatlParams(param);
        params.set("matl_id", param.matl_id);
         return this.http.post(UPDATE_MATL,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

     deleteMatl(matl_id:string,last_update_by:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("matl_id", matl_id);
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
         return this.http.post(DELETE_MATL,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }

    matlUpload(formData:FormData) {
        return this.http.post(IMPORT_MATL,formData).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    setMatlParams(param:any) {
        let params =new URLSearchParams();
        params.set("matl_code", param.matl_code);
        params.set("brand_id", param.brand_id);
        params.set("erp_matl_code", param.erp_matl_code);
        params.set("matl_name", param.matl_name);
        params.set("remark", param.remark);
        params.set('is_valid',param.is_valid);
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
        return params;
    }
    
    getBrandList(search:any,pageIndex:any, pageSize:any,field:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        params.set("data", JSON.stringify(search));
        params.set("fieldSort",field.fieldSort );
        params.set("fieldOrderBy", field.fieldOrderBy);
        return this.http.post(BRAND_LIST,params).toPromise()
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

    deleteBrand(brand_ids:any,last_update_by:string): Promise<any> {
        let params =new URLSearchParams();
        params.set("brand_ids",JSON.stringify(brand_ids) );
        // params.set("last_update_by", this.dataService.userInfo.value.user.id);
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

    addMatlOther(param:any) : Promise<any> {
        let params = this.setMatlOther(param);
         return this.http.post(ADD_MATL_OTHER,params).toPromise()
         .then(this.extractData)
         .catch(this.handleError);
     }
 
     updateMatlOther(param:any) : Promise<any> {
        let params =   this.setMatlOther(param);
        return this.http.post(UPDATE_MATL_OTHER,params).toPromise()
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

    setMatlOther(param:any) {
        let params =new URLSearchParams();
        params.set("id", param.id);
        params.set("subitem", param.subitem);
        params.set("volume", param.volume);
        params.set('is_valid',param.is_valid);
        params.set('speed',param.speed);
        params.set("last_update_by",this.dataService.userInfo.value.user.id);
        return params;
    }

    matlOtherUpload(formData: FormData) {
        return this.http.post(IMPORT_MATL_OTHER, formData).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
}
 