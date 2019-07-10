import { Injectable } from '@angular/core';
import { BehaviorSubject,Subject } from 'rxjs';
import { LocalStorage } from './core/common/local.storage';
import { NullTemplateVisitor } from '@angular/compiler';

@Injectable()
export class DataService {
    public currentMessage = new BehaviorSubject<string>('');
    public eqtItem = new BehaviorSubject<any>(this.store.get('eqtItem'));
    public eqtList = new BehaviorSubject<any>(this.store.get('eqtList'));
    public eqtTree = new BehaviorSubject<any>(this.store.get('eqtTree'));
    public isTAabBack = new BehaviorSubject(false);
    public eqtChildList = [];
    public currentAlarmNum = new BehaviorSubject<string>('');
    public userInfo = new BehaviorSubject<any>(this.store.get('userInfo'));
    public customized = new BehaviorSubject<any>({
        itemName:null,
        index:null,
        id:null,
    });
    constructor(private store:LocalStorage) {
        
    }

    setCustomized(obj:any) {
        this.customized.next(obj);
    }

    setAlarmNum(num:string) {
        this.currentAlarmNum.next(num);
    }

    changeMessage(message: string): void {
        this.currentMessage.next(message);
    }

    changeEqtType(eqtItem: any): void {
        this.store.set('eqtItem',eqtItem);
        this.eqtItem.next(eqtItem);
    }

    changeEqtList(eqtList: any): void {
        this.store.set('eqtList',eqtList);
        this.eqtList.next(eqtList);
    }

    changeTagBack(isTAabBack:any) {
        this.isTAabBack = isTAabBack;
        this.isTAabBack.next(isTAabBack);
    }

    changeEqtTree(eqtTree:any) {
        this.store.set('eqtTree',eqtTree);
        this.eqtTree.next(eqtTree);
    }

    getEqtIdList(id:string) :any {
        this.eqtChildList = [];
        this.getEqtChildList(id);
        return this.eqtChildList;
    }

    getEqtChildList(id:string): any {
        let list =  this.eqtTree.value;
        list    &&  list.forEach(value => {
            if (value.upper_eqt_id == id) {
                //判断是否有子集
                let isChild = false;
                //循环是否有子菜单
                list.forEach(d => {
                    if (value.id == d.upper_eqt_id) {
                    isChild = true;
                    }
                })
                this.eqtChildList.push(value.id);
                //是否有子菜单
                if (isChild) {
                    this.getEqtChildList(value.id);
                } 
            }
        });
    }

    changeUserInfo(userInfo:any) {
        this.userInfo.next(userInfo);
    }

}