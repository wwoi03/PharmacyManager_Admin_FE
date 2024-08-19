import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductDiseaseComponent } from './list-product-disease.component';

describe('ListProductDiseaseComponent', () => {
  let component: ListProductDiseaseComponent;
  let fixture: ComponentFixture<ListProductDiseaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductDiseaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductDiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
