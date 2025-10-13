import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { IconField } from 'primeng/iconfield';
import { InputIcon, InputIconModule } from 'primeng/inputicon';
import { Button } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TagModule } from 'primeng/tag';
import { Column } from '@/interfaces/forms';

@Component({
  selector: 'app-dynamic-table',
  imports: [CommonModule, TableModule, IconField, InputIcon, Button, InputTextModule, TextareaModule, TagModule, InputIconModule],
  templateUrl: './dynamic-table.html',
  styleUrl: './dynamic-table.scss'
})
export class DynamicTable {
  @Input() columns: Column[] = [];
  @Input() data: any[] = [];
  @Input() name_table: string = 'tabla por defecto';

  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  /**
   * Filters the table based on the input value.
   * @param table The table to be filtered.
   * @param event The event that triggered the filter.
   */
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
