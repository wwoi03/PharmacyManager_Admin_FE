import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionProgramComponent } from './promotion-program.component';

describe('PromotionProgramComponent', () => {
  let component: PromotionProgramComponent;
  let fixture: ComponentFixture<PromotionProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
