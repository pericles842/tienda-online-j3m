import {
  PayMethodData,
  PayMethodDigitalWallet,
  PayMethodKeys,
  PayMethodMobilePay,
  PayMethodTransfer
} from '@/interfaces/pay_method';
import { AuthService } from '@/services/auth.service';
import { ConfigurationService } from '@/services/configuration.service';
import { PayMethodService } from '@/services/pay-method.service';
import { ShoppingCartService } from '@/services/shoppingCard.service';
import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DynamicUpload } from '@/pages/components/dynamic-upload/dynamic-upload';
import { Product } from '@/interfaces/product';
import { User } from '@/interfaces/user';
import { SubtotalShopingcart } from '../subtotal-shopingcart/subtotal-shopingcart';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { fileOrUrlValidator } from '@/utils/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { Message } from "primeng/message";

@Component({
  selector: 'app-checkout',
  imports: [
    Breadcrumb,
    InputTextModule,
    TextareaModule,
    CommonModule,
    DynamicUpload,
    SubtotalShopingcart,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    InputNumberModule,
    Message
],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout {
  payUser: FormGroup = new FormGroup(
    {
      id: new FormControl(0),
      reference: new FormControl(null, [Validators.required]),
      image: new FormControl(null)
    },
    { validators: fileOrUrlValidator() }
  );
  user!: User;
  products: Product[] = [];
  pay_methods: WritableSignal<PayMethodData[]> = signal([]);

  indexMethod: number = 0;
  activeMethod!: PayMethodData;

  items: MenuItem[] = [
    { label: 'Hogar', routerLink: '/landing' },
    { label: 'Tienda', routerLink: '/shop' },
    { label: 'verificación ' }
  ];

  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private configurationService: ConfigurationService,
    private payMethodService: PayMethodService
  ) {}

  ngOnInit() {
    this.shoppingCartService.cart_products$.subscribe((items) => {
      this.products = items;
    });
    this.payMethodService.getPublicPayMethods().subscribe((res) => {
      this.pay_methods.set(res);
      this.activeMethod = this.pay_methods()[this.indexMethod];
    });
    this.user = this.authService.decodeToken().user;
  }

  getTotal() {
    return this.shoppingCartService.getTotal();
  }

  getKeysPayMethod(): [keyof PayMethodData, string][] {
    return Object.entries(this.activeMethod.datos) as [keyof PayMethodData, string][];
  }

  getPriceDolarConfiguration() {
    return this.configurationService.getPriceDolarConfiguration();
  }

  calculatePriceForBs(price_of_dollar: number) {
    return this.configurationService.calculatePriceForBs(price_of_dollar);
  }

  parseKeyPayMethod(key: string): string {
    const payMethodLabels: Record<PayMethodKeys, string> = {
      code_bank: 'Código del banco',
      documentation: 'Documento de identidad',
      phone: 'Teléfono',
      name_bank: 'Nombre del banco',
      email: 'Correo',
      num_account: 'Número de cuenta',
      type_account: 'Tipo de cuenta',
      type_person: 'Tipo de persona'
    };

    return payMethodLabels[key as PayMethodKeys] || key;
  }

  fileSelected(file: File) {
    this.payUser.patchValue({ image: file });
  }
}
