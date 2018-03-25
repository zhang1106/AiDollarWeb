import { Component, OnInit } from '@angular/core';
import { AiDataService } from '../service/ai-data.service';
import { IInsideTrade } from '../service/insideTrade';
import { PortfolioService } from "../service/portfolio.service";

@Component({
  selector: 'ai-inside-trade',
  templateUrl: './inside-trade.component.html',
  styleUrls: ['./inside-trade.component.css']
})
export class InsideTradeComponent implements OnInit {
  private Trades: IInsideTrade[];
  private ErrorMessage: string;

  constructor(private _aiService: AiDataService, private _portfolioSvc:PortfolioService) { }

  ngOnInit() {

    this._aiService.getInsideTrades()
      .subscribe(
        trades => {
          console.log(trades.length);
          this.Trades = trades;
        },
        error => this.ErrorMessage = error
      );
  }

  AddToPortfolio(ticker: string, shares: number) {
    var quotes = this._aiService.getQuotes();
    var price = quotes[ticker].price;
    if (price == null) price = 1;

    this._portfolioSvc.Add(ticker, price, shares, this._portfolioSvc.InsiderTrackPositions);
  }

}
