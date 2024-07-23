import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductSupportComponent } from './delete-product-support.component';

describe('DeleteProductSupportComponent', () => {
  let component: DeleteProductSupportComponent;
  let fixture: ComponentFixture<DeleteProductSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProductSupportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProductSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
