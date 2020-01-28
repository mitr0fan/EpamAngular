import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputDateComponent } from './custom-input-date.component';

describe('CustomInputDateComponent', () => {
  let component: CustomInputDateComponent;
  let fixture: ComponentFixture<CustomInputDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomInputDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomInputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
