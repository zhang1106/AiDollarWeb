import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Trade, Position , AiPortfolio} from './portfolio';
import { AiDataService } from './ai-data.service';
//Alpha Vantage Key:LLAX4346OCJU5UF2
@Injectable()
export class PortfolioService {

  GuruTrackTrades = "MyPortfolio-Trades";
  GuruTrackPositions = "MyPortfolio-Positions";

  InsiderTrackTrades = "InsiderTrackPortfolio-Trades";
  InsiderTrackPositions = "InsiderTrackPortfolio-Positions";

  constructor(private localStorageService: LocalStorageService, private dataService: AiDataService) { }

  GetMyTradesRec(portName: string) {
    if (portName == this.GuruTrackPositions) {
      return this.GuruTrackTrades;
    }
    if (portName == this.InsiderTrackPositions) {
      return this.InsiderTrackTrades;
    }
    return null;
  }

  GetMyPortfoio(portName:string) {
    var positions = this.localStorageService.get(portName);
    if (positions == null) {
      positions = {};
    };
    return positions;
  }

  UpdatePostion(trade: Trade, portName:string) {
    var positions = this.localStorageService.get(portName);
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
    this.localStorageService.set(portName, positions);
  }
  
  AddToPortfolio(ticker: string, shares:number, portName:string) {
      var quotes = this.dataService.getQuotes(); 
      var price = quotes[ticker].price;
      if (price == null) price = 1;
      this.Add(ticker, price, shares, portName);
  }

  Add(ticker: string, price:number, shares:number,  portName:string) {
     
    let trade: Trade = new Trade(ticker, shares, price, new Date());
    var trades = this.localStorageService.get(this.GetMyTradesRec(portName));

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
    
    this.localStorageService.set(this.GetMyTradesRec(portName), trades);
    this.UpdatePostion(trade, portName);
  }

  GetTredes(portName:string) {
    var trades = this.localStorageService.get(this.GetMyTradesRec(portName));
    return trades;
  }

  GetAiPortfolio(portName):AiPortfolio {
    var myPositions = [];
    var sumCost = 0;
    var sumMarketVal = 0;
    var sumPnL = 0;
    var positions = this.GetMyPortfoio(portName);
    var quotes = this.dataService.getQuotes();

    for (var prop in positions) {
      var p = positions[prop];
      var price = quotes[prop].price;
      if (price == null) price = 1;
      p.MarketVal = price * p.Shares;
      p.PnL = p.MarketVal - p.Cost;
      p.Date = price.Date;
      //
      sumCost += p.Cost;
      sumMarketVal += p.MarketVal;
      sumPnL += p.PnL;
      //
      myPositions.push(p);
    }
    return new AiPortfolio(myPositions, sumCost, sumMarketVal, sumPnL);
  }
}
