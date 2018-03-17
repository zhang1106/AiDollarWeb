import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IHoldIdxByCik, Quote } from './portfolio';
import { IGuru } from './guru';
import { IHoldIdxByCusip, ISecurity, ITickerToCusip } from './securityHold';
import { IInsideTrade } from './insideTrade';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class AiDataService {
  private _holdByCik = 'assets/holdByCik.json';
  private _guru = 'assets/guru.json';
  private _holdByCusip = 'assets/holdByCusip.json';
  private _security = 'assets/security.json';
  private _tickerToCusip = 'assets/tickerToCusip.json';
  private _insideTrade = 'assets/f4.json';
  private _quoteUri = 'https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&apikey=LLAX4346OCJU5UF2&symbols=';
  private _portfolioQuotes = "PortfolioQuotes";
  private _quotedDate = 'QuotedDate';

  constructor(private localStorageService: LocalStorageService, private _http: Http) {
    console.log("AiDataService started");
  }

  getDate() {
    var date = new Date();
    var dateId = date.toDateString();
    return dateId;
  }

  getPortfolioQuotes() {
    var date = this.getDate();
    var quotedDate = this.localStorageService.get(this._quotedDate);
    //quoted only once
    if (date == quotedDate) {
      return;
    }
    
    this.getSecurities().subscribe(s => {
      var tickers = s.map(t => t.Ticker).join(",") + ",AAPL";
      this.getRemoteQuotes(tickers).subscribe(json => {
          console.log("Get All Quotes");
          var quotes = this.convertToQuotes(json);
          if (quotes["AAPL"].price != 0) {
            this.localStorageService.set(this._portfolioQuotes, quotes);
            this.localStorageService.set(this._quotedDate, date);
          }
        }
      );
    });
  }

  convertToQuotes(json: any) {
    var prices = {};
    var quotes = json["Stock Quotes"];
    for (let i = 0; i < quotes.length; i++) {
      var quote = quotes[i];
      var sym = quote["1. symbol"];
      var price = quote["2. price"];
      var timestamp = quote["4. timestamp"]
      prices[sym] = new Quote(sym, price, 0, timestamp);
    }
    return prices;
  }

  getQuotes() {
    var quotes = this.localStorageService.get(this._portfolioQuotes);
    return quotes;
  }

  getRemoteQuotes(tickers: string) {
    var quote = this._quoteUri + tickers;
    return this._http.get(quote)
        .map((response: Response) => response.json())
      ;
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

  getSecurities(): Observable<ISecurity[]> {
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
