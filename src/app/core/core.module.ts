import { BrowserModule, Title } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule,LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule} from '@angular/router';

 //核心指定与组件


//核心服务
import { LocalStorage } from './common/local.storage';
import { SessionStorage } from './common/session.storage';
import {requestOptionsProvider} from './common/set-request.options';
import { responseOptionsProvider } from './common/set-response.options';
import { AppRoutingCacheProvider } from './common/app-routing.cache';
import { AuthGuard } from './common/auth-guard.service';
import { AuthService } from './common/auth.service';
import { Verify } from './common/verify.service';
import { ResService } from './common/res.service';
import { Format } from './common/format.service';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    LocalStorage,   
    SessionStorage,
    requestOptionsProvider,
    responseOptionsProvider,
     AppRoutingCacheProvider,
    AuthGuard,
    AuthService,
    Title,
    Verify,
    ResService,
    Format
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error (
        'CoreModule is already loaded. Import it int the AppModule only');
    }
  }
}
