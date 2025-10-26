import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { Header } from "./components/header/header";
import { Home } from "./components/home/home";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, RippleModule, StyleClassModule, ButtonModule, DividerModule, Header, Home],
  templateUrl: './landing.html'
})
export class Landing {}
