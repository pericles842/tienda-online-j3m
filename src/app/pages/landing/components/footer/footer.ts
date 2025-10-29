import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-custom',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  private date = new Date();
  public get fechaActual(): string {
    return this.date.getFullYear().toString();
  }
}
