import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAttributesOther } from './product-attributes-other';

describe('ProductAttributesOther', () => {
  let component: ProductAttributesOther;
  let fixture: ComponentFixture<ProductAttributesOther>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAttributesOther]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAttributesOther);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
