import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions, RequestOptionsArgs,Headers } from '@angular/http';
import { LocalStorage } from './local.storage';

@Injectable()
export class SetRequestOptions extends BaseRequestOptions {

  constructor(private store: LocalStorage) {
    super();
  }

  merge (options?: RequestOptionsArgs) : RequestOptions {
    let headers = options.headers || new Headers;
    
    if(!headers.get('Authorization')) {
      headers.append('Authorization',"Bearer "+this.store.get('token'));
    }
    if (!headers.get('Content-Type')) {
      headers.append('Content-Type','application/x-www-form-urlencoded');
    }

    if(!headers.get('lang')) {
      headers.append('lang', this.store.get('lang'));

    }
    options.headers = headers;
  
    return super.merge(options);
  }
}

export const requestOptionsProvider = {
  provide: RequestOptions,
  useClass: SetRequestOptions
}
