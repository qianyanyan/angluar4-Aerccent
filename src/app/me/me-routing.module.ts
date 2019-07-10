import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MEIndexComponent } from './me-index.component';
import { GXCJComponent } from './GXCJ.component';

const routes: Routes = [
    {
        path:'',
		component:MEIndexComponent,
        data:{
            title:'浸出物报表'
        },
        children: [
//      {
//              path:'index',
//              component:MEIndexComponent,
//              data:{
//              title:'浸出物损失报表'
//              }
//          },
            {
                path:'GXCJ',
                component:GXCJComponent,
                data:{
                title:'工序层级'
                }
            }    
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule]
})
export class MERoutingModule {}