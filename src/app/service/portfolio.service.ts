import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Trade, Position ,Quote} from './portfolio';
import { AiDataService } from './ai-data.service';
//Alpha Vantage Key:LLAX4346OCJU5UF2
@Injectable()
export class PortfolioService {

  myPorfolioTrades = "MyPortfolio-Trades";
  myPortfolioPositions = "MyPortfolio-Positions";

  constructor(private localStorageService: LocalStorageService, private dataService:AiDataService) { }

  GetMyPortfoio() {
    var positions = this.localStorageService.get(this.myPortfolioPositions);
    if (positions == null) {
      positions = {};
    };
    return positions;
  }

  UpdatePostion(trade: Trade) {
    var positions = this.localStorageService.get(this.myPortfolioPositions);
    if (positions == null) {
      positions = {};
    };
    var position = positions[trade.Ticker];
    if (position == null) {
      positions[trade.Ticker] = new Position(trade.Ticker,
        trade.Shares,
        trade.Shares * trade.Price,
        trade.TradeDate);
    } else {
      positions[trade.Ticker] = new Position(trade.Ticker,
        position.Shares + trade.Shares,
        position.Cost + trade.Price * trade.Shares,
        trade.TradeDate);
    }
    this.localStorageService.set(this.myPortfolioPositions, positions);
  }

  
  GetQuotes(json: any) {
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

  AddToPortfolio(ticker: string, shares:number) {
    this.dataService.getQuote(ticker).subscribe(json => {
      var prices = this.GetQuotes(json);
      var price = prices[ticker].price;
      if (price == null) price = 1;

      this.Add(ticker, price, shares);
    });
  }

  Add(ticker: string, price:number, shares:number) {
     
    let trade: Trade = new Trade(ticker, shares, price, new Date());
    var trades = this.localStorageService.get(this.myPorfolioTrades);

    if (trades == null) {
      trades = {};
      trades[ticker] = [trade];
     
    } else
    {
        var thisTrades = trades[ticker];
        if (thisTrades == null) {
          trades[ticker] = [trade];
        } else {
          thisTrades.push(trade);
        }
    }
    
    this.localStorageService.set(this.myPorfolioTrades, trades);
    this.UpdatePostion(trade);
  }
}
