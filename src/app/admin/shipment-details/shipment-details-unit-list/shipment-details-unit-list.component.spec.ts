import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentDetailsUnitListComponent } from './shipment-details-unit-list.component';

describe('ShipmentDetailsUnitListComponent', () => {
  let component: ShipmentDetailsUnitListComponent;
  let fixture: ComponentFixture<ShipmentDetailsUnitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentDetailsUnitListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentDetailsUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
