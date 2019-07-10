import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HeaderComponent } from './header/header.component';
import { FunSelectComponent } from './fun-select/fun-select.component';


@NgModule({
    imports:[
        SharedModule,
        MainRoutingModule
    ],
    declarations:[
        MainComponent,
        HeaderComponent,
        FunSelectComponent
    ]
})
export class MainModule { }
