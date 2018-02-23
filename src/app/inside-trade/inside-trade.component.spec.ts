import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideTradeComponent } from './inside-trade.component';

describe('InsideTradeComponent', () => {
  let component: InsideTradeComponent;
  let fixture: ComponentFixture<InsideTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsideTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsideTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
