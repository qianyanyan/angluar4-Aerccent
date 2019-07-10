import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MERoutingModule } from './me-routing.module';
import { MEIndexComponent } from './me-index.component';
import { GXCJComponent } from './GXCJ.component';
import { TabFromcomponent } from './tabForm.component';
import { TabGYcomponent } from './tabGY.component';
import { TabProcedure } from './tabProcedure.component';

@NgModule({
	imports: [
		SharedModule,
		MERoutingModule,

	],
	declarations: [
		MEIndexComponent,
		GXCJComponent,
		TabFromcomponent,
		TabGYcomponent,
		TabProcedure

	],
	//  providers: [ MEService ],
	exports: [
		TabFromcomponent,
		TabGYcomponent,
		TabProcedure
	]
})
export class MEModule {}