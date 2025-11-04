import { CreateCharge } from '@/interfaces/charges';
import { ActionTableButton, Column } from '@/interfaces/forms';
import { Modules } from '@/interfaces/modules';
import { ChargesResponse } from '@/interfaces/user';
import { AppMenuBar } from '@/pages/components/app-menu-bar/app-menu-bar';
import { DynamicTable } from '@/pages/components/dynamic-table/dynamic-table';
import { ChargesService } from '@/services/charges.service';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Tag } from 'primeng/tag';
import { Message } from 'primeng/message';
import { ConfirmationService, MessageService } from 'primeng/api';

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
    DynamicTable,
    Tag,
    Message
  ],
  templateUrl: './charges.html',
  styleUrl: './charges.scss'
})
export class Charges {
  /**
   *Cargos del sismta para la tabla
   *
   * @memberof Charges
   */
  charges = signal<CreateCharge[]>([]);

  /**
   * Arreglo de cargos seleccionados para eliminar
   *
   * @type {CreateCharge[]}
   * @memberof Charges
   */
  selectedEliminateCharges: CreateCharge[] = [];
  modal = signal(false);
  modalPermissions = signal(false);
  globalFilter: string[] = ['name', 'description'];

  /**
   *Permisos solo lectura
   *
   * @type {ChargesResponse[]}
   * @memberof Charges
   */
  permissions: ChargesResponse[] = [];
  buttons_table: ActionTableButton[] = [
    {
      icon: 'pi pi-eye',
      tooltip: 'Ver Permisos',
      severity: 'info',
      rounded: true,
      outlined: true,
      method: (event: any) => {
        this.viewPermissionsModule(event);
      }
    }
  ];

  modules: [string, { id: number; name: string }][] = Object.entries(Modules);

  //fomrulario
  form!: FormGroup;

  // Acciones que se mostrarán como columnas
  actions = ['can_view', 'can_create', 'can_update', 'can_delete'];

  /**
   *Columnas de la tabla
   *
   * @type {Column[]}
   * @memberof Charges
   */
  columns: Column[] = [
    { sortTable: true, key: 'name', label: 'Nombre' },
    { sortTable: true, key: 'description', style: 'min-width: 2rem', label: 'Descripcion' }
  ];

  constructor(
    private chargesService: ChargesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getRoles();

    this.form = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: ['', Validators.required],
      permissions: this.fb.array([])
    });

    this.initPermisos();
  }

  /**
   *proceos para visualizar los modulos del sistema
   *
   * @param {*} data
   * @memberof Charges
   */
  viewPermissionsModule(data: any) {
    this.modalPermissions.set(true);
    this.permissions = data.permissions;

    this.permissions.map((permiso) => {
      permiso.module = this.modules.find((mod) => mod[1].id === permiso.module_id)?.[1].name || '';
    });
  }

  /**
   *Inicializa los permisos para el formulario
   *
   * @private
   * @memberof Charges
   */
  private initPermisos(): void {
    const permisosArray = this.form.get('permissions') as FormArray;

    this.modules.forEach(([_, mod]) => {
      const moduloForm = this.fb.group({
        id: 0,
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

  /**
   *obtene le fomrulario de permisos creandoen el form gruop
   *
   * @readonly
   * @type {FormArray}
   * @memberof Charges
   */
  get permisos(): FormArray {
    return this.form.get('permissions') as FormArray;
  }

  guardar(): void {
    this.form.markAllAsDirty();
    this.form.updateValueAndValidity();

    //si el formulario no es valido salimos del proceso
    if (!this.form.valid) return;

    this.chargesService.createRole(this.form.value).subscribe({
      next: (res) => {
        this.charges.update((current) => {
          const exists = current.some((item) => item.id === res.id);
          return exists
            ? current.map((item) => (item.id === res.id ? res : item)) //* si existe → editar
            : [...current, res]; //* si no existe → agregar
        });

        this.modal.set(false);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Cargo creado exitosamente'
        });
      }
    });
  }

  /**
   *Obtener los roles
   *
   * @memberof Charges
   */
  getRoles() {
    this.chargesService.getRoles().subscribe((roles) => this.charges.set(roles));
  }

  editCharge(data: any) {
    this.openModal();
    this.form.patchValue(data);
  }

  openModal() {
    this.form.patchValue({
      id: 0,
      name: '',
      description: ''
    });

    const permisosArray = this.permisos as FormArray;
    permisosArray.controls.forEach((control) => {
      control.patchValue({
        id: 0,
        module_id: control.get('module_id')?.value,
        module: control.get('module')?.value,
        can_view: false,
        can_create: false,
        can_update: false,
        can_delete: false
      });
    });

    this.modal.set(true);
  }

  deleteCharge(data: any) {
    this.confirmationService.confirm({
      message: '¿Estas seguro de eliminar este cargo?',
      header: 'Eliminar Cargo',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.chargesService.deleteRoles(data.id).subscribe({
          next: (res) => {
            this.charges.update((current) => current.filter((item) => item.id !== data.id));
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Cargo eliminado exitosamente'
            });
          }
        });
      }
    });
  }

  deleteChargeMultiple() {
    let sms = `¿Estas seguro de eliminar ${this.selectedEliminateCharges.length} cargos?`;
    const validate_ids = [1, 2, 3, 4, 5, 6];
    const hasValidateId = validate_ids.some((id) => this.selectedEliminateCharges.map((item) => item.id).includes(id));

    if (hasValidateId) sms += ' Aviso No se van a eliminar cargos por defecto del sistema';

    this.confirmationService.confirm({
      message: sms,
      header: 'Eliminar Cargos',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //Extraemos los ids de los cargos
        const ids = this.selectedEliminateCharges.map((item) => item.id);

        this.chargesService.deleteGroupRoles(ids).subscribe({
          next: (res) => {
            this.charges.update((current) => {
              return current.filter((item) => !res.ids_to_delete_from_request.includes(item.id));
            });

            this.selectedEliminateCharges = [];
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Cargos eliminados exitosamente'
            });
          }
        });
      }
    });
  }
}
