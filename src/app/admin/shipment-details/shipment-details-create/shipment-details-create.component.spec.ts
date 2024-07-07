import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentDetailsCreateComponent } from './shipment-details-create.component';

describe('ShipmentDetailsCreateComponent', () => {
  let component: ShipmentDetailsCreateComponent;
  let fixture: ComponentFixture<ShipmentDetailsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentDetailsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentDetailsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
