import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {IPortfolio } from './portfolio';

@Injectable()
export class AiDataService {
  private _dataUrl = 'assets/portfolios.json';
  constructor(private _http: Http) { }
  getPortfolio(): Observable<IPortfolio[]> {
    return this._http.get(this._dataUrl)
      .map((response: Response) => <IPortfolio[]>response.json())
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || "Sever error");
  }

}
