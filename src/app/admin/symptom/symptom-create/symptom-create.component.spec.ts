import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomCreateComponent } from './symptom-create.component';

describe('SymptomCreateComponent', () => {
  let component: SymptomCreateComponent;
  let fixture: ComponentFixture<SymptomCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymptomCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SymptomCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
