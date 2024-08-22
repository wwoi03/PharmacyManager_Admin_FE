import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePromotionProductComponent } from './create-promotion-product.component';

describe('CreatePromotionProductComponent', () => {
  let component: CreatePromotionProductComponent;
  let fixture: ComponentFixture<CreatePromotionProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePromotionProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePromotionProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
