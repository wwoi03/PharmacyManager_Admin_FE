import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseDetailsComponent } from './disease-details.component';

describe('DiseaseDetailsComponent', () => {
  let component: DiseaseDetailsComponent;
  let fixture: ComponentFixture<DiseaseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseaseDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiseaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
