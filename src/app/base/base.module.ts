import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module'; 
import { BaseRoutingModule } from './bese-routing.module';
import { BaseComponent } from './base.component';
import { UserComponent } from './user.component';
import { EmpComponent } from './emp.component';
import { RoleComponent } from './role.component';
import {  DeptComponent } from './dept.component';
import { ModuleComponent } from './module.component';
import { ModeEmpComponent } from './mode-emp.component'; 
import { DeptSelectComponent } from './dept-select.component'; 
import { EqtSelectComponent } from './eqt-select.component'; 
import { ModuleSelectComponent } from './module-select.component'; 
import { ModeUserComponent } from './mode-user.component';
import { BaseService } from './base.service';

import { MenuTypePipe } from './menu-type.pipe'; 
import { LockedTypePipe } from './locked-type.pipe'; 

import { requestOptionsProvider } from '../core/common/set-request.options';
@NgModule({
    imports:[
        SharedModule,
        BaseRoutingModule,
        
    ],
    declarations:[
        BaseComponent,
        UserComponent,
        EmpComponent,
        RoleComponent,
        DeptComponent,
        ModuleComponent,
        ModeEmpComponent,
        DeptSelectComponent,
        EqtSelectComponent,
        ModuleSelectComponent,
        ModeUserComponent,
        MenuTypePipe,
        LockedTypePipe
    ],
    providers: [BaseService, requestOptionsProvider ]
})
export class BaseModule { } 
