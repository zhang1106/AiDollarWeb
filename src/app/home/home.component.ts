import { Component, OnInit } from '@angular/core';
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
  ErrorMessage: string;

  constructor(private _aiService: AiDataService) { }

  ngOnInit() {
    this._aiService.getPortfolio()
      .subscribe(
        portfolio => this.Portfolio = portfolio,
        error => this.ErrorMessage = error
      );
  }

}
