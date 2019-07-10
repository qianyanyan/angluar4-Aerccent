import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FunSelectRoutingModule } from './fun-select-routing.module';
import { FunSelectComponent } from './fun-select.component';


@NgModule({
    imports:[
        SharedModule,
        FunSelectRoutingModule
    ],
    declarations:[
        FunSelectComponent
    ]
})
export class FunSelectModule { }
