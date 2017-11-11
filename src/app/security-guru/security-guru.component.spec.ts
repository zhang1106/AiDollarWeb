import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityGuruComponent } from './security-guru.component';

describe('SecuriyGuruComponent', () => {
  let component: SecurityGuruComponent;
  let fixture: ComponentFixture<SecurityGuruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityGuruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityGuruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
