import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { IPortfolio } from './portfolio';
import {IGuru} from './guru';

@Injectable()
export class AiDataService {
  private _holdingUrl = 'assets/portfolios.json';
  private _guruUrl = 'assets/guru.json';

  constructor(private _http: Http) { }

  getGurus(): Observable<IGuru[]> {
    return this._http.get(this._guruUrl)
      .map((response: Response) => <IGuru[]>response.json())
      .catch(this.handleError);
  }

  getPortfolio(): Observable<IPortfolio[]> {
    return this._http.get(this._holdingUrl)
      .map((response: Response) => <IPortfolio[]>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || "Sever error");
  }

}
