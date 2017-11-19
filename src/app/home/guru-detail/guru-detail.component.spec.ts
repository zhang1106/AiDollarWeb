import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuruDetailComponent } from './guru-detail.component';

describe('GuruDetailComponent', () => {
  let component: GuruDetailComponent;
  let fixture: ComponentFixture<GuruDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuruDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuruDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
