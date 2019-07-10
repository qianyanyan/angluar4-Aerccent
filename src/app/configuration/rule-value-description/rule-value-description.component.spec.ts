import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleValueDescriptionComponent } from './rule-value-description.component';

describe('RuleValueDescriptionComponent', () => {
  let component: RuleValueDescriptionComponent;
  let fixture: ComponentFixture<RuleValueDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleValueDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleValueDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
