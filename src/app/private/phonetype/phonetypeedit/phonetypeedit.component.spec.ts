import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonetypeeditComponent } from './phonetypeedit.component';

describe('PhonetypeeditComponent', () => {
  let component: PhonetypeeditComponent;
  let fixture: ComponentFixture<PhonetypeeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonetypeeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonetypeeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
