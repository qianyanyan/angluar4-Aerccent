import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {  StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import {  StatisticsService } from './statistics.service'; 
import { BrewingComponent } from './brewing.component';
import { PackingComponent } from './packing.component';
import { UtilityComponent } from './utility.component';

@NgModule({
    imports:[
        SharedModule,
        StatisticsRoutingModule
    ],
    declarations:[
        StatisticsComponent,
        BrewingComponent,
        PackingComponent,
        UtilityComponent
    ],
    providers: [ StatisticsService]
})
export class  StatisticsModule { }
