import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailtypeeditComponent } from './emailtypeedit.component';

describe('EmailtypeeditComponent', () => {
  let component: EmailtypeeditComponent;
  let fixture: ComponentFixture<EmailtypeeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailtypeeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailtypeeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
