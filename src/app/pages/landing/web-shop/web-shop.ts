import { Component } from '@angular/core';
import { Header } from "../components/header/header";
import { RouterModule } from "@angular/router";
import { Footer } from "../components/footer/footer";

@Component({
  selector: 'app-web-shop',
  imports: [Header, RouterModule, Footer],
  templateUrl: './web-shop.html',
  styleUrl: './web-shop.scss'
})
export class WebShop {

}
