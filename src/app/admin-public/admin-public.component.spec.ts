import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPublicComponent } from './admin-public.component';

describe('AdminPublicComponent', () => {
  let component: AdminPublicComponent;
  let fixture: ComponentFixture<AdminPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPublicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
