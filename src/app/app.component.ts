import { Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/Rx';

declare var jQuery: any;

@Component({
  selector: 'ai-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpModule]
})

export class AppComponent {
  title = 'ai';

  constructor(private router: Router) {
  
  }
   
}
