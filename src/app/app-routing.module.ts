import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GuruComponent } from './guru/guru.component';
import {SecurityGuruComponent} from './security-guru/security-guru.component';
import { TermComponent } from './term/term.component';
import { InfoComponent } from './info/info.component';
import { InsideTradeComponent } from './inside-trade/inside-trade.component';
import { LoginComponent } from './login/login.component';
import {PortfolioComponent} from "./portfolio/portfolio.component";
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'guru', redirectTo: 'guru/1067983/o', pathMatch: 'full' },
  {path: 'guru/:cik/:o', component: GuruComponent, pathMatch: 'full' },
  {path: 'invest', redirectTo: 'invest/037833100', pathMatch: 'full' },
  {path: 'invest/:cusip', component: SecurityGuruComponent, pathMatch: 'full' },
  {path: 'invest/:cusip/:issuer/:ticker', component: SecurityGuruComponent, pathMatch: 'full' },
  {path: 'insiders', component: InsideTradeComponent },

  {path: 'portfolio/:p', component: PortfolioComponent, pathMatch: 'full' },
  {path: 'term', component: TermComponent },
  {path: 'home', component: HomeComponent },
  {path: 'info', component: InfoComponent },
  {path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
