import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AiDataService } from '../service/ai-data.service';
import { IPortfolio, IHolding } from '../service/portfolio';
import {IGuru} from '../service/guru';
 

@Component({
  selector: 'ai-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  Portfolio: IPortfolio;
  Gurus: IGuru[];
  Cik: string;
  Holdings:IHolding[];
  ErrorMessage: string;

  constructor(private _aiService: AiDataService, private activatedRoute: ActivatedRoute) {
    //this.Holdings = [      {
    //    "Issuer": "Encana Corporation",
    //    "Ticker": "ECA",
    //    "Cusip": "292505104",
    //    "Share0": 73364585,
    //    "Share1": 75030451,
    //    "Share2": 71084413,
    //    "Share3": 69328046,
    //    "Share4": 67572006
    //  }
    //];
    //this.Portfolio = {
    //    "Cik": "1036325",
    //    "Owner": "DAVIS SELECTED ADVISERS",
    //    "ReportedDate0": new Date("2016-08-12T14:49:06Z"),
    //    "ReportedDate1": new Date("2016-11-14T14:46:13Z"),
    //    "ReportedDate2": new Date("2017-02-13T13:42:08Z"),
    //    "ReportedDate3": new Date("2017-05-12T19:59:04Z"),
    //    "ReportedDate4": new Date("2017-08-09T19:34:07Z"),
    //    "Holdings": this.Holdings
        
    //};
  }

  ngOnInit() { // subscribe to router event
    console.log("s1");
    this.activatedRoute.params.subscribe((params: Params) => {
      this.Cik = params['cik'];
      console.log(this.Cik);
    });

   
  
    this._aiService.getPortfolio()
      .subscribe(
      portfolio => {
         console.log("get portfolio");
         for (var i = 0; i < portfolio.length; i++) {
            var p = portfolio[i];
            if (p.Cik == this.Cik) {
              this.Portfolio = p;
              break;
            }
         }
        console.log(this.Portfolio.Owner);
        },

        error => this.ErrorMessage = error
      );
     

    this._aiService.getGurus()
      .subscribe(
      gurus => {
          console.log("get gurus");
          this.Gurus = gurus;
        },
        error => this.ErrorMessage = error
      );
  }
  
}
