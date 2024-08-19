import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductSupportComponent } from './create-product-support.component';

describe('CreateProductSupportComponent', () => {
  let component: CreateProductSupportComponent;
  let fixture: ComponentFixture<CreateProductSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProductSupportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProductSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
