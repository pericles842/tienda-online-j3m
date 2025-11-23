import { Column } from '@/interfaces/forms';
import { PublicGroup, PublicGroupFormGroup } from '@/interfaces/groups';
import { AppMenuBar } from '@/pages/components/app-menu-bar/app-menu-bar';
import { DynamicTable } from '@/pages/components/dynamic-table/dynamic-table';
import { DynamicUpload } from '@/pages/components/dynamic-upload/dynamic-upload';
import { PublicGroupsService } from '@/services/groups.service';
import { Component, signal, WritableSignal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { TreeTableModule } from 'primeng/treetable';
import { Message } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

/**
 * Validator para que un formulario tenga o bien una imagen o una url de imagen
 *
 * En el caso de crear un grupo, es obligatorio subir una imagen.
 * En el caso de editar un grupo, se permite subir una imagen o una url de imagen.
 *
 * @returns {null} si el formulario es válido o un objeto con la clave "fileOrUrlRequired" si no es válido
 */
export function fileOrUrlValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const image = control.get('image')?.value;
    const url_img = control.get('url_img')?.value;

    // Crear: debe haber image
    // Editar: puede haber image o url_img
    if (!image && !url_img) {
      return { fileOrUrlRequired: true };
    }

    return null;
  };
}

@Component({
  selector: 'app-groups',
  imports: [
    AppMenuBar,
    DynamicTable,
    CommonModule,
    InputTextModule,
    TextareaModule,
    TreeTableModule,
    Dialog,
    ReactiveFormsModule,
    FormsModule,
    DynamicUpload,
    Message,
    ButtonModule
  ],
  templateUrl: './groups.html',
  styleUrl: './groups.scss'
})
export class Groups {
  public_groups: WritableSignal<PublicGroup[]> = signal([]);
  modal: WritableSignal<boolean> = signal(false);

  groupForm: FormGroup<PublicGroupFormGroup> = new FormGroup<PublicGroupFormGroup>(
    {
      id: new FormControl(0),
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      rif: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      url_img: new FormControl(null),
      image: new FormControl(null)
    },
    { validators: fileOrUrlValidator() }
  );

  columns: Column[] = [
    {
      label: 'Grupo',
      key: 'name',
      sortTable: true
    },
    {
      label: 'Imagen',
      key: 'url_img',
      style: 'w-16',
      sortTable: false,
      dataType: 'image'
    },
    {
      label: 'Rif',
      key: 'rif',
      sortTable: true
    },
    {
      label: 'Correo',
      key: 'email',
      sortTable: true
    },
    {
      label: 'Fecha creación',
      key: 'created_at',
      style: 'w-16',
      sortTable: true,
      dataType: 'date'
    }
  ];
  globalFilterFields: string[] = ['name', 'rif', 'email', 'created_at'];

  constructor(
    private publicGroupsService: PublicGroupsService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getGroupsService();
  }

  openModal() {
    this.groupForm.patchValue({
      id: 0,
      name: '',
      description: '',
      rif: '',
      email: '',
      url_img: '',
      image: null
    });
    this.modal.set(true);
  }

  /**
   *Lista las cajas de ahorro
   *
   * @memberof Groups
   */
  getGroupsService() {
    this.publicGroupsService.getPublicGroups().subscribe((groups) => this.public_groups.set(groups));
  }

  saveGroup() {
    this.groupForm.markAllAsDirty();
    this.groupForm.updateValueAndValidity();

    //si el formulario no es valido salimos del proceso
    if (!this.groupForm.valid) return;

    const formData = new FormData();

    // Agregar todos los campos normales
    formData.append('group', JSON.stringify(this.groupForm.value));
    formData.append('image', this.groupForm.value.image);
    // console.log(this.groupForm.value);
    // console.log(formData);

    this.groupForm.value.id == 0 ? this.createGroupService(formData) : this.updateGroupService(formData);
  }

  createGroupService(group: FormData) {
    this.publicGroupsService.createPublicGroup(group).subscribe((res) => {
      this.public_groups.update((groups) => [...groups, res]);
      this.modal.set(false);
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Caja de ahorro creada exitosamente' });
    });
  }

  fileSelected(file: File) {
    this.groupForm.patchValue({ image: file });
  }

  goToEdit(group: PublicGroup) {
    this.openModal();
    this.groupForm.patchValue(group);
  }

  updateGroupService(group: FormData) {
    this.publicGroupsService.updatePublicGroup(group).subscribe((res) => {
      this.public_groups.update((current) => current.map((item) => (item.id === res.id ? res : item)));
      this.modal.set(false);
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Caja de ahorro actualizada exitosamente' });
    });
  }
}
