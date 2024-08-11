import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPromotionProgramComponent } from './list-promotion-program.component';

describe('ListPromotionProgramComponent', () => {
  let component: ListPromotionProgramComponent;
  let fixture: ComponentFixture<ListPromotionProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPromotionProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPromotionProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
