import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { DataService } from "../DataService";
import { 
    ROLE_LIST,
    ADD_ROLE,
    UPDATE_ROLE,
    DELETE_ROLE,
    MODULE_LIST,
    ADD_MODULE,
    UPDATE_MODULE,
    DELETE_MODULE,
    DEPT_LIST,
    ADD_DEPT,
    UPDATE_DEPT,
    DELETE_DEPT,
    EMP_LIST,
    ADD_EMP,
    UPDATE_EMP,
    DELETE_EMP,
    USER_LIST,
    ADD_USER,
    UPDATE_USER,
    DELETE_USER,
    ROLE_USER,
    DEPT_USER,
    EQT_TREE,
    ROLE_INFO,
    ROLE_USER_LIST
} from '../app.constants';
import { ResService } from '../core/common/res.service';
import {Md5} from "ts-md5/dist/md5";
@Injectable()
export class BaseService extends ResService{

    constructor( private http: Http,private dataService: DataService) {
        super();
    }
    getRoleList(role_name:string,pageIndex:any, pageSize:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("role_name", role_name);
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        return this.http.post(ROLE_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    addRole(param) : Promise<any> {
        let params =new URLSearchParams();
        params.set("role_name", param.role_name);
        params.set("description",  param.description);
        params.set("last_update_by",  this.dataService.userInfo.value.user.id);
        params.set("module_id",  param.module_id);
        params.set("eqt_id",  param.eqt_id);
        params.set("eqt_btn_id",param.eqt_btn_id);
        return this.http.post(ADD_ROLE,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    } 
    updateRole(param) : Promise<any> {
        let params =new URLSearchParams();
        params.set("id", param.id);
        params.set("role_name", param.role_name);
        params.set("description",  param.description);
        params.set("last_update_by",  this.dataService.userInfo.value.user.id);
        params.set("module_id",  param.module_id);
        params.set("eqt_id",  param.eqt_id);
        params.set("eqt_btn_id",param.eqt_btn_id);
        return this.http.post(UPDATE_ROLE,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    } 
    deleteRole(id: any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("id", id);
        return this.http.post(DELETE_ROLE,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    } 

    getModuleList() : Promise<any> {
        return this.http.post(MODULE_LIST,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    addModule(param:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("module_name", param.module_name);
        params.set("parent_module_id", param.parent_module_id);
        params.set("class_name", param.class_name);
        params.set("module_type", param.module_type);
        params.set("sort", param.sort);
        params.set("url", param.url);
        params.set("last_update_by",this.dataService.userInfo.value.user.id);
        
        return this.http.post(ADD_MODULE,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    } 
    updateModule(param:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("id", param.id);
        params.set("module_name", param.module_name);
        params.set("parent_module_id", param.parent_module_id);
        params.set("class_name", param.class_name);
        params.set("module_type", param.module_type);
        params.set("sort", param.sort);
        params.set("url", param.url);
        params.set("last_update_by",this.dataService.userInfo.value.user.id);
        
        return this.http.post(UPDATE_MODULE,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    } 
    deleteModule(id: any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("id", id);
        return this.http.post(DELETE_MODULE,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    } 

    getDeptList() : Promise<any> {
        return this.http.post(DEPT_LIST,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    addDept(param:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("plant_code", param.plant_code);
        params.set("dept_code", param.dept_code);
        params.set("dept_name", param.dept_name);
        params.set("parent_dept_id", param.parent_dept_id);
        params.set("sort", param.sort);
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
        return this.http.post(ADD_DEPT,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    } 
    updateDept(param:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("id", param.id);
        params.set("plant_code", param.plant_code);
        params.set("dept_code", param.dept_code);
        params.set("dept_name", param.dept_name);
        params.set("parent_dept_id", param.parent_dept_id);
        params.set("sort", param.sort);
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
        return this.http.post(UPDATE_DEPT,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    } 
    deleteDept(id: any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("id", id);
        return this.http.post(DELETE_DEPT,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    } 

    getEmpList(emp_no:string,employee_name:string,pageIndex:any, pageSize:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("emp_no", emp_no);
        params.set("employee_name", employee_name);
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        return this.http.post(EMP_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    addEmp(param) : Promise<any> {
        let params =new URLSearchParams();
        params.set("emp_no", param.emp_no);
        params.set("employee_name", param.employee_name);
        params.set("mobile_phone", param.mobile_phone);
        params.set("biz_phone", param.biz_phone);
        params.set("email", param.email);
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
        return this.http.post(ADD_EMP,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    } 
    updateEmp(param) : Promise<any> {
        let params =new URLSearchParams();
        params.set("id", param.id);
        params.set("emp_no", param.emp_no);
        params.set("employee_name", param.employee_name);
        params.set("mobile_phone", param.mobile_phone);
        params.set("biz_phone", param.biz_phone);
        params.set("email", param.email);
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
        return this.http.post(UPDATE_EMP,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    } 
    deleteEmp(id: any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("id", id);
        return this.http.post(DELETE_EMP,params).toPromise()
        .then(this.extractData)
    }

    getUserList(param,pageIndex:any, pageSize:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("account_name", param.account_name);
        params.set("emp_no", param.emp_no);
        params.set("employee_name", param.employee_name);
        params.set("role_id", param.role_id);
        params.set("dep_id", param.dep_id);
        params.set("add_start_date", param.add_start_date);
        params.set("add_end_date", param.add_end_date);
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        return this.http.post(USER_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
    addUser(param) : Promise<any> {
        let params =new URLSearchParams();
        params.set("account_name", param.account_name);
        params.set("emp_id", param.emp_id);
        params.set("password", Md5.hashStr(param.password).toString());
        params.set("dept_id", param.dept_id);
        params.set("role_id", param.role_id);
        params.set("expire_date", param.expire_date);
        params.set("is_locked", param.is_locked ? '1' : '0');
        params.set("last_update_by",this.dataService.userInfo.value.user.id);
        return this.http.post(ADD_USER,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    } 
    updateUser(param) : Promise<any> {
        let params =new URLSearchParams();
        params.set("id", param.id);
        params.set("account_name", param.account_name);
        if(param.password) {
            params.set("password", Md5.hashStr(param.password).toString());
        }
        params.set("emp_id", param.emp_id);
        params.set("dept_id", param.dept_id);
        params.set("role_id", param.role_id);
        params.set("expire_date", param.expire_date);
        params.set("is_locked", param.is_locked ? '1' : '0');
        params.set("last_update_by", this.dataService.userInfo.value.user.id);
        return this.http.post(UPDATE_USER,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    } 
    deleteUser(id: any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("id", id);
        return this.http.post(DELETE_USER,params).toPromise()
        .then(this.extractData)
    }
    setRole(id: any, role_id:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("id", id);
        params.set("role_id", role_id);
        return this.http.post(ROLE_USER,params).toPromise()
        .then(this.extractData)
    }
    setDept(id: any, dept_id:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("id", id);
        params.set("dept_id", dept_id)
        return this.http.post(DEPT_USER,params).toPromise()
        .then(this.extractData)
    }
    
    getEqtTree() : Promise<any> {
        return this.http.post(EQT_TREE,null).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getRoleDetailInfo(id:any) : Promise<any> {
        let params =new URLSearchParams();
        params.set("id", id);
        return this.http.post(ROLE_INFO,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getRoleUserList(role_id:any,pageIndex:any, pageSize:any) :Promise<any> {
        let params =new URLSearchParams();
        params.set("role_id", role_id);
        params.set("pageNum", pageIndex);
        params.set("count", pageSize);
        return this.http.post(ROLE_USER_LIST,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
}