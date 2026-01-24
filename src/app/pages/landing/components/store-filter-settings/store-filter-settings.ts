import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { Badge } from 'primeng/badge';
import { Button } from 'primeng/button';
import { ColorPickerModule } from 'primeng/colorpicker';
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-store-filter-settings',
  imports: [ Button, AccordionModule, Badge, ColorPickerModule, FormsModule,SliderModule],
  templateUrl: './store-filter-settings.html',
  styleUrl: './store-filter-settings.scss'
})
export class StoreFilterSettings {
  rangeValues: number[] = [0, 5000];
  color: string | undefined;
  stylesInTabsAcordeon = {
    'background-color': 'var(--color-surface-50)',
    'border-radius': '7px',
    'box-shadow': '0px 3px 4px rgba(0, 0, 0, 0.10)'
  };
}
