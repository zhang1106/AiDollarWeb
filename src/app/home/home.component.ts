import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AiDataService } from '../service/ai-data.service';
import { IPortfolio } from '../service/portfolio';
import {IHolding} from '../service/portfolio';

@Component({
  selector: 'ai-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  Portfolio: IPortfolio;
  Cik: string
  ErrorMessage: string;

  constructor(private _aiService: AiDataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() { // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      this.Cik = params['cik'];
      console.log(this.Cik);
    });
    this._aiService.getPortfolio()
      .subscribe(
      portfolio => {
        console.log(this.Cik);
          for (var i = 0; i < portfolio.length; i++) {
            var p = portfolio[i];
            if (p.Cik == this.Cik) {
              this.Portfolio = p;
              console.log(p.Owner);
              break;
            }
          }
        },

        error => this.ErrorMessage = error
      );
  }
  
}
