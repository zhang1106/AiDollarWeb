import { Component, OnInit } from '@angular/core';
import { PortfolioService } from "../service/portfolio.service";
import { AiDataService } from '../service/ai-data.service';
import {Trade} from "../service/portfolio";

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
  SumPnL: number;
  MyTransactions: Trade[];

  constructor(private _portfolioSvc: PortfolioService, private _aiService: AiDataService) {
  }

  ngOnInit() {
    this.GetAiPortfolio();
    this.GetTransactions();
  }

  GetTransactions() {
    this.MyTransactions = [];
    var trades = this._portfolioSvc.GetTredes();
    for (var prop in trades) {
      this.MyTransactions=this.MyTransactions.concat(trades[prop]);
    }
    this.MyTransactions.sort(this.Compare);
  }

  GetAiPortfolio() {
    var p = this._portfolioSvc.GetAiPortfolio(); 
      this.MyPositions = p.MyPositions;
      this.SumCost = p.SumCost;
      this.SumPnL = p.SumPnL;
      this.SumMarketVal = p.SumMarketVal;
  }
  
  AddToPortfolio(ticker: string, shares: number) {
      var quotes = this._aiService.getQuotes(); 
      var price = quotes[ticker].price;
      if (price == null) price = 1;

      this._portfolioSvc.Add(ticker, price, shares);
      this.GetAiPortfolio();
      this.GetTransactions();
  }

  Compare(a, b) {
    var comp = 0;
    if (a.TradeDate > b.TradeDate) {
      comp = 1;
    } else {
      comp = -1;
    }
    return comp;
  }

}
