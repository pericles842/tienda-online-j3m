import { Product } from '@/interfaces/product';
import { ProductJ3mService } from '@/services/products.service';
import { Component } from '@angular/core';
import { AutoComplete } from "primeng/autocomplete";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LayoutService } from '@/layout/service/layout.service';

@Component({
    selector: 'app-search-autocomplete',
    imports: [AutoComplete, FormsModule, CommonModule, ReactiveFormsModule],
    templateUrl: './search-autocomplete.html',
    styleUrl: './search-autocomplete.scss'
})
export class SearchAutocomplete {

    form = new FormGroup({
        search: new FormControl(null)
    });
    products: Product[] = [];
    items: any[] = [];
    constructor(
        private productJ3mService: ProductJ3mService,
        private router: Router,
        public layoutService:LayoutService
    ) { }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.productJ3mService.getPublicProducts().subscribe(products => this.products = products);
    }

    filterProducts(event: any) {
        const query = event.query.toLowerCase();

        this.items = this.products.filter(product => product.name.toLowerCase().includes(query)).slice(0, 10);
    }


    goToProductById(event: any) {
        const id = event.value.id;
        this.router.navigate(['/product', id]);

    }
}
