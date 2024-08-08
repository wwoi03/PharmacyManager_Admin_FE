import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPromotionProductComponent } from './list-promotion-product.component';

describe('ListPromotionProductComponent', () => {
  let component: ListPromotionProductComponent;
  let fixture: ComponentFixture<ListPromotionProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPromotionProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPromotionProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
