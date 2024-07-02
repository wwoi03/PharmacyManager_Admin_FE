import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseIndexComponent } from './disease-index.component';

describe('DiseaseIndexComponent', () => {
  let component: DiseaseIndexComponent;
  let fixture: ComponentFixture<DiseaseIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseaseIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiseaseIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
