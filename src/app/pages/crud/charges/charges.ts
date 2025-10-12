import { Component } from '@angular/core';
import { AppMenuBar } from '@/pages/components/app-menu-bar/app-menu-bar';
import { TableModule } from 'primeng/table';
import { Rating, RatingModule } from 'primeng/rating';
import { Tag, TagModule } from 'primeng/tag';
import { Button, ButtonModule } from 'primeng/button';
import { IconField, IconFieldModule } from 'primeng/iconfield';
import { InputIcon, InputIconModule } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Column } from '@/interfaces/forms';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ChargesService } from '@/services/charges.service';

@Component({
  selector: 'app-charges',
  imports: [
    AppMenuBar,
    CommonModule,
    TableModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    TagModule,
    InputIconModule,
    IconFieldModule,
    ConfirmDialogModule
  ],
  templateUrl: './charges.html',
  styleUrl: './charges.scss'
})
export class Charges {
  columns: Column[] = [
    { sortTable: false, key: 'nombre', field: 'nombre' },
    { sortTable: true, key: 'description', field: 'descripcion' }
  ];

  constructor(private chargesService: ChargesService) {}

  ngOnInit() {
   this.chargesService.getRoles().subscribe({
    next: (roles) => {
      console.log(roles);
    },
    error: (error) => {
      console.log(error);
    }
   });
  }
}
