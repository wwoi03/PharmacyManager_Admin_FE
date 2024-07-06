import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomEditComponent } from './symptom-edit.component';

describe('SymptomEditComponent', () => {
  let component: SymptomEditComponent;
  let fixture: ComponentFixture<SymptomEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymptomEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SymptomEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
