import { Injectable } from '@angular/core';
import { LocalStorage } from './local.storage';

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl: string;
  userInfo:any = null;
  
  constructor(private store: LocalStorage ) {

  }
  
  public isLogin(): boolean {
    this.userInfo = this.store.get("userInfo");
    if(this.userInfo) {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  public logout(): void {
    this.isLoggedIn = false;
    this.userInfo = null;
    this.store.remove("userInfo");
  }
}
