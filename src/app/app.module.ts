import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TermComponent } from './term/term.component';
import { InfoComponent} from './info/info.component';
import { SecurityGuruComponent } from './security-guru/security-guru.component';
import { AiDataService } from './service/ai-data.service';
import { GuruDetailComponent } from './home/guru-detail/guru-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TermComponent,
    InfoComponent,
    SecurityGuruComponent,
    GuruDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AiDataService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
