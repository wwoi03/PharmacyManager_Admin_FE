import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomDetailsComponent } from './symptom-details.component';

describe('SymptomDetailsComponent', () => {
  let component: SymptomDetailsComponent;
  let fixture: ComponentFixture<SymptomDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymptomDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SymptomDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
