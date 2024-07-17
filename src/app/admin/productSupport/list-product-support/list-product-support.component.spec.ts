import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductSupportComponent } from './list-product-support.component';

describe('ListProductSupportComponent', () => {
  let component: ListProductSupportComponent;
  let fixture: ComponentFixture<ListProductSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductSupportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
