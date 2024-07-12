import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDiseaseSymptomComponent } from './list-disease-symptom.component';

describe('ListDiseaseSymptomComponent', () => {
  let component: ListDiseaseSymptomComponent;
  let fixture: ComponentFixture<ListDiseaseSymptomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDiseaseSymptomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDiseaseSymptomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
