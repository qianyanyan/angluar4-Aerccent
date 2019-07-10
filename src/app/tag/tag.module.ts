import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TagIndexRoutingModule } from './tag-routing.module';
import { TagIndexComponent } from './tag-index.component';
import { TagTabComponent } from './tag-tab.component';
import { OverviewInfoComponent } from "./overview-info.component";
import { DetailInfoComponent } from './detail-info.component'; 
import { DetailTopTableComponent } from './detail-top-table.component';
import { DetailBottomTableComponent } from './detail-bottom-table.component';
import { ThreeDComponent } from './three-D.component';
import { ImgDirective } from './img.directive';
import { StatusPipe } from './status.pipe';
import { RunStatusPipe } from './run-status.pipe';
import { ThreeDTableComponent } from './three-d-table.component';
import { requestOptionsProvider } from '../core/common/set-request.options';

@NgModule({
    imports:[
        SharedModule,
        TagIndexRoutingModule
    ],
    declarations:[
        TagIndexComponent,
        TagTabComponent,
        OverviewInfoComponent,
        DetailInfoComponent,
        DetailTopTableComponent,
        DetailBottomTableComponent,
        ThreeDComponent,
        ImgDirective,
        StatusPipe,
        RunStatusPipe,
        ThreeDTableComponent
    ],
    providers: [requestOptionsProvider]
})
export class TagModule { }
