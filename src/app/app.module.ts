﻿import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{HttpModule} from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TermComponent } from './term/term.component';
import {InfoComponent} from './info/info.component';
import { SecurityGuruComponent } from './security-guru/security-guru.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TermComponent,
    InfoComponent,
    SecurityGuruComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
