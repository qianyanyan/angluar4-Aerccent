import { Injectable } from '@angular/core';
import { 
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  CanActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string) : boolean {
    // if(this.authService.isLoggedIn || this.authService.isLogin()) {
      if( this.authService.isLogin()) {
      return true;
    }
   
    this.authService.redirectUrl = url;
    //this.router.navigate(['pages/login']);
    this.router.navigate(['preview']);
    
    return false;
  }
}