import { Injectable } from '@angular/core';
import { BehaviorSubject,Subject } from 'rxjs';  

@Injectable()
export class OrderDataService {
    public plantList = [];
    public matlPlantList = [];
    public unitList = [];
    public shiftCategoryList = [];
    public workCenterList = [];
    public shopOrderTypeList = [];
    public scadaOpRunIdList = [];
    constructor() {
        
    }
    changePlantList(plantList: any): void {
        this.plantList= plantList;
    }
    changePlantMatlList(matlPlantList: any): void {
        this.matlPlantList = matlPlantList;
    }
    changeUnitList(unitList: any): void {
        this.unitList = unitList;
    }
    changeShiftCategoryList(shiftCategoryList: any) {
        this.shiftCategoryList = shiftCategoryList;
    } 
    changeWorkCenterList(workCenterList:any) {
        this.workCenterList = workCenterList;
    }

    changeShopOrderTypeList(shopOrderTypeList:any) {
        this.shopOrderTypeList = shopOrderTypeList
    }

    changeScadaOpRunIdList(scadaOpRunIdList:any) {
        this.scadaOpRunIdList = scadaOpRunIdList;
    }
}