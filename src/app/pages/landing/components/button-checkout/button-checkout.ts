import { Product } from '@/interfaces/product';
import { User } from '@/interfaces/user';
import { AuthService } from '@/services/auth.service';
import { ShoppingCartService } from '@/services/shoppingCard.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-button-checkout',
  imports: [CommonModule],
  templateUrl: './button-checkout.html',
  styleUrl: './button-checkout.scss'
})
export class ButtonCheckout {
  @Input() product!: Product;
  @Input() disabled: boolean = false;
  @Output() onCheckout: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private messageService: MessageService
  ) {}

  redirectCheckout(item: Product) {
    const user: User | null = this.authService.getUser();

    if (!user) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Usuario no autenticado',
        detail: 'Debes iniciar session para realizar la compra',
        life: 3000
      });

      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      });

      return;
    }

    if (this.product) this.addToCart(item);
    this.onCheckout.emit();
    this.router.navigate(['/checkout']);
  }

  addToCart(product: Product) {
    product.quantity = 1;
    this.shoppingCartService.addToCart(product);
  }
}
