import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {IHoldIdxByCik } from './portfolio';
import { IGuru } from './guru';
import { IHoldIdxByCusip, ISecurity, ITickerToCusip } from './securityHold';
import {IInsideTrade} from './insideTrade';

@Injectable()
export class AiDataService {
  private _holdByCik = 'assets/holdByCik.json';
  private _guru = 'assets/guru.json';
  private _holdByCusip = 'assets/holdByCusip.json';
  private _security = 'assets/security.json';
  private _tickerToCusip = 'assets/tickerToCusip.json';
  private _insideTrade = 'assets/f4.json';

  constructor(private _http: Http) {
    console.log("AiDataService started");
  }

  getInsideTrades(): Observable<IInsideTrade[]> {
    return this._http.get(this._insideTrade)
      .map((response: Response) => <IInsideTrade[]>response.json())
      .catch(this.handleError);
  }

  getGurus(): Observable<IGuru[]> {
    return this._http.get(this._guru)
      .map((response: Response) => <IGuru[]>response.json())
      .catch(this.handleError);
  }

  getSecuriites(): Observable<ISecurity[]> {
    return this._http.get(this._security)
      .map((response: Response) => <ISecurity[]>response.json())
      .catch(this.handleError);
  }

  getTickerToCusip(): Observable<ITickerToCusip> {
    return this._http.get(this._tickerToCusip)
      .map((response: Response) => <ITickerToCusip>response.json())
      .catch(this.handleError);
  }
  
  getHoldByCik(): Observable<IHoldIdxByCik> {
      return this._http.get(this._holdByCik)
      .map((response: Response) => <IHoldIdxByCik>response.json())
      .catch(this.handleError)
       ;
   }

  getHoldByCussip(): Observable<IHoldIdxByCusip> {
    return this._http.get(this._holdByCusip)
      .map((response: Response) => <IHoldIdxByCusip>response.json())
      .catch(this.handleError);
  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || "Sever error");
  }

}
