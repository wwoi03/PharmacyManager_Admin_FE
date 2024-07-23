import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDiseaseSymptomComponent } from './delete-disease-symptom.component';

describe('DeleteDiseaseSymptomComponent', () => {
  let component: DeleteDiseaseSymptomComponent;
  let fixture: ComponentFixture<DeleteDiseaseSymptomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDiseaseSymptomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDiseaseSymptomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
