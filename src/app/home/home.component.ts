import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AiDataService } from '../service/ai-data.service';
import {ISecurity} from "../service/securityHold";

@Component({
  selector: 'ai-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})

export class HomeComponent implements OnDestroy, OnInit {

  Securities: ISecurity[];
  ErrorMessage: string;

  constructor(private _aiService: AiDataService, private _router: Router) {
   
  }
  
  ngOnDestroy(): void {
      
  }
  
  ngOnInit() { // subscribe to router event
    this._aiService.getSecurities()
      .subscribe(
        securities => {
          console.log(securities.length);
          this.Securities = securities;
        },
        error => this.ErrorMessage = error
      );
  }

  ShowDetail(cusip: string, issuer: string, ticker: string) {
    this._router.navigateByUrl("/invest/" + cusip+"/"+issuer+"/"+ticker);
  }
}
