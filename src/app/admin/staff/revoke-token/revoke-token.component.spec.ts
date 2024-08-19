import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevokeTokenComponent } from './revoke-token.component';

describe('RevokeTokenComponent', () => {
  let component: RevokeTokenComponent;
  let fixture: ComponentFixture<RevokeTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevokeTokenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevokeTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
