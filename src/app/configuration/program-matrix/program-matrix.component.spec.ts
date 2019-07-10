import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramMatrixComponent } from './program-matrix.component';

describe('ProgramMatrixComponent', () => {
  let component: ProgramMatrixComponent;
  let fixture: ComponentFixture<ProgramMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
