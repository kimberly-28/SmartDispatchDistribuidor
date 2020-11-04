import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryEntryDetailsComponent } from './inventory-entry-details.component';

describe('InventoryEntryDetailsComponent', () => {
  let component: InventoryEntryDetailsComponent;
  let fixture: ComponentFixture<InventoryEntryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryEntryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryEntryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
