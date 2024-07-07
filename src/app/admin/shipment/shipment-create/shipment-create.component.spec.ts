import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentCreateComponent } from './shipment-create.component';

describe('ShipmentCreateComponent', () => {
  let component: ShipmentCreateComponent;
  let fixture: ComponentFixture<ShipmentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
