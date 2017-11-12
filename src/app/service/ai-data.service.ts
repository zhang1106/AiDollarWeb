import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { IPortfolio } from './portfolio';
import { IGuru } from './guru';
import {ISecurityHolding} from './securityHold';

@Injectable()
export class AiDataService {
  private _holdingUrl = 'assets/portfolios.json';
  private _holding0Url = 'assets/portfolio0.json';
  private _guruUrl = 'assets/guru.json';
  private _secHoldUrl = 'assets/securityHolding.json';

  constructor(private _http: Http) { }

  getGurus(): Observable<IGuru[]> {
    return this._http.get(this._guruUrl)
      .map((response: Response) => <IGuru[]>response.json())
      .catch(this.handleError);
  }
  
  getPortfolio0(): Observable<IPortfolio[]> {
    return this._http.get(this._holding0Url)
      .flatMap((response: Response) => <IPortfolio[]>response.json())
      .catch(this.handleError);
  }

  getPortfolio(): Observable<IPortfolio[]> {
    return this._http.get(this._holdingUrl)
      .map((response: Response) => <IPortfolio[]>response.json())
      .catch(this.handleError);
  }

  getSecurtiyPortfolio(): Observable<ISecurityHolding[]> {
    return this._http.get(this._secHoldUrl)
      .map((response: Response) => <ISecurityHolding[]>response.json())
      .catch(this.handleError);
  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || "Sever error");
  }

}
