import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOrderListComponent } from './details-order-list.component';

describe('DetailsOrderListComponent', () => {
  let component: DetailsOrderListComponent;
  let fixture: ComponentFixture<DetailsOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsOrderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
