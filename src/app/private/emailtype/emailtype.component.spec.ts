import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailtypeComponent } from './emailtype.component';

describe('EmailtypeComponent', () => {
  let component: EmailtypeComponent;
  let fixture: ComponentFixture<EmailtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
