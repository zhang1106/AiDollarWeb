import { Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import 'rxjs/Rx';
import { AiDataService } from './service/ai-data.service';

declare var jQuery: any;

@Component({
  selector: 'ai-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AiDataService, HttpModule]
})
export class AppComponent {
  title = 'ai';
}
