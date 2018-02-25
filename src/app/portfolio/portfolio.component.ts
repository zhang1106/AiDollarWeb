import { Component, OnInit } from '@angular/core';
import {PortfolioService} from "../service/portfolio.service";

@Component({
  selector: 'ai-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  Positions: any;
  MyPositions = [];
  constructor(private _portfolioSvc: PortfolioService) { }

  ngOnInit() {

    this.Positions = this._portfolioSvc.GetMyPortfoio();
    for (var prop in this.Positions) {
      this.MyPositions.push(this.Positions[prop]);
      console.log(prop);
       
    }
  }

}
