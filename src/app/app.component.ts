import { Component, OnInit } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { LocalStorageService } from 'angular-2-local-storage';
import {AiDataService} from "./service/ai-data.service";
declare var jQuery: any;

@Component({
  selector: 'ai-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpModule]
})

export class AppComponent implements OnInit {
  title = 'ai';
  Email: string;
  Password: string;
   
  ErrorMessage: string;

  constructor(private router: Router, private localStorageService: LocalStorageService, private aiDataSvc: AiDataService) {
  
  }

  ngOnInit(): void {
    //init quotes
    this.aiDataSvc.getPortfolioQuotes();

    var token = this.localStorageService.get("token");
    if (token != null) {
      console.log("authenticated");
    }
  } 

  SignIn() {
    if(this.Email == "admin" && this.Password=="test") {
      this.localStorageService.set("token", "admin");
    }
  }

  GoHome() {
   this.router.navigateByUrl("/home");
  }
   
}
