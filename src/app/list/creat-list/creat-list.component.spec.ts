import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatListComponent } from './creat-list.component';

describe('CreatListComponent', () => {
  let component: CreatListComponent;
  let fixture: ComponentFixture<CreatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
