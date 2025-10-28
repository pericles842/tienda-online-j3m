import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-sections',
  imports: [CommonModule,RouterLink],
  templateUrl: './page-sections.html',
  styleUrl: './page-sections.scss'
})
export class PageSections {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
}
