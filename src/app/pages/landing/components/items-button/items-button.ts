import { Component, Input } from '@angular/core';
import { Button } from "primeng/button";

@Component({
  selector: 'app-items-button',
  imports: [Button],
  templateUrl: './items-button.html',
  styleUrl: './items-button.scss'
})
export class ItemsButton {
  @Input() size: 'small' | 'large' = 'large'
}
