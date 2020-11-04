import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalDetailsComponent } from './global-details.component';

describe('GlobalDetailsComponent', () => {
  let component: GlobalDetailsComponent;
  let fixture: ComponentFixture<GlobalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
