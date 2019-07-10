import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { FullLayoutComponent } from './layouts/full-layout.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path:'',
        component:FullLayoutComponent,
        children:[
            {
                path:'fun-select',
                loadChildren:'./fun-select/fun-select.module#FunSelectModule'
            },
            {
                path:'tag',
                loadChildren:'./tag/tag.module#TagModule'
            },
            {
                path:'base',
                loadChildren:'./base/base.module#BaseModule'
            },
            {
                path:'me',
                loadChildren:'./me/me.module#MEModule'
            },
            {
                path:'configuration',
                loadChildren:'./configuration/configuration.module#ConfigurationModule'
            },
            {
                path:'order',
                loadChildren:'./order/order.module#OrderModule'
            }
            ,
            {
                path:'statistics-report',
                loadChildren:'./statistics/statistics.module#StatisticsModule'
            }
            
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
 
})
export class AppRoutingModule { }