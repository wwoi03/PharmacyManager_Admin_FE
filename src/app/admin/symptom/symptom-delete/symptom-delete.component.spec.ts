import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomDeleteComponent } from './symptom-delete.component';

describe('SymptomDeleteComponent', () => {
  let component: SymptomDeleteComponent;
  let fixture: ComponentFixture<SymptomDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymptomDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SymptomDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
