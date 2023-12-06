import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadercheckboxComponent } from './headercheckbox.component';

describe('HeadercheckboxComponent', () => {
  let component: HeadercheckboxComponent;
  let fixture: ComponentFixture<HeadercheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HeadercheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadercheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
