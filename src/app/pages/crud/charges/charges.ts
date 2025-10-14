import { SimpleCharges } from '@/interfaces/charges';
import { Column } from '@/interfaces/forms';
import { Modules } from '@/interfaces/modules';
import { AppMenuBar } from '@/pages/components/app-menu-bar/app-menu-bar';
import { DynamicTable } from '@/pages/components/dynamic-table/dynamic-table';
import { ChargesService } from '@/services/charges.service';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { Table } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-charges',
  imports: [
    AppMenuBar,
    CommonModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    ReactiveFormsModule,
    TextareaModule,
    SelectModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    ConfirmDialogModule,
    ToggleSwitchModule,
    DynamicTable
  ],
  templateUrl: './charges.html',
  styleUrl: './charges.scss'
})
export class Charges {
  charges = signal<SimpleCharges[]>([]);
  modal = signal(false);

  modules: [string, { id: number; name: string }][] = Object.entries(Modules);

  form!: FormGroup;
  // Acciones que se mostrarán como columnas
  actions = ['can_view', 'can_create', 'can_update', 'can_delete'];

  columns: Column[] = [
    { sortTable: true, key: 'name', label: 'nombre' },
    { sortTable: true, key: 'description', style: 'min-width: 2rem', label: 'descripcion' }
  ];

  constructor(
    private chargesService: ChargesService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getRoles();

    this.form = this.fb.group({
      name: [''],
      description: [''],
      permissions: this.fb.array([])
    });

    this.initPermisos();
  }

  private initPermisos(): void {
    const permisosArray = this.form.get('permissions') as FormArray;

    this.modules.forEach(([_, mod]) => {
      const moduloForm = this.fb.group({
        module_id: [mod.id],
        module: [mod.name],
        can_view: [false],
        can_create: [false],
        can_update: [false],
        can_delete: [false]
      });
      permisosArray.push(moduloForm);
    });
  }

  get permisos(): FormArray {
    return this.form.get('permissions') as FormArray;
  }

  guardar(): void {
    console.log(this.form.value);
  }

  getRoles() {
    this.chargesService.getRoles().subscribe({
      next: (roles) => {
        this.charges.set(roles);
      }
    });
  }

  editCharge(data: any) {
    console.log(data);
  }
}
