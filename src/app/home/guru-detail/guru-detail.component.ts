import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'ai-guru-detail',
  templateUrl: './guru-detail.component.html',
  styleUrls: ['./guru-detail.component.css']
})
export class GuruDetailComponent implements OnChanges {
  @Input() dPortfolio: any
  Portfolio:any

  ngOnChanges(): void {
    this.Portfolio = this.dPortfolio;
    console.log("detail changed - " + this.Portfolio.Owner);
  }


}
