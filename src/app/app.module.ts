import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TermComponent } from './term/term.component';
import { InfoComponent} from './info/info.component';
import { SecurityGuruComponent } from './security-guru/security-guru.component';
import { AiDataService } from './service/ai-data.service';
import { PortfolioService } from './service/portfolio.service';
import { GuruDetailComponent } from './home/guru-detail/guru-detail.component';
import { InsideTradeComponent } from './inside-trade/inside-trade.component';
import { LoginComponent } from './login/login.component';
import { LocalStorageModule } from 'angular-2-local-storage';
import {PortfolioComponent} from "./portfolio/portfolio.component";
import { GuruComponent } from './guru/guru.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TermComponent,
    InfoComponent,
    SecurityGuruComponent,
    GuruDetailComponent,
    InsideTradeComponent,
    LoginComponent,
    PortfolioComponent,
    GuruComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    LocalStorageModule.withConfig({
      prefix: 'ai-dolloar',
      storageType: 'localStorage'
    })
  ],
  providers: [AiDataService, PortfolioService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
