import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuruComponent } from './guru/guru.component';
import {SecurityGuruComponent} from './security-guru/security-guru.component';
import { TermComponent } from './term/term.component';
import { InfoComponent } from './info/info.component';
import { InsideTradeComponent } from './inside-trade/inside-trade.component';
import { LoginComponent } from './login/login.component';
import {PortfolioComponent} from "./portfolio/portfolio.component";
const routes: Routes = [
  { path: '', redirectTo: 'security/037833100', pathMatch: 'full' },
  {path: 'guru', redirectTo: 'guru/1067983/o', pathMatch: 'full' },
  {path: 'guru/:cik/:o', component: GuruComponent, pathMatch: 'full' },
  {path: 'security', redirectTo: 'security/037833100', pathMatch: 'full' },
  {path: 'security/:cusip', component: SecurityGuruComponent, pathMatch: 'full' },
  { path: 'security/:cusip/:issuer', component: SecurityGuruComponent, pathMatch: 'full' },
  { path: 'insideTrades', component: InsideTradeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  {path: 'term', component: TermComponent },
  { path: 'info', component: InfoComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
