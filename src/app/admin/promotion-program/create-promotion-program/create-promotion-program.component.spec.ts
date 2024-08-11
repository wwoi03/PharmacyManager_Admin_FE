import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePromotionProgramComponent } from './create-promotion-program.component';

describe('CreatePromotionProgramComponent', () => {
  let component: CreatePromotionProgramComponent;
  let fixture: ComponentFixture<CreatePromotionProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePromotionProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePromotionProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
