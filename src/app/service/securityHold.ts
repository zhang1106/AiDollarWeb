export interface ISecurityHoldingUnit {
  Owner:string;
  Fund:string;
  Recent:number;
  Q1:number;
  Q2:number;
  Q3: Number;  
  Q4:number; 
}

export interface IHoldIdxByCusip {
  [Cusip:string]: IHoldByCusip;
}

export interface IHoldByCusip{
 Cusip:string;
 Holding: ISecurityHoldingUnit[];
 
}

export interface ISecurity {
  Cusip: string;
  Issuer: string;
  Ticker:string;
}

export interface ITickerToCusip {
  [Ticker:string]: string
}