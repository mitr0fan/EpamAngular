import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputDurationComponent } from './custom-input-duration.component';

describe('CustomInputDurationComponent', () => {
  let component: CustomInputDurationComponent;
  let fixture: ComponentFixture<CustomInputDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomInputDurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomInputDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
