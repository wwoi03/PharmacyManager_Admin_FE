import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePromotionComponent } from './delete-promotion.component';

describe('DeletePromotionComponent', () => {
  let component: DeletePromotionComponent;
  let fixture: ComponentFixture<DeletePromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePromotionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
