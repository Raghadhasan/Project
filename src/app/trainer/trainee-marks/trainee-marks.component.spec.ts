import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeMarksComponent } from './trainee-marks.component';

describe('TraineeMarksComponent', () => {
  let component: TraineeMarksComponent;
  let fixture: ComponentFixture<TraineeMarksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TraineeMarksComponent]
    });
    fixture = TestBed.createComponent(TraineeMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
