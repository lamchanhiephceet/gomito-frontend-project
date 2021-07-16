import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberVerifyTokenComponent } from './add-member-verify-token.component';

describe('AddMemberVerifyTokenComponent', () => {
  let component: AddMemberVerifyTokenComponent;
  let fixture: ComponentFixture<AddMemberVerifyTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMemberVerifyTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberVerifyTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
