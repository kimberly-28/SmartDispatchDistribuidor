import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesDetailsComponent } from './states-details.component';

describe('StatesDetailsComponent', () => {
  let component: StatesDetailsComponent;
  let fixture: ComponentFixture<StatesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
