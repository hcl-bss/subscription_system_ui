import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdeleteComponent } from './userdelete.component';

describe('UserdeleteComponent', () => {
  let component: UserdeleteComponent;
  let fixture: ComponentFixture<UserdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
