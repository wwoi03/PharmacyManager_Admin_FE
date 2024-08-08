import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionProductComponent } from './promotion-product.component';

describe('PromotionProductComponent', () => {
  let component: PromotionProductComponent;
  let fixture: ComponentFixture<PromotionProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
