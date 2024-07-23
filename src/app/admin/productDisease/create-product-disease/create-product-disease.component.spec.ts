import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductDiseaseComponent } from './create-product-disease.component';

describe('CreateProductDiseaseComponent', () => {
  let component: CreateProductDiseaseComponent;
  let fixture: ComponentFixture<CreateProductDiseaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProductDiseaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProductDiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
