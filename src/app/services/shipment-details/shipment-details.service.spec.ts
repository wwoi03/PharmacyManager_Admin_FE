import { TestBed } from '@angular/core/testing';

import { ShipmentDetailsService } from './shipment-details.service';

describe('ShipmentDetailsService', () => {
  let service: ShipmentDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipmentDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
