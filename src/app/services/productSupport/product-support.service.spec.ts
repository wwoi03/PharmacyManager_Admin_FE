import { TestBed } from '@angular/core/testing';

import { ProductSupportService } from './product-support.service';

describe('ProductSupportService', () => {
  let service: ProductSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSupportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
