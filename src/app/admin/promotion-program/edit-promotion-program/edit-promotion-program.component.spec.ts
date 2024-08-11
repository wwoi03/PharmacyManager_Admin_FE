import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPromotionProgramComponent } from './edit-promotion-program.component';

describe('EditPromotionProgramComponent', () => {
  let component: EditPromotionProgramComponent;
  let fixture: ComponentFixture<EditPromotionProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPromotionProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPromotionProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
