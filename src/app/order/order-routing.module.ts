import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { PlanningComponent } from './planning.component';
import { CurrentComponent } from './current.component';
import { AllOrderComponent } from './allOrder.component';

const routes: Routes = [
    {
        path:'',
        component:OrderComponent,
        data:{
            title:'订单管理'
        } ,
        children: [
            {
                path:'planning',
                component:PlanningComponent,
                data:{
                title:'生产计划'
                }
            },
            {
                path:'current',
                component:CurrentComponent,
                data:{
                title:'当前生产信息'
                }
            },
            {
                path:'allOrder',
                component:AllOrderComponent,
                data:{
                title:'批量订单查询'
                }
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule]
})
export class OrderRoutingModule {}