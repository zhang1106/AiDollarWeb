export interface ISecurityHoldingUnit {
  Owner:string;
  Fund:string;
  Recent:number;
  Q1:number;
  Q2:number;
  Q3: Number;  
  Q4:number; 
}
 

export interface ISecurityHolding {
 Ticker:string
 Cusip:string;
 Issuer:string;
 Holding: ISecurityHoldingUnit[];
 
}