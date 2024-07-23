import { TestBed } from '@angular/core/testing';

import { ShipmentDetailsUnitService } from './shipment-details-unit.service';

describe('ShipmentDetailsUnitService', () => {
  let service: ShipmentDetailsUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipmentDetailsUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
