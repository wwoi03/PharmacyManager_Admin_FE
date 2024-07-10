import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportDeleteComponent } from './support-delete.component';

describe('SupportDeleteComponent', () => {
  let component: SupportDeleteComponent;
  let fixture: ComponentFixture<SupportDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
