import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffertProductsComponent } from './offert-products.component';

describe('OffertProductsComponent', () => {
  let component: OffertProductsComponent;
  let fixture: ComponentFixture<OffertProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffertProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffertProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
