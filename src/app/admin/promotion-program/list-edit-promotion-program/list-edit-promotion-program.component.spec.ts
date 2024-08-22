import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEditPromotionProgramComponent } from './list-edit-promotion-program.component';

describe('ListEditPromotionProgramComponent', () => {
  let component: ListEditPromotionProgramComponent;
  let fixture: ComponentFixture<ListEditPromotionProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEditPromotionProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEditPromotionProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
