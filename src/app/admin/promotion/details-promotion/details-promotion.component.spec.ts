import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPromotionComponent } from './details-promotion.component';

describe('DetailsPromotionComponent', () => {
  let component: DetailsPromotionComponent;
  let fixture: ComponentFixture<DetailsPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsPromotionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
