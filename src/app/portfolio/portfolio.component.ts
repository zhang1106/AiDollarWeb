import { Component, OnInit } from '@angular/core';
import { PortfolioService } from "../service/portfolio.service";
import { AiDataService } from '../service/ai-data.service';

@Component({
  selector: 'ai-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  Positions: any;
  MyPositions:any;
  SumCost: number;
  SumMarketVal: number;
  SumPnL:number;

  constructor(private _portfolioSvc: PortfolioService, private _aiService:AiDataService) { }

  ngOnInit() {
    //this.Refresh();
    this.GetAiPortfolio();
  }

  Init() {
    this.MyPositions = [];
    this.SumCost= 0;
    this.SumMarketVal = 0;
    this.SumPnL = 0;
  }

  GetAiPortfolio() {
    var p = this._portfolioSvc.GetAiPortfolio(); 
      this.MyPositions = p.MyPositions;
      this.SumCost = p.SumCost;
      this.SumPnL = p.SumPnL;
      this.SumMarketVal = p.SumMarketVal;
 
  }

  Refresh() {
    this.Init();
    this.Positions = this._portfolioSvc.GetMyPortfoio();
    
    var quotes = this._aiService.getQuotes(); 
       
    for (var prop in this.Positions) {
      var p = this.Positions[prop];
      console.log(p.Ticker + " " + p.Shares);
      var price = quotes[prop].price;
      if (price == null) price = 1;
      p.MarketVal = price * p.Shares;
      p.PnL = p.MarketVal - p.Cost;
      p.Date = price.Date;
      //
      this.SumCost += p.Cost;
      this.SumMarketVal += p.MarketVal;
      this.SumPnL += p.PnL;
      //
      this.MyPositions.push(p);
    };

  }
  
  AddToPortfolio(ticker: string, shares: number) {
      var quotes = this._aiService.getQuotes(); 
      var price = quotes[ticker].price;
      if (price == null) price = 1;

      this._portfolioSvc.Add(ticker, price, shares);
      //this.Refresh();
      this.GetAiPortfolio();
  }

}
