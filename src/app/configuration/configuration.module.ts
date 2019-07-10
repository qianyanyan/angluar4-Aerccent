import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { EqtComponent } from './eqt/eqt.component';
import { UnitComponent } from './unit/unit.component';
import { FactoryComponent } from './factory/factory.component';
import { OrderTypeComponent } from './orderType/orderType.component';

import { EqtTypeComponent } from './eqtType/eqt-type.component';
import { PropComponent } from './prop/prop.component';
import { MatlTabComponent } from './matl/matl-tab.component';
import { MatlComponent } from './matl/matl.component';
import { ModeBrandComponent } from './matl/mode-brand.component';
import { BrandComponent } from './matl/brand.component';
import { MatlPlantComponent } from './matl/matl-plant.component';
import { ModeMatlComponent } from './matl/mode-matl.component';
import { MatlOtherComponent } from './matl/matl-other.component';
import { EqtTabComponent } from './eqt/eqt-tab.component';
import { EqtBaseInfoComponent } from './eqt/eqt-base-info.component';
import { PropInstComponent } from './eqt/prop-inst.component';
import { PropInstType } from './eqt/prop-inst-type.pipe';
import { ModePropComponent } from './eqt/mode-prop.component';
import { RuleInstComponent } from './eqt/rule-inst.component';
import { ModeRuleComponent } from './eqt/mode-rule.component';
import { RuleComponent } from './rule/rule.component';
import { CustomizedTypeComponent } from './customizedType/customized-type.component';
import { CustomizedItemComponent } from './customizedItem/customized-item.component';
import { ActionComponent } from './action/action.component';
import { actionTypeComponent } from './eqt/actionType.component';
import { OrgComponent } from './eqt/org.component';
import { KpiComponent } from './kpi/kpi.component';
import { ShiftComponent } from './shift/shift.component';
import { StatusComponent } from './status/status.component';

import { ProcessComponent } from './process/process.component';
import { ResourceComponent } from './resource/resource.component';
import { ResourceTabComponent } from './resource/resource-tab.component';
import { WorkCenterComponent } from './resource/work-center/work-center.component';
// import { OrderReviewComponent } from '../order/order-review/order-review.component';
// import { InputOutputComponent } from './../order/input-output/input-output.component';

import { OrgBaseInfoComponent } from './eqt/org-base-info.component';
import { TechnologyComponent } from './technology/technology.component';
import { deployComponent } from './technology/deploy.component';
import { processComponent } from './technology/process.component';
import { sequenceComponent } from './technology/sequence.component'
import { ResourceGroupComponent } from './resource/resource-group/resource-group.component';
import { ResourceGroupAssignmentComponent } from './resource/resource-group-assignment/resource-group-assignment.component';
import { BomTabComponent } from './bom/bom-tab.component';
import { BomDeployComponent } from './bom/bom-deploy/bom-deploy.component';
import { ProgramMatrixComponent } from './program-matrix/program-matrix.component';
import { UnitConversionComponent } from './unit-conversion/unit-conversion.component';
import { RuleValueDescriptionComponent } from './rule-value-description/rule-value-description.component';
import { MatchingFormulaMaterialsComponent } from './matching-formula-materials/matching-formula-materials.component';
import { BomComponentComponent } from './bom/bom-component/bom-component.component';
import { ModetipsComponent } from './rule-value-description/mode-tips.component';
import { ModeMatltopsComponent } from './matching-formula-materials/mode-matls.component';
import { ModeResourceComponent } from './matching-formula-materials/mode-resource.component';
import { ModeRListComponent } from './program-matrix/mode-resourceList.component';
import { BomStepComponent } from './bom/bom-step/bom-step.component';
import { BomIdComponent } from './bom/bom-step/bom-id/bom-id.component';
import { ModeMatlnameComponent } from './program-matrix/mode-matlName.component';
import { ModeMatlnameTwoComponent } from './program-matrix/mode-matltwo.component';
import { ModeMatlListNameComponent } from './unit-conversion/mode-matllist.component';
import { ModetipsresouleComponent } from './process/mode-resuoult-tips.component';
import { ModetipsGroupComponent } from './process/mode-group-tips.component'
import { ModetipsPanelComponent } from './resource/resource-group-assignment/modeTipPanel.component';
import { ModeBomDelopyComponent } from './bom/bom-deploy/mode-BomDelopy.component'
import { ModeBomCmptComponent } from './bom/bom-component/mode-BomComponent.component';
import { requestOptionsProvider } from '../core/common/set-request.options';
 
@NgModule({
    imports:[
        SharedModule,
        ConfigurationRoutingModule
    ],
    declarations:[
        ConfigurationComponent,
        EqtComponent,
        UnitComponent,
        FactoryComponent,
        OrderTypeComponent,
        EqtTypeComponent,
        actionTypeComponent,
        PropComponent,
        MatlTabComponent,
        MatlComponent,
        ModeBrandComponent,
        BrandComponent,
        MatlPlantComponent,
        ModeMatlComponent,
        MatlOtherComponent,
        EqtTabComponent,
        EqtBaseInfoComponent,
        PropInstComponent,
        PropInstType,
        ModePropComponent,
        RuleInstComponent,
        ModeRuleComponent,
        RuleComponent,
        CustomizedTypeComponent,
        CustomizedItemComponent,
        ActionComponent,
        OrgComponent,
        KpiComponent,
        ShiftComponent,
        StatusComponent,
        ProcessComponent,
        ResourceComponent,
        ResourceTabComponent,
        WorkCenterComponent,
        OrgBaseInfoComponent,
        TechnologyComponent,
        deployComponent,
        processComponent,
        sequenceComponent,
        ResourceGroupComponent,
        ResourceGroupAssignmentComponent,
        BomTabComponent,
        BomDeployComponent,
        ProgramMatrixComponent,
        UnitConversionComponent,
        RuleValueDescriptionComponent,
        MatchingFormulaMaterialsComponent,
        BomComponentComponent,
        ModetipsComponent,
        BomStepComponent,
        BomIdComponent,
        ModeMatltopsComponent,
        ModeResourceComponent,
        ModeRListComponent,
        ModeMatlnameComponent,
        ModeMatlnameTwoComponent,
        ModeMatlListNameComponent,
        ModetipsresouleComponent,
        ModetipsGroupComponent,
        ModetipsPanelComponent,
        ModeBomDelopyComponent,
        ModeBomCmptComponent
    ],
    providers: [requestOptionsProvider]
})
export class ConfigurationModule { }
