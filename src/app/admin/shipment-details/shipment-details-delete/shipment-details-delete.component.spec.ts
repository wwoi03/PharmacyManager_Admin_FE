import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentDetailsDeleteComponent } from './shipment-details-delete.component';

describe('ShipmentDetailsDeleteComponent', () => {
  let component: ShipmentDetailsDeleteComponent;
  let fixture: ComponentFixture<ShipmentDetailsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentDetailsDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentDetailsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
