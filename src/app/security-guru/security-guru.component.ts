import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AiDataService } from '../service/ai-data.service';
import { ISecurityHolding } from '../service/securityHold';

@Component({
  selector: 'ai-security-guru',
  templateUrl: './security-guru.component.html',
  styleUrls: ['./security-guru.component.css']
})
export class SecurityGuruComponent implements OnInit {

  SecurityHoldings: ISecurityHolding[];
  SecurityHolding: ISecurityHolding;
  Cusip: string;
  ErrorMessage: string;

  constructor(private _aiService: AiDataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.Cusip = params['cusip'];
      console.log(this.Cusip);
    });

    this._aiService.getSecurtiyPortfolio()
      .subscribe(
      portfolio => {
        this.SecurityHoldings = portfolio;
          for (var i = 0; i < portfolio.length; i++) {
            var p = portfolio[i];
            if (p.Cusip == this.Cusip) {
              this.SecurityHolding = p;
              break;
            }
          }
        },

        error => this.ErrorMessage = error
      );

  }

}
