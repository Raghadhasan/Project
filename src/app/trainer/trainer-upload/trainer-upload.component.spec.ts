import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerUploadComponent } from './trainer-upload.component';

describe('TrainerUploadComponent', () => {
  let component: TrainerUploadComponent;
  let fixture: ComponentFixture<TrainerUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainerUploadComponent]
    });
    fixture = TestBed.createComponent(TrainerUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
