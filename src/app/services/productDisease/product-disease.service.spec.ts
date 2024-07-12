import { TestBed } from '@angular/core/testing';

import { ProductDiseaseService } from './product-disease.service';

describe('ProductDiseaseService', () => {
  let service: ProductDiseaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDiseaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
