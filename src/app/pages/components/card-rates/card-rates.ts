import { DollarInformation } from '@/interfaces/configuration';
import { ConfigurationService } from '@/services/configuration.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-card-rates',
  imports: [CommonModule],
  templateUrl: './card-rates.html',
  styleUrl: './card-rates.scss'
})
export class CardRates {
  rates: DollarInformation[] = [];
  dateTime: string = new Date().toISOString();
  constructor(private configurationService: ConfigurationService) {}

  ngOnInit() {
    this.rates = this.configurationService.getRates();
  }
}
