import { Injectable } from "@angular/core";
import { Http, URLSearchParams } from "@angular/http";
import { DataService } from "../DataService";
import {
  WH_ZT_SERVICE,
  WH_ALL_SERVICE,
  WH_XFQY_SERVICE,
  WH_TBMX_SERVICE,
  WH_DD_SERVICE,
  WH_GX_SERVICE,
  WH_GYCS_SERVICE,
  WH_ZT_FACTORYID,
  WH_XQEXCEL_SERVICE,
  WH_GETXFQYID_SERVICE,
  WH_DD_ORDER_NUMBER_SERVICE,
  WH_DD_MULTI_SERVICE,
  WH_GX_MULTI_SERVICE,
  WH_GYCS_MULTI_SERVICE,
  WH_SN_SERVICE
} from "../app.constants";
import { ResService } from "../core/common/res.service";
import { Md5 } from "ts-md5/dist/md5";
@Injectable()
export class MEService extends ResService {
  constructor(private http: Http, private dataService: DataService) {
    super();
  }

  getZZJG(): Promise<any> {
    return this.http
      .get(WH_ZT_SERVICE)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  getZTData(eqtId: any, startDate: any, endDate: any): Promise<any> {
    let params = new URLSearchParams();
    params.set("eqtId", eqtId.toString());
    params.set("startDate", startDate.toString());
    params.set("endDate", endDate.toString());
    return this.http
      .get(WH_ALL_SERVICE, { params: params })
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  //获取总图工厂默认id
  getFactoryID(data): Promise<any> {
    let params = new URLSearchParams();
    params.set("plantCode", data);

    return this.http
      .get(WH_ZT_FACTORYID, { params: params })
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  getXFQY(eqtId: any): Promise<any> {
    let params = new URLSearchParams();
    params.set("plantId", eqtId);
    return this.http
      .get(WH_XFQY_SERVICE, { params: params })
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  getTBMXData(eqtId: any, startDate: any, endDate: any): Promise<any> {
    let params = new URLSearchParams();
    params.set("eqtId", eqtId);
    params.set("startDate", startDate);
    params.set("endDate", endDate);
    return this.http
      .get(WH_TBMX_SERVICE, { params: params })
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getTab1Data(
    eqtId: any,
    startDate: any,
    endDate: any,
    pageNum: any,
    pageSize: any,
    orderBatch: any,
    shiftCateGory: any,
    queryParam
  ): Promise<any> {
    let params = new URLSearchParams();
    params.set("queryParam", queryParam);
    params.set("shiftCateGory", shiftCateGory);
    params.set("orderBatch", orderBatch);
    params.set("pageNum", pageNum);
    params.set("pageSize", pageSize);
    return this.http
      .get(WH_DD_SERVICE, { params: params })
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  orderList(
    eqtid: string,
    startDate: string,
    endDate: string,
    shiftCateGory: any,
    orderBatch: any
  ): Promise<any> {
    let params = new URLSearchParams();
    params.set("eqtId", eqtid); //细分区域
    params.set("startDate", startDate);
    params.set("endDate", endDate);
    params.set("shiftCateGory", shiftCateGory); //班次
    params.set("orderBatch", orderBatch); //订单编号集合
    return this.http
      .get(WH_DD_ORDER_NUMBER_SERVICE, { params: params })
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  selectOrderTab1(eqtId: any, startDate: any, endDate: any): Promise<any> {
    let params = new URLSearchParams();
    params.set("eqtId", eqtId);
    params.set("startDate", startDate);
    params.set("endDate", endDate);
    return this.http
      .get(WH_DD_ORDER_NUMBER_SERVICE, { params: params })
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getTab2Data(
    eqtId: any,
    startDate: any,
    endDate: any,
    pageNum: any,
    pageSize: any
  ): Promise<any> {
    let params = new URLSearchParams();
    params.set("eqtId", eqtId);
    params.set("startDate", startDate);
    params.set("endDate", endDate);
    params.set("pageNum", pageNum);
    params.set("pageSize", pageSize);
    return this.http
      .get(WH_GX_SERVICE, { params: params })
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getTab3Data(
    eqtId: any,
    startDate: any,
    endDate: any,
    pageNum: any,
    pageSize: any
  ): Promise<any> {
    let params = new URLSearchParams();
    params.set("eqtId", eqtId);
    params.set("startDate", startDate);
    params.set("endDate", endDate);
    params.set("pageNum", pageNum);
    params.set("pageSize", pageSize);
    return this.http
      .get(WH_GYCS_SERVICE, { params: params })
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  getTab1MultiData(
    queryParam: any,
    pageNum: any,
    pageSize: any,
    orderBy: any
  ): Promise<any> {
    let params = new URLSearchParams();
    params.set("queryParam", queryParam);
    params.set("pageNum", pageNum);
    params.set("pageSize", pageSize);
    params.set("orderBy", orderBy);
    return this.http
      .post(WH_DD_MULTI_SERVICE, params)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  getTab2MultiData(
    queryParam: any,
    pageNum: any,
    pageSize: any,
    orderBy: any
  ): Promise<any> {
    let params = new URLSearchParams();
    params.set("queryParam", queryParam);
    params.set("pageNum", pageNum);
    params.set("pageSize", pageSize);
    params.set("orderBy", orderBy);
    return this.http
      .post(WH_GX_MULTI_SERVICE, params)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  getTab3MultiData(
    queryParam: any,
    pageNum: any,
    pageSize: any,
    orderBy: any
  ): Promise<any> {
    let params = new URLSearchParams();
    params.set("queryParam", queryParam);
    params.set("pageNum", pageNum);
    params.set("pageSize", pageSize);
    params.set("orderBy", orderBy);
    return this.http
      .post(WH_GYCS_MULTI_SERVICE, params)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  DownLoadXQData(
    eqtId: any,
    startDate: any,
    endDate: any,
    dataType: any
  ): Promise<any> {
    let params = new URLSearchParams();
    params.set("eqtId", eqtId);
    params.set("startDate", startDate);
    params.set("endDate", endDate);
    params.set("dataType", dataType);
    return this.http
      .get(WH_XQEXCEL_SERVICE, { params: params })
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  selectEqtId(plantId: any, eqtName: string, eqtType: any): Promise<any> {
    let params = new URLSearchParams();
    params.set("plantId", plantId);
    params.set("eqtName", eqtName);
    params.set("eqtType", eqtType);
    return this.http
      .get(WH_GETXFQYID_SERVICE, { params: params })
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  getShortName(): Promise<any> {
    return this.http
      .get(WH_SN_SERVICE)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
}
