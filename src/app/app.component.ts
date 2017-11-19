import { Component, OnInit } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { AiDataService } from './service/ai-data.service';
import {ITickerToCusip } from './service/securityHold';

declare var jQuery: any;

@Component({
  selector: 'ai-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpModule]
})

export class AppComponent implements OnInit {
  title = 'ai';
  Symbol: string;
  TickerToCusip: ITickerToCusip;
  ErrorMessage: string;

  constructor(private router: Router, private _aiService:AiDataService) {
  
  }

  ngOnInit(): void  
  {
    this._aiService.getTickerToCusip()
      .subscribe(
        tickerToCusip => {
          this.TickerToCusip = tickerToCusip;
          
       },
        error => this.ErrorMessage = error
      );
  
  } 

  GetHoldings() {
      //this.router.navigate([home])
    //console.log(JSON.stringify(this.TickerToCusip));
     
    //console.log(this.TickerToCusip[this.Symbol]);
    if (this.TickerToCusip[this.Symbol]) {
      this.router.navigate(['security/' + this.TickerToCusip[this.Symbol] + "/" + this.Symbol]);
    }
 
  }
   
}
