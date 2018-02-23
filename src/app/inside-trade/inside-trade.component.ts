import { Component, OnInit } from '@angular/core';
import { AiDataService } from '../service/ai-data.service';
import { IInsideTrade } from '../service/insideTrade';

@Component({
  selector: 'ai-inside-trade',
  templateUrl: './inside-trade.component.html',
  styleUrls: ['./inside-trade.component.css']
})
export class InsideTradeComponent implements OnInit {
  private Trades: IInsideTrade[];
  private ErrorMessage: string;

  constructor(private _aiService: AiDataService) { }

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

}
