import { Injectable } from '@angular/core';

@Injectable()
export class AiDataCache 
{
  public sharedData:string = "init";

  constructor() {
    console.log("cache init at " + Date.now());
  }

}