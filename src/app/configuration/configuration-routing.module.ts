import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './configuration.component';
import { EqtComponent } from './eqt/eqt.component';
import { UnitComponent } from './unit/unit.component';
import { FactoryComponent } from './factory/factory.component';
import { OrderTypeComponent } from './orderType/orderType.component';

import { EqtTypeComponent } from './eqtType/eqt-type.component';

import { PropComponent } from './prop/prop.component';
import { MatlTabComponent } from './matl/matl-tab.component';
import { BrandComponent } from './matl/brand.component';

import { EqtTabComponent } from './eqt/eqt-tab.component';
import { RuleComponent } from './rule/rule.component';
import { CustomizedTypeComponent } from './customizedType/customized-type.component';
import { CustomizedItemComponent } from './customizedItem/customized-item.component';
import { ActionComponent } from './action/action.component';
import { TechnologyComponent } from './technology/technology.component';
import { OrgComponent } from './eqt/org.component';
import { ProgramMatrixComponent } from './program-matrix/program-matrix.component';
import { UnitConversionComponent } from './unit-conversion/unit-conversion.component';
import { RuleValueDescriptionComponent } from './rule-value-description/rule-value-description.component';
import { MatchingFormulaMaterialsComponent } from './matching-formula-materials/matching-formula-materials.component';

 
import { KpiComponent } from './kpi/kpi.component';
import { ShiftComponent } from './shift/shift.component';
import { StatusComponent } from './status/status.component';
import { ProcessComponent} from './process/process.component';
import { ResourceTabComponent} from './resource/resource-tab.component';
import { BomTabComponent} from './bom/bom-tab.component';
const routes: Routes = [
    {
        path:'',
        component:ConfigurationComponent,
        data:{
            title:'配置与初始化'
        },
        children: [
            {
                path:'eqt',
                component: OrgComponent,
                data:{
                    title:'设备资产',
                    keep:true
                }
            },
            {
                path:'eqt-tab',
                component:EqtTabComponent,
                data:{
                    title:'设备资产'
                }
            },
            {
                path:'unit',
                component:UnitComponent,
                data:{
                    title:'单位'
                }
            } ,
            {
                path:'factory',
                component:FactoryComponent,
                data:{
                    title:'工厂'
                }
            },{
                path:'orderType',
                component:OrderTypeComponent,
                data:{
                    title:'订单类型'
                }
            },
            {
                path:'eqtType',
                component:EqtTypeComponent,
                data:{
                    title:'设备类型'
                }
            } ,
            {
                path:'brand',
                component:BrandComponent,
                data:{
                    title:'品牌'
                }
            } ,
            {
                path:'prop',
                component:PropComponent,
                data:{
                    title:'属性'
                }
            } ,
            {
                path:'matl',
                component:MatlTabComponent,
                data:{
                    title:'物料'
                }
            } ,
            {
                path:'rule',
                component:RuleComponent,
                data:{
                    title:'计算规则'
                }
            },
            
            {
                path:'customizedType',
                component:CustomizedTypeComponent,
                data:{
                    title:'自定义类型'
                }
            },
            {
                path:'customizedItem',
                component:CustomizedItemComponent,
                data:{
                    title:'自定义值集'
                }
            },
            {
                path:'action',
                component:ActionComponent,
                data:{
                    title:'行动方案'
                }
            },
            {
                path:'kpi',
                component:KpiComponent,
                data:{
                    title:'KPI指标'
                }
            },
            {
                path:'shift',
                component:ShiftComponent,
                data:{
                    title:'班次配置'
                }
            },
            {
                path:'status',
                component:StatusComponent,
                data:{
                    title:'业务状态'
                }
            },{
                path:'operation',
                component:ProcessComponent,
                data:{
                    title:'工序配置'
                }
            },
            {
                path:'resource',
                component:ResourceTabComponent,
                data:{
                    title:'资源'
                }
            },
            {
                path:'Router',
                component:TechnologyComponent,
                data:{
                    title:'工艺'
                }
            },
            {
                path:'T_Setupmatrix',
                component:ProgramMatrixComponent,
                data:{
                    title:'程序矩阵'
                }
            },
            {
                path:'T_Unitconversion',
                component:UnitConversionComponent,
                data:{
                    title:'单位换算'
                }
            },
            {
                path:'T_Valuedescmap',
                component:RuleValueDescriptionComponent,
                data:{
                    title:'规则值描述'
                }
            },
            {
                path:'T_Mappingrecipematl',
                component:MatchingFormulaMaterialsComponent,
                data:{
                    title:'配方物料匹配'
                }
            }
            ,{
                path:'bom',
                component:BomTabComponent,
                data:{
                    title:'BOM'
                }
            }
            
            
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule]
})
export class ConfigurationRoutingModule {}