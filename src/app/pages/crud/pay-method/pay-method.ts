import { PaymentTypeSelector, PayMethodForm, TypePayMethod } from '@/interfaces/pay_method';
import { AppMenuBar } from '@/pages/components/app-menu-bar/app-menu-bar';
import { CommonModule } from '@angular/common';
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
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Message } from 'primeng/message';
import { DynamicUpload } from '@/pages/components/dynamic-upload/dynamic-upload';
import { PayMethodService } from '@/services/pay-method.service';

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
    DynamicUpload
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

  get datosForm(): FormGroup {
    return this.pay_method_form.get('datos') as FormGroup;
  }

  constructor(private payMethodService: PayMethodService) {}

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
      { id: 3, type: 'transferencia', label: 'Transferencia' },
      { id: 4, type: 'pagomovil', label: 'pagomovil' }
    ]);

    this.pay_method_selected = this.pay_methods().find((pay_method) => pay_method.type === 'pagomovil')!;
    this.builderTypePayForm();
  }
  fileSelected(file: File) {
    this.pay_method_form.patchValue({ image: file });
  }

  builderTypePayForm() {
    const datos = this.pay_method_form.get('datos') as FormGroup;
    Object.keys(datos.controls).forEach((key) => datos.removeControl(key));

    const controlsConfig: Record<TypePayMethod, Record<string, { defaultValue: any; validators: any[] }>> = {
      pagomovil: {
        code_bank: { defaultValue: '0102', validators: [Validators.required] },
        phone: { defaultValue: '', validators: [Validators.required] },
        documentation: { defaultValue: '', validators: [Validators.required] }
      },
      transferencia: {
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
    this.modal.set(true);
  }

  saveRecord() {
    this.pay_method_form.markAllAsDirty();
    this.pay_method_form.updateValueAndValidity();

    //si el formulario no es valido salimos del proceso
    if (!this.pay_method_form.valid) return;

    const formData = new FormData();
    formData.append('pay_method', JSON.stringify(this.pay_method_form.value));
    formData.append('image', this.pay_method_form.value.image);
    console.log(this.pay_method_form.value);

    this.payMethodService.createPayMethod(formData).subscribe((res) => {
      console.log(res);
    });
  }
}
