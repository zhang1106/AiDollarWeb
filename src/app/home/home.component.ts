import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AiDataService } from '../service/ai-data.service';
import { IHoldIdxByCik, IHoldByCik } from '../service/portfolio';
import { ISubscription } from 'rxjs/Subscription';
import { IGuru } from '../service/guru';
 
@Component({
  selector: 'ai-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})

export class HomeComponent implements OnDestroy, OnInit {

  Gurus: IGuru[];
  Cache: IHoldIdxByCik;
  Portfolio: IHoldByCik;
  ErrorMessage: string;
  Subscription: ISubscription;
  Cik:string;

  constructor(private _aiService: AiDataService,   private activatedRoute: ActivatedRoute) {
    this.Cik = "1067983";
    this.Portfolio =
    {
      Cik: '',
      Owner: '',
      ReportedDate0: null,
      ReportedDate1: null,
      ReportedDate2: null,
      ReportedDate3: null,
      ReportedDate4: null,
      Holdings:[]
    };
  }



  ngOnDestroy(): void {
     this.Subscription.unsubscribe();
  }
  
  ngOnInit() { // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['cik']) this.Cik = params['cik'];
    });

    this._aiService.getGurus()
      .subscribe(
      gurus => {
          console.log("get gurus");
          this.Gurus = gurus;
        },
        error => this.ErrorMessage = error
      );

      this.Subscription = this._aiService.getHoldByCik()
        .subscribe(
          portfolioIdx => {
            this.Cache = portfolioIdx;
            this.Portfolio = this.Cache[this.Cik];
         },
          error => this.ErrorMessage = error
        );
   }

  ShowDetail(Cik: string): void {
    this.Portfolio = this.Cache[Cik];
    console.log("Container:"+this.Portfolio.Owner);
  }
  
}
