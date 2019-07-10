import { Injectable } from '@angular/core';

const ss = sessionStorage;

@Injectable()
 
export class SessionStorage {
  
  public localStorage : any;

  constructor() {}
  public get<T>(key: string): any {
    return JSON.parse(ss.getItem(key)) as T;
  }

  public getList<T>(key: string) {
    const before = ss.getItem(key);
    return before ? (JSON.parse(before) as T[]) : [];
  }

  public set(key: string, value: any): void {
    if (!value && value === undefined) { return; }
    const arr = JSON.stringify(value);
    ss.setItem(key, arr);
  }

  public remove(key:string):any {
    ss.removeItem(key);
 }
 }