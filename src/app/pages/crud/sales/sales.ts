import { Column } from '@/interfaces/forms';
import { Sale } from '@/interfaces/sales';
import { SalesService } from '@/services/sales.service';
import { Component, signal, WritableSignal } from '@angular/core';
import { DynamicTable } from "@/pages/components/dynamic-table/dynamic-table";

@Component({
    selector: 'app-sales',
    imports: [DynamicTable],
    templateUrl: './sales.html',
    styleUrl: './sales.scss'
})
export class Sales {
    sales: WritableSignal<Sale[]> = signal([]);
    columns: Column[] = [
        { label: 'id', key: 'id', sortTable: true },
        { label: 'Capture', key: 'url_img', sortTable: false, dataType: 'private_image' },
        { label: 'Referencia', key: 'reference', sortTable: true },
        { label: 'Total USD', key: 'total_usd', sortTable: true, dataType: 'number' },
        { label: 'Total BS', key: 'total_bs', sortTable: true, dataType: 'number' },

    ];
    globalFilterFields: string[] = ['id', 'reference', 'total_usd', 'total_bs'];

    constructor(private salesService: SalesService) { }

    ngOnInit() {
        this.getSalesService();
    }

    getSalesService() {
        this.salesService.getSales().subscribe((data) => this.sales.set(data));
    }



}
