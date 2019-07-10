import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { PlanningComponent } from './planning.component';
import { OrderService } from './order.service'; 
import { CurrentComponent } from './current.component';
import { AllOrderComponent } from './allOrder.component';
import { OrderReviewComponent } from './order-review/order-review.component';
import { InputOutputComponent } from './input-output/input-output.component';
import { InputDetailComponent } from './input-detail/input-detail.component';
import { OutputDetailComponent } from './output-detail/output-detail.component';
import { ModeMatlComponent } from './mode-matl.component';
import { requestOptionsProvider } from '../core/common/set-request.options';
import { AllOrderService } from './allOrder.service'; 
import { SyncStatusPipe} from './syncStatus.pipe';
import { OrderDataService } from './orderDataService';

@NgModule({
    imports:[
        SharedModule,
        OrderRoutingModule
    ],
    declarations:[
        OrderComponent,
        PlanningComponent,
        CurrentComponent,
        ModeMatlComponent,
        AllOrderComponent,
        OrderReviewComponent,
        InputOutputComponent,
        InputDetailComponent,
        OutputDetailComponent,
        SyncStatusPipe
    ], 
    providers: [OrderService, AllOrderService, requestOptionsProvider, OrderDataService]
})
export class OrderModule { }
