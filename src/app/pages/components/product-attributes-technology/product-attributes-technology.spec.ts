import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAttributesTechnology } from './product-attributes-technology';

describe('ProductAttributesTechnology', () => {
  let component: ProductAttributesTechnology;
  let fixture: ComponentFixture<ProductAttributesTechnology>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAttributesTechnology]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAttributesTechnology);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
