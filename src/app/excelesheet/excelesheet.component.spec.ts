import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelesheetComponent } from './excelesheet.component';

describe('ExcelesheetComponent', () => {
  let component: ExcelesheetComponent;
  let fixture: ComponentFixture<ExcelesheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExcelesheetComponent]
    });
    fixture = TestBed.createComponent(ExcelesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
