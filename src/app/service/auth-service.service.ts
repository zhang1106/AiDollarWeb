import { Injectable } from '@angular/core';
import { TokenService } from 'angular2-auth';

@Injectable()
export class AuthServiceService {

  constructor(private _tokenService: TokenService) { }

  login(email: string, password: string) {
    if (email == "aidollar" && password == "admin") {
      this._tokenService.setToken(email + password);
    }
    
  }
  
  logout() {
    this._tokenService.removeToken();
  }

  loggedIn() {
    let token = this._tokenService.getToken();

    if (token && token.token) {
      return !token.isExpired();
    }
    return false;
  }

}
