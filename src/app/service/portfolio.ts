export interface IHolding {
  Issuer: string;
  Share0: number;
  Share1: number;
  Share2: number;
  Share3: number;
  Share4: number;
}

export interface IPortfolio {
 Cik:string;
 Owner: string;
 ReportedDate0: Date;
 ReportedDate1: Date;
 ReportedDate2: Date;
 ReportedDate3: Date;
 ReportedDate4: Date;
 Holdings: IHolding[]; 
}

