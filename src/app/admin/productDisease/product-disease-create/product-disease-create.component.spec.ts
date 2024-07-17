import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDiseaseCreateComponent } from './product-disease-create.component';

describe('ProductDiseaseCreateComponent', () => {
  let component: ProductDiseaseCreateComponent;
  let fixture: ComponentFixture<ProductDiseaseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDiseaseCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDiseaseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
