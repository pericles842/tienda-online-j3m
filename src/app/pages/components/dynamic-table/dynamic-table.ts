import { ActionTableButton, Column } from '@/interfaces/forms';
import { LayoutService } from '@/layout/service/layout.service';
import { AuthService } from '@/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon, InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { TooltipModule } from 'primeng/tooltip';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-dynamic-table',
  imports: [
    CommonModule,
    TableModule,
    IconField,
    InputIcon,
    TooltipModule,
    Button,
    InputTextModule,
    TextareaModule,
    TagModule,
    InputIconModule,
    ProgressSpinner,
    ImageModule
  ],
  templateUrl: './dynamic-table.html',
  styleUrl: './dynamic-table.scss'
})
export class DynamicTable {
  @Input() columns: Column[] = [];
  @Input() data: any[] = [];

  @Input() name_table: string = 'tabla por defecto';
  @Input() actions_button: ActionTableButton[] = [];
  @Input() globalFilterFields: string[] = [];

  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  //arreglo de seleccion
  @Input() selection: any[] = [];
  @Output() selectionChange = new EventEmitter<any[]>();

  loadingImages: { [url: string]: boolean } = {};

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService
  ) {}

  get getPermissionsUser() {
    return this.authService.getPermissionsUser();
  }

  get dateToday() {
    return new Date().getSeconds();
  }

  /**
   * Filters the table based on the input value.
   * @param table The table to be filtered.
   * @param event The event that triggered the filter.
   */
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }


  /**
   *Emite el arreglo de  datos seleccionados
   *
   * @param {*} event
   * @memberof DynamicTable
   */
  emitSelectionChange(event: any) {
    this.selectionChange.emit(event);
  }

  /**
   * Load an image and show a loading indicator while it is being loaded.
   * @param {string} url The URL of the image to be loaded.
   */
  onImageLoad(url: string) {
    this.loadingImages[url] = url !== '';
  }
}
