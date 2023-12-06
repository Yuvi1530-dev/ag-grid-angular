import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputcheckboxComponent } from './inputcheckbox.component';

describe('InputcheckboxComponent', () => {
  let component: InputcheckboxComponent;
  let fixture: ComponentFixture<InputcheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputcheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputcheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
