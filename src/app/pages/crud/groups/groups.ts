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
import { ButtonModule } from "primeng/button";

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
    rif: new FormControl(''),
    email: new FormControl(''),
    url_img: new FormControl('')
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

  /**
   *Lista las cajas de ahorro
   *
   * @memberof Groups
   */
  getGroupsService() {
    this.publicGroupsService.getPublicGroups().subscribe((groups) => this.public_groups.set(groups));
  }
}
