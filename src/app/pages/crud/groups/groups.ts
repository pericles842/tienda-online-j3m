import { Column } from '@/interfaces/forms';
import { PublicGroup, PublicGroupFormGroup } from '@/interfaces/groups';
import { AppMenuBar } from '@/pages/components/app-menu-bar/app-menu-bar';
import { DynamicTable } from '@/pages/components/dynamic-table/dynamic-table';
import { DynamicUpload } from '@/pages/components/dynamic-upload/dynamic-upload';
import { PublicGroupsService } from '@/services/groups.service';
import { Component, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { TreeTableModule } from 'primeng/treetable';
import { Message } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';

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

  groupForm: FormGroup<PublicGroupFormGroup> = new FormGroup<PublicGroupFormGroup>({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    rif: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    url_img: new FormControl(null),
    image: new FormControl(null, [Validators.required])
  });

  columns: Column[] = [
    {
      label: 'Grupo',
      key: 'name',
      sortTable: true
    },
    {
      label: 'Imagen',
      key: 'url_img',
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
      sortTable: true,
      dataType: 'date'
    }
  ];
  globalFilterFields: string[] = ['name', 'rif', 'email', 'created_at'];

  constructor(private publicGroupsService: PublicGroupsService) {}

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
    formData.append('group', this.groupForm.value);
    formData.append('image', this.groupForm.value.image);
    console.log(this.groupForm.value);
    console.log(formData);
  }

  fileSelected(file: File) {
    this.groupForm.patchValue({ image: file });
  }
}
