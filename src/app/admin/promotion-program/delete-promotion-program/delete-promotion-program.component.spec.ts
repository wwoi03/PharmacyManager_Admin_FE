import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePromotionProgramComponent } from './delete-promotion-program.component';

describe('DeletePromotionProgramComponent', () => {
  let component: DeletePromotionProgramComponent;
  let fixture: ComponentFixture<DeletePromotionProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePromotionProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePromotionProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
