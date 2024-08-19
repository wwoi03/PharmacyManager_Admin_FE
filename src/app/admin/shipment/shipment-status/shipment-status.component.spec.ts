import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentStatusComponent } from './shipment-status.component';

describe('ShipmentStatusComponent', () => {
  let component: ShipmentStatusComponent;
  let fixture: ComponentFixture<ShipmentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
