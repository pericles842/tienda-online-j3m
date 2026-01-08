import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAttributesFood } from './product-attributes-food';

describe('ProductAttributesFood', () => {
  let component: ProductAttributesFood;
  let fixture: ComponentFixture<ProductAttributesFood>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAttributesFood]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAttributesFood);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
