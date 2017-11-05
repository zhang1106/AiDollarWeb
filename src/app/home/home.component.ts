import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AiDataService } from '../service/ai-data.service';
import { IPortfolio } from '../service/portfolio';
import {IGuru} from '../service/guru';

@Component({
  selector: 'ai-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  Portfolio: IPortfolio;
  Gurus: IGuru[];
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
         for (var i = 0; i < portfolio.length; i++) {
            var p = portfolio[i];
            if (p.Cik == this.Cik) {
              this.Portfolio = p;
              break;
            }
          }
        },

        error => this.ErrorMessage = error
      );

    this._aiService.getGurus()
      .subscribe(
        gurus => {
          this.Gurus = gurus;
        },
        error => this.ErrorMessage = error
      );
  }
  
}
