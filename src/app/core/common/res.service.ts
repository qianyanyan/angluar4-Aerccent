export class ResService {
    protected extractData(res: Response | any) {
        let body = res.json();
        return body || {}
    }

    protected handleError(error: Response | any ) {
        let errMsg: string;
        errMsg = '网络错误';
        return Promise.reject(errMsg);
    }
} 
