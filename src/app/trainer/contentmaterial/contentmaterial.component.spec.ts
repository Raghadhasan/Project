import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentmaterialComponent } from './contentmaterial.component';

describe('ContentmaterialComponent', () => {
  let component: ContentmaterialComponent;
  let fixture: ComponentFixture<ContentmaterialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentmaterialComponent]
    });
    fixture = TestBed.createComponent(ContentmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
