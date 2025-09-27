import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  standalone: true,
  selector: 'app-loading',
  imports: [
    CommonModule,
    ProgressSpinnerModule],
  templateUrl: './loading.html',
  styleUrl: './loading.scss'
})
export class Loading {
  @Input() loading: boolean = false;
}
