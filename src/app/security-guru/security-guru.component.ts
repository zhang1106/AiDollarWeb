import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AiDataService } from '../service/ai-data.service';
import { IHoldIdxByCusip, IHoldByCusip, ISecurity } from '../service/securityHold';

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
  Securities:ISecurity[];
  ErrorMessage: string;

  constructor(private _aiService: AiDataService, private activatedRoute: ActivatedRoute) {
    this.Cusip = '037833100';
    this.Issuer = 'APPLE INC';
    this.SecurityHolding = { Cusip: '037833100', Holding: [] };

  }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['cusip']) this.Cusip = params['cusip'];
      if (params['issuer']) this.Issuer = params['issuer'];
    });
    
    this._aiService.getHoldByCussip()
      .subscribe(
      portfolio => {
        this.SecurityHoldings = portfolio;
        this.SecurityHolding = this.SecurityHoldings[this.Cusip];

      },
        error => this.ErrorMessage = error
      );

    this._aiService.getSecuriites()
      .subscribe(
      securities => {
          console.log(securities.length);
          this.Securities = securities;
      },
        error => this.ErrorMessage = error
      );
  }

  ShowDetail(cusip: string, issuer:string) {
    this.Cusip = cusip;
    this.Issuer = issuer;
    this.SecurityHolding = this.SecurityHoldings[this.Cusip];
    console.log("hello" + this.SecurityHolding.Cusip);
  }

}
