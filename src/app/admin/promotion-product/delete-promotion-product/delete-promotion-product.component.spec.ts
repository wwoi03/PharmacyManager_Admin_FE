import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePromotionProductComponent } from './delete-promotion-product.component';

describe('DeletePromotionProductComponent', () => {
  let component: DeletePromotionProductComponent;
  let fixture: ComponentFixture<DeletePromotionProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePromotionProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePromotionProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
