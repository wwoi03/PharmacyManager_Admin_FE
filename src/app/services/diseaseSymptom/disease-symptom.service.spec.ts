import { TestBed } from '@angular/core/testing';

import { DiseaseSymptomService } from './disease-symptom.service';

describe('DiseaseSymptomService', () => {
  let service: DiseaseSymptomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiseaseSymptomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
