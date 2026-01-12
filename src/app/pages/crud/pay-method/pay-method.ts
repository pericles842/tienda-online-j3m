import { Column } from '@/interfaces/forms';
import { PaymentTypeSelector, PayMethodData, PayMethodForm, TypePayMethod } from '@/interfaces/pay_method';
import { AppMenuBar } from '@/pages/components/app-menu-bar/app-menu-bar';
import { DynamicTable } from '@/pages/components/dynamic-table/dynamic-table';
import { DynamicUpload } from '@/pages/components/dynamic-upload/dynamic-upload';
import { PayMethodService } from '@/services/pay-method.service';
import { fileOrUrlValidator } from '@/utils/forms';
import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-pay-method',
  imports: [
    AppMenuBar,
    Dialog,
    ButtonModule,
    SelectModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    FormsModule,
    Message,
    DynamicUpload,
    DynamicTable
  ],
  templateUrl: './pay-method.html',
  styleUrl: './pay-method.scss'
})
export class PayMethod {
  type_account_bank: WritableSignal<{ type: 'corriente' | 'ahorro'; label: string }[]> = signal([]);
  type_person: WritableSignal<{ type: 'natural' | 'juridica'; label: string }[]> = signal([]);

  pay_method_selected!: PaymentTypeSelector;
  pay_methods: WritableSignal<PaymentTypeSelector[]> = signal<PaymentTypeSelector[]>([]);

  modal: WritableSignal<boolean> = signal<boolean>(false);
  pay_method_form: FormGroup<PayMethodForm> = new FormGroup(
    {
      id: new FormControl(0),
      name: new FormControl('Banco de Venezuela (0102)', [Validators.required]),
      type: new FormControl('pagomovil', [Validators.required]),
      holder: new FormControl('Jose Gutierrez', [Validators.required]),
      datos: new FormGroup({}),
      url_img: new FormControl(''),
      image: new FormControl(null)
    },
    { validators: fileOrUrlValidator() }
  );

  list_pay_methods: WritableSignal<PayMethodData[]> = signal([]);
  columns: Column[] = [
    { label: 'Nombre', key: 'name', sortTable: true },
    { label: 'url_img', key: 'url_img', sortTable: false, dataType: 'image' },
    { label: 'Titular', key: 'holder', sortTable: true },
    { label: 'Tipo', key: 'type', sortTable: true },
    { label: 'Fecha de creación', dataType: 'date', key: 'created_at', sortTable: true }
  ];
  globalFilterFields: string[] = ['name', 'holder', 'type'];
  selectedEliminatePayMethods: PayMethodData[] = [];

  get datosForm(): FormGroup {
    return this.pay_method_form.get('datos') as FormGroup;
  }

  constructor(
    private payMethodService: PayMethodService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.type_person.set([
      { type: 'natural', label: 'Natural' },
      { type: 'juridica', label: 'Juridica' }
    ]);

    this.type_account_bank.set([
      { type: 'ahorro', label: 'Ahorro' },
      { type: 'corriente', label: 'Corriente' }
    ]);
    this.pay_methods.set([
      {
        id: 1,
        type: 'billetera_digital',
        label: 'Billetera digital',
        description: 'Abarca monederos como Zinli, Binance, Zelle, etc'
      },
      { id: 2, type: 'divisa', label: 'Efectivo' },
      { id: 3, type: 'tranferencia', label: 'Transferencia' },
      { id: 4, type: 'pagomovil', label: 'pagomovil' }
    ]);

    this.pay_method_selected = this.pay_methods().find((pay_method) => pay_method.type === 'pagomovil')!;
    this.builderTypePayForm();

    this.getListPayMethods();
  }

  getListPayMethods() {
    this.payMethodService.getPayMethods().subscribe((pay_methods) => this.list_pay_methods.set(pay_methods));
  }

  fileSelected(file: File) {
    this.pay_method_form.patchValue({ image: file });
  }

  builderTypePayForm() {
    const datos = this.pay_method_form.get('datos') as FormGroup;
    Object.keys(datos.controls).forEach((key) => datos.removeControl(key));

    const controlsConfig: Record<TypePayMethod, Record<string, { defaultValue: any; validators: any[] }>> = {
      pagomovil: {
        name_bank: { defaultValue: '', validators: [Validators.required] },
        code_bank: { defaultValue: '0102', validators: [Validators.required] },
        phone: { defaultValue: '', validators: [Validators.required] },
        documentation: { defaultValue: '', validators: [Validators.required] }
      },
      tranferencia: {
        name_bank: { defaultValue: '', validators: [Validators.required] },
        code_bank: { defaultValue: '0102', validators: [Validators.required] },
        phone: { defaultValue: '', validators: [Validators.required] },
        documentation: { defaultValue: '', validators: [Validators.required] },
        num_account: { defaultValue: '', validators: [Validators.required, Validators.minLength(20)] },
        type_account: { defaultValue: 'corriente', validators: [Validators.required] },
        type_person: { defaultValue: 'natural', validators: [Validators.required] }
      },
      billetera_digital: {
        email: { defaultValue: '', validators: [Validators.required, Validators.email] }
      },
      divisa: {}
    };

    const controlsToAdd = controlsConfig[this.pay_method_selected.type] || {};

    Object.entries(controlsToAdd).forEach(([key, config]) => {
      datos.addControl(key, new FormControl(config.defaultValue, config.validators));
    });
  }
  openModal() {
    this.pay_method_form.patchValue({
      id: 0,
      name: 'Banco de Venezuela (0102)',
      type: 'pagomovil',
      holder: 'Jose Gutierrez',
      url_img: '',
      image: null
    });
    this.builderTypePayForm();
    this.modal.set(true);
  }

  goToEdit(pay_method: PayMethodData) {
    this.pay_method_selected.type = pay_method.type;

    if (typeof pay_method.datos === 'string') {
      pay_method.datos = JSON.parse(pay_method.datos);
    }

    this.builderTypePayForm();

    this.pay_method_form.patchValue(pay_method);
    this.pay_method_form.get('datos')?.patchValue(pay_method.datos);

    this.modal.set(true);
  }

  saveRecord() {
    this.pay_method_form.markAllAsDirty();
    this.pay_method_form.updateValueAndValidity();

    //si el formulario no es valido salimos del proceso
    if (!this.pay_method_form.valid) return;
    this.pay_method_form.patchValue({ type: this.pay_method_selected.type });

    const formData = new FormData();
    formData.append('pay_method', JSON.stringify(this.pay_method_form.value));
    formData.append('image', this.pay_method_form.value.image);
    //console.log(this.pay_method_form.value);

    this.pay_method_form.value.id == 0 ? this.createPayMethodService(formData) : this.updatePayMethodService(formData);
  }

  updatePayMethodService(pay_method: FormData) {
    this.payMethodService.updatePayMethod(pay_method).subscribe({
      next: (res) => {
        console.log(res);

        this.list_pay_methods.update((current) => current.map((item) => (item.id === res.id ? res : item)));
        this.modal.set(false);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Metodo de pago actualizado exitosamente' });
      }
    });
  }

  createPayMethodService(pay_method: FormData) {
    this.payMethodService.createPayMethod(pay_method).subscribe({
      next: (res) => {
        this.list_pay_methods.update((current) => [...current, res]);
        this.modal.set(false);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Metodo de pago creado exitosamente' });
      }
    });
  }

  deletePayMethod(event: any) {
    this.confirmationService.confirm({
      message: '¿Estas seguro de eliminar este método de pago?',
      header: 'Eliminar Método de pago',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const id: number[] = [event.id];
        this.deletePayMethodService(id);
      }
    });
  }

  deletePayMethods() {
    this.confirmationService.confirm({
      message: `¿Estas seguro de eliminar ${this.selectedEliminatePayMethods.length} métodos de pago?`,
      header: 'Eliminar métodos de pago',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const ids: number[] = this.selectedEliminatePayMethods.map((item: PayMethodData) => item.id);
        this.deletePayMethodService(ids);
      }
    });
  }

  deletePayMethodService(id: number[]) {
    this.payMethodService.deletePayMethod(id).subscribe((res) => {
      this.list_pay_methods.update((current) => current.filter((item) => !res.ids.includes(item.id)));
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Caja de ahorro eliminada exitosamente' });
      this.selectedEliminatePayMethods = [];
    });
  }
}
