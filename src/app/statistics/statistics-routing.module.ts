import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './statistics.component';
import { BrewingComponent } from './brewing.component';
import { PackingComponent } from './packing.component';
import { UtilityComponent } from './utility.component';
const routes: Routes = [
    {
        path:'',
        component:StatisticsComponent,
        data:{
            title:'统计报表'
        },
        children: [
            {
                path:'brewing',
                component:BrewingComponent,
                data:{
                title:'酿造'
                }
            },
            {
                path:'packing',
                component:PackingComponent,
                data:{
                title:'包装'
                }
            } ,
            {
                path:'utility',
                component:UtilityComponent,
                data:{
                title:'动力'
                }
            } 
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule]
})
export class  StatisticsRoutingModule {}