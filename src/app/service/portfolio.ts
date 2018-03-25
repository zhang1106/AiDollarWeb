export interface IHolding {
  Issuer: string;
  Ticker: string;
  Cusip: string;
  Share0: number;
  Share1: number;
  Share2: number;
  Share3: number;
  Share4: number;
}

export interface IHoldIdxByCik {
  [Cik: string]: IHoldByCik;
}

export interface IHoldByCik {
  Cik: string;
  Owner: string;
  ReportedDate0: Date;
  ReportedDate1: Date;
  ReportedDate2: Date;
  ReportedDate3: Date;
  ReportedDate4: Date;
  Holdings: IHolding[];
}

export class Trade {
  Ticker: string;
  Shares: number;
  Price: number;
  TradeDate: Date;

  constructor(ticker: string, shares: number, price: number, tradeDate: Date) {
    this.Ticker = ticker;
    this.Shares = shares;
    this.Price = price;
    this.TradeDate = tradeDate;
  }
}

export class PositionByTicker {
  [Ticker: string]: Position;
}

export class Position {
  Ticker: string;
  Shares: number;
  Cost: number;
  MarketVal: number;
  PnL:number;
  Date: Date;

  constructor(ticker: string, shares: number, cost: number, date: Date) {
    this.Ticker = ticker;
    this.Shares = shares;
    this.Cost = cost;
    this.Date = date;
  }
}

export class QuoteByTicker {
  [Ticker:string]:Quote;
}

export class Quote {
  symbol: string;
  price: number;
  volume: number;
  timeStamp: Date;

  constructor(symbol: string, price: number, volume: number, timestamp: Date) {
    this.symbol = symbol;
    this.price = price;
    this.volume = volume;
    this.timeStamp = timestamp;
  }
}

export class AiPortfolio
{
  MyPositions: any;
  SumCost: number;
  SumMarketVal: number;
  SumPnL: number;

  constructor(myPosition: any, sumCost: number, sumMarketVal: number, sumPnl: number) {
    this.MyPositions = myPosition;
    this.SumCost = sumCost;
    this.SumMarketVal = sumMarketVal;
    this.SumPnL = sumPnl;
  }
}




 

