import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryPublishedDetailsComponent } from './inventory-published-details.component';

describe('InventoryPublishedDetailsComponent', () => {
  let component: InventoryPublishedDetailsComponent;
  let fixture: ComponentFixture<InventoryPublishedDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryPublishedDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryPublishedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
