import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'ai-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private userid: string;
  private password: string;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    var uid = this.localStorageService.get('userid');
    if (uid != null) {
      this.userid = uid.toString();
    }
  }

  onLogin() {
    console.log("set value - " + this.userid);
    this.localStorageService.set('userid', this.userid);
  }

  onSubmit() {
    console.log("set value - " + this.userid);
    this.localStorageService.set('userid', this.userid);
  
  }
}
