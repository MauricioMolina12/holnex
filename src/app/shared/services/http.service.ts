import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public horizon: string = environment.domain;
  public baseUrl: string = environment.serverUrl;
  public baseLambdaUrl = environment.serverLambdaUrl;
  public baseRetry: number = 4;
  static idtoken: string;

  constructor(public http: HttpClient) {}

  public getHeaders(): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + HttpService.idtoken,
    });
    return { headers };
  }

  public get(url: string, base?: any, header?: any) {
    url = base !== false ? (base || this.baseLambdaUrl) + url : url;
    header = header !== false ? header || this.getHeaders() : header;
    return this.http.get(url, header);
  }

  public post(url: string, data: any, base?: any, header?: any) {
    url = base !== false ? (base || this.baseLambdaUrl) + url : url;
    header = header !== false ? header || this.getHeaders() : header;
    return this.http.post(url, data, header);
  }

  public put(url: string, data: any, base?: any, header?: any) {
    url = base !== false ? (base || this.baseLambdaUrl) + url : url;
    header = header !== false ? header || this.getHeaders() : header;
    return this.http.put(url, data, header);
  }

  public delete(url: string, base?: any, header?: any) {
    url = base !== false ? (base || this.baseLambdaUrl) + url : url;
    header = header !== false ? header || this.getHeaders() : header;
    return this.http.delete(url, header);
  }

  public valData(type: number, params: any): any {
    switch (type) {
      case 0:
        // Default
        return this.isError(params.x, 'Error');
      case 1:
        return this.isError(params.x, params.y);
      case 2:
        return this.isErrorLambda(params);
      case 3:
        return this.isErrorGraphQL(params, 'data');
      case 4:
        return this.isErrorGraphQL(params.x, params?.y, params?.z);
      default:
        return {
          is: false,
          msg: 'Invalid parameter type:(' + type + ') in valData'
        };
    }
  }

  public isError(resData: any, errorName: string): any {
    // Valid response de JSON, Error...
    if (this.isJsonString(JSON.stringify(resData))) {
      if (resData == null || resData == undefined) {
        return { is: false, msg: 'Answer with error' };
      } else if (resData instanceof Array) {
        return { is: true, msg: 'Ok Array' };
      } else if (resData.hasOwnProperty('data')) {
        if (resData.data == null || resData.data == undefined) {
          return { is: false, msg: 'Answer with error' };
        } else if (resData.data instanceof Array) {
          return { is: true, msg: 'Ok Array' };
        } else if (resData.data.hasOwnProperty('Status')) {
          if (resData.data.Status == false) {
            localStorage.clear();
            sessionStorage.clear();
            // window.location.href = this.url_Base + "/users/login";
            return { is: false, msg: 'Answer with error' };
          } else {
            return { is: true, msg: 'Ok Value' };
          }
        } else {
          return { is: true, msg: 'Ok Value' };
        }
      } else {
        return { is: true, msg: 'Ok Value' };
      }
    } else {
      return { is: false, msg: 'Invalid json response' };
    }
  }

  public isErrorLambda(resData: any): any {
    if (this.isJsonString(JSON.stringify(resData))) {
      if (resData == null || resData == undefined) {
        return { is: false, msg: 'Respond with null or undefined' };
      } else if (resData.hasOwnProperty('status')) {
        if (resData.status) {
          if (resData.hasOwnProperty('data')) {
            return { is: true, msg: 'Ok Value' };
          } else {
            return { is: false, msg: 'Response does not contain the [data] property' };
          }
        } else {
          return { is: false, msg: 'Response contains false value in [status] property' };
        }
      } else {
        return { is: false, msg: 'Response does not contain the [status] property' };
      }
    } else {
      return { is: false, msg: 'Response does not contain a valid json' };
    }
  }

  public isErrorGraphQL(resData: any, param?: any, pValid?: any): any {
    if (this.isJsonString(JSON.stringify(resData))) {
      if (resData == null || resData == undefined) {
        return { is: false, msg: 'Respond with null or undefined' };
      } else if (param) {
        if (resData.hasOwnProperty(param)) {
          if (pValid) {
            if (resData[param] == pValid) {
              return { is: true, msg: 'Ok Value' };
            } else {
              return { is: false, msg: 'Response does not is the same as the [' + param + '] property' };
            }
          } else {
            return { is: true, msg: 'Ok Value' };
          }
        } else {
          return { is: false, msg: 'Response does not contain the [' + param + '] property' };
        }
      } else {
        return { is: true, msg: 'Ok Value' };
      }
    } else {
      return { is: false, msg: 'Response does not contain a valid json' };
    }
  }

  public isJsonString(strJson: string): boolean {
    // Validate JSON
    try {
      JSON.parse(strJson);
    } catch (e) {
      return false;
    }
    return true;
  }
}
