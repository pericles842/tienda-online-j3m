import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFilterSettings } from './store-filter-settings';

describe('StoreFilterSettings', () => {
  let component: StoreFilterSettings;
  let fixture: ComponentFixture<StoreFilterSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreFilterSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreFilterSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
