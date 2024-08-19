import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiseaseSymptomComponent } from './create-disease-symptom.component';

describe('CreateDiseaseSymptomComponent', () => {
  let component: CreateDiseaseSymptomComponent;
  let fixture: ComponentFixture<CreateDiseaseSymptomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDiseaseSymptomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDiseaseSymptomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
