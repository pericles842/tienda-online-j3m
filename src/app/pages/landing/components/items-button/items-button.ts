import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from "primeng/button";

@Component({
  selector: 'app-items-button',
  imports: [Button],
  templateUrl: './items-button.html',
  styleUrl: './items-button.scss'
})
export class ItemsButton {
  @Input() size: 'small' | 'large' = 'large'
  @Input() amount: number = 0
  @Output() addAmount: EventEmitter<any> = new EventEmitter<any>()
  @Output() subtractAmount: EventEmitter<any> = new EventEmitter<any>()

}
