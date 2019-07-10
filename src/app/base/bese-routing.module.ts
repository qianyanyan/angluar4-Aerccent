import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base.component';
import { UserComponent } from './user.component';
import { EmpComponent } from './emp.component';
import { RoleComponent } from './role.component';
import { DeptComponent } from './dept.component';
import { ModuleComponent } from './module.component';
const routes: Routes = [
    {
        path:'',
        component:BaseComponent,
        data:{
            title:'权限管理'
        },
        children: [
            {
                path:'user',
                component:UserComponent,
                data:{
                title:'用户管理'
                }
            },{
                path:'emp',
                component:EmpComponent,
                data:{
                title:'员工管理'
                }
            },{
                path:'role',
                component:RoleComponent,
                data:{
                title:'角色管理'
                }
            },
            {
                path:'dept',
                component:DeptComponent,
                data:{
                title:'部门管理'
                }
            },{
                path:'module',
                component:ModuleComponent,
                data:{
                title:'模块管理'
                }
            }    
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule]
})
export class BaseRoutingModule {}