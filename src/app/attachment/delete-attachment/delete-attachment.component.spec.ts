import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAttachmentComponent } from './delete-attachment.component';

describe('DeleteAttachmentComponent', () => {
  let component: DeleteAttachmentComponent;
  let fixture: ComponentFixture<DeleteAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAttachmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
