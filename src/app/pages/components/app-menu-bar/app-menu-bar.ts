import { Component, EventEmitter, Output, output } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-menu-bar',
  imports: [Toolbar, Button],
  templateUrl: './app-menu-bar.html',
  styleUrl: './app-menu-bar.scss'
})
export class AppMenuBar {
  @Output() touchNew: EventEmitter<any> = new EventEmitter<any>();
  @Output() touchExport: EventEmitter<any> = new EventEmitter<any>();
  @Output() touchDelete: EventEmitter<any> = new EventEmitter<any>();
}
