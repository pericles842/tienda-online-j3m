import { PaymentTypeSelector, PayMethodForm, TypePayMethod } from '@/interfaces/pay_method';
import { AppMenuBar } from '@/pages/components/app-menu-bar/app-menu-bar';
import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Message } from 'primeng/message';
import { DynamicUpload } from '@/pages/components/dynamic-upload/dynamic-upload';

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
  pay_method_form: FormGroup<PayMethodForm> = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('Banco de Venezuela (0102)', [Validators.required]),
    type: new FormControl('pagomovil', [Validators.required]),
    holder: new FormControl('Jose Gutierrez', [Validators.required]),
    datos: new FormGroup({}),
    url_img: new FormControl('')
  });

  get datosForm(): FormGroup {
    return this.pay_method_form.get('datos') as FormGroup;
  }

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
}
