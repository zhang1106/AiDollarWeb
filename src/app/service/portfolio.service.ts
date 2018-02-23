import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Trade , Position} from './portfolio';

@Injectable()
export class PortfolioService {

  myPorfolioTrades = "MyPortfolio-Trades";
  myPortfolioPositions = "MyPortfolio-Positions";

  constructor(private localStorageService: LocalStorageService) { }

 
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

  GetPrice(ticker: string) {
    return 100;
  }

  Add(ticker: string) {
    let trade: Trade = new Trade(ticker, 1000, this.GetPrice(ticker), new Date());
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
