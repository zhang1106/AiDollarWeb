import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {SecurityGuruComponent} from './security-guru/security-guru.component';
import { TermComponent } from './term/term.component';
import { InfoComponent } from './info/info.component'

const routes: Routes = [
  {path: '', redirectTo: 'home/1067983/o', pathMatch: 'full' },
  {path: 'home', redirectTo: 'home/1067983/o', pathMatch: 'full' },
  {path: 'home/:cik/:o', component: HomeComponent, pathMatch: 'full' },
  {path: 'security', redirectTo: 'security/037833100', pathMatch: 'full' },
  {path: 'security/:cusip', component: SecurityGuruComponent, pathMatch: 'full' },
  {path: 'security/:cusip/:issuer', component: SecurityGuruComponent, pathMatch: 'full' },
  {path: 'term', component: TermComponent },
  {path: 'info', component:InfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
