import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { LayoutService } from '@/layout/service/layout.service';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-menu-bar',
  imports: [Toolbar, Button, TooltipModule, CommonModule, Ripple],
  templateUrl: './app-menu-bar.html',
  styleUrl: './app-menu-bar.scss'
})
export class AppMenuBar {
  @Output() touchNew: EventEmitter<any> = new EventEmitter<any>();
  @Output() touchExport: EventEmitter<any> = new EventEmitter<any>();
  @Output() touchDelete: EventEmitter<any> = new EventEmitter<any>();

  @Input() labelNewButton: string = 'Nuevo';
  @Input() disableDeleteButton: boolean = true;
  @Input() viewExportExcelButton: boolean = true;
  @Input() viewExportPdfButton: boolean = true;
  @Input() viewDeleteButton: boolean = true;

  constructor(public layoutService: LayoutService) {}
}
