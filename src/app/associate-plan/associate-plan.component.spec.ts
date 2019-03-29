import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatePlanComponent } from './associate-plan.component';

describe('AssociatePlanComponent', () => {
  let component: AssociatePlanComponent;
  let fixture: ComponentFixture<AssociatePlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociatePlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
