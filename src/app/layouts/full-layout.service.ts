import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { USER_MODIFY_PASSWORD, ALARM_H_LIST } from '../app.constants';
import { ResService } from '../core/common/res.service';
import {Md5} from "ts-md5/dist/md5";
import { DataService } from "../DataService";


@Injectable()
export class  FullLayoutService extends ResService{

    constructor( private http: Http, private dataService: DataService) {
        super();
    }

     modifyPassword(param:any) : Promise<any> {
        
        let params =new URLSearchParams();
        params.set("account_name", this.dataService.userInfo.value.user.account_name);
        params.set("new_password", Md5.hashStr(param.new_password).toString());
        params.set("current_password", Md5.hashStr(param.current_password).toString());
        return this.http.post(USER_MODIFY_PASSWORD,params).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    getHAlarmList(): Promise<any> {
        let params = new URLSearchParams();
        params.set("user_id", this.dataService.userInfo.value.user.id);
        return this.http.post(ALARM_H_LIST, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

}