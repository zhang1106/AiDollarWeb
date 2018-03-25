import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AiDataService } from '../service/ai-data.service';
import { PortfolioService } from '../service/portfolio.service';
import { IHoldIdxByCusip, IHoldByCusip, ISecurity } from '../service/securityHold';
import {AiPortfolio} from "../service/portfolio";

@Component({
  selector: 'ai-security-guru',
  templateUrl: './security-guru.component.html',
  styleUrls: ['./security-guru.component.css']
})
export class SecurityGuruComponent implements OnInit {

  SecurityHoldings: IHoldIdxByCusip;
  SecurityHolding: IHoldByCusip;
  Cusip: string;
  Issuer: string;
  Ticker: string;
  Securities:ISecurity[];
  ErrorMessage: string;
  MyPortfolio: AiPortfolio;
  //
  MyPositions: any;
  SumCost: number;
  SumMarketVal: number;
  SumPnL: number;

  constructor(private _aiService: AiDataService, private _portfolioSvc:PortfolioService, private activatedRoute: ActivatedRoute) {
    this.Cusip = '037833100';
    this.Issuer = 'APPLE INC';
    this.Ticker = 'AAPL';
    this.SecurityHolding = { Cusip: '037833100', Holding: [] };
  }

  Init() {
    this.MyPositions = [];
    this.SumCost = 0;
    this.SumMarketVal = 0;
    this.SumPnL = 0;
  }

  ngOnInit() {
    this.Init();

    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['cusip']) this.Cusip = params['cusip'];
      if (params['issuer']) this.Issuer = params['issuer'];
      if (params["ticker"]) this.Ticker = params['ticker'];
    });
    
    this._aiService.getHoldByCussip()
      .subscribe(
      portfolio => {
        this.SecurityHoldings = portfolio;
        this.SecurityHolding = this.SecurityHoldings[this.Cusip];
      },
        error => this.ErrorMessage = error
      );

    this._aiService.getSecurities()
      .subscribe(
      securities => {
          console.log(securities.length);
          this.Securities = securities;
      },
        error => this.ErrorMessage = error
      );

    this.GetMyAiPortfolio();
  }

  ShowDetail(cusip: string, issuer:string, ticker:string) {
    this.Cusip = cusip;
    this.Issuer = issuer;
    this.Ticker = ticker;
    this.SecurityHolding = this.SecurityHoldings[this.Cusip];
  }

  AddToMyPortfolio() {
      var quotes= this._aiService.getQuotes() 
      var price = quotes[this.Ticker].price;
      if (price == null) price = 1;
      this._portfolioSvc.AddToPortfolio(this.Ticker, 1000, this._portfolioSvc.GuruTrackPositions);

      this.GetMyAiPortfolio();
  }

  GetMyAiPortfolio() {
      var p = this._portfolioSvc.GetAiPortfolio(this._portfolioSvc.GuruTrackPositions); 
      console.log("Get Ai Port");
      this.MyPositions = p.MyPositions;
      this.SumCost = p.SumCost;
      this.SumPnL = p.SumPnL;
      this.SumMarketVal = p.SumMarketVal;
     
  }

}
