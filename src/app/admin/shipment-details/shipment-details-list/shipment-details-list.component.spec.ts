import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentDetailsListComponent } from './shipment-details-list.component';

describe('ShipmentDetailsListComponent', () => {
  let component: ShipmentDetailsListComponent;
  let fixture: ComponentFixture<ShipmentDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentDetailsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
