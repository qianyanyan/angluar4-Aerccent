import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingFormulaMaterialsComponent } from './matching-formula-materials.component';

describe('MatchingFormulaMaterialsComponent', () => {
  let component: MatchingFormulaMaterialsComponent;
  let fixture: ComponentFixture<MatchingFormulaMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchingFormulaMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchingFormulaMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
