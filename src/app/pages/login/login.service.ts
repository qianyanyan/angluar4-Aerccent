import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { LOGIN } from '../../app.constants';
import { ResService } from '../../core/common/res.service';
import { Md5 } from "ts-md5/dist/md5";


@Injectable()
export class LoginService extends ResService {

    constructor(private http: Http) {
        super();
    }

    getLogin(accountName: any, password: any): Promise<any> {
        let params = new URLSearchParams();
        params.set("username", accountName);
        params.set("password", password);
        return this.http.post(LOGIN, params).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

}
