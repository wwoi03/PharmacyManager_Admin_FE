import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductDiseaseComponent } from './delete-product-disease.component';

describe('DeleteProductDiseaseComponent', () => {
  let component: DeleteProductDiseaseComponent;
  let fixture: ComponentFixture<DeleteProductDiseaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProductDiseaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProductDiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
