import { ActionTableButton, Column } from '@/interfaces/forms';
import { LayoutService } from '@/layout/service/layout.service';
import { AuthService } from '@/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon, InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { TooltipModule } from 'primeng/tooltip';
import { ImageModule } from 'primeng/image';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-dynamic-table',
    imports: [
        CommonModule,
        TableModule,
        IconField,
        InputIcon,
        TooltipModule,
        Button,
        InputTextModule,
        TextareaModule,
        TagModule,
        InputIconModule,
        ProgressSpinner,
        ImageModule
    ],
    templateUrl: './dynamic-table.html',
    styleUrl: './dynamic-table.scss'
})
export class DynamicTable {
    @Input() columns: Column[] = [];
    @Input() data: any[] = [];

    @Input() name_table: string = 'tabla por defecto';
    @Input() actions_button: ActionTableButton[] = [];
    @Input() globalFilterFields: string[] = [];

    @Output() onEdit = new EventEmitter<any>();
    @Output() onDelete = new EventEmitter<any>();

    //arreglo de seleccion
    @Input() selection: any[] = [];
    @Output() selectionChange = new EventEmitter<any[]>();

    loadingImages: { [url: string]: boolean } = {};
    // Estado para imágenes privadas (por fila y columna)
    privateImageLoading: { [key: string]: boolean } = {};
    privateImageUrls: { [key: string]: string } = {};

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private http: HttpClient
    ) { }

    get getPermissionsUser() {
        return this.authService.getPermissionsUser();
    }

    get changeSecondsUrl() {
        return new Date().getSeconds();
    }

    /**
     * Filters the table based on the input value.
     * @param table The table to be filtered.
     * @param event The event that triggered the filter.
     */
    onGlobalFilter(table: Table, event: Event) {
        const inputValue = (event.target as HTMLInputElement).value.trim();
        table.filterGlobal(inputValue, 'contains');
    }

    /**
     *Emite el arreglo de  datos seleccionados
     *
     * @param {*} event
     * @memberof DynamicTable
     */
    emitSelectionChange(event: any) {
        this.selectionChange.emit(event);
    }

    /**
     * Load an image and show a loading indicator while it is being loaded.
     * @param {string} url The URL of the image to be loaded.
     */
    onImageLoad(url: string) {
        this.loadingImages[url] = url !== '';
    }

    /**
     * Genera una clave única para controlar el estado de carga de las imágenes públicas.
     * Intenta usar el id de la fila + columna + updated_at (si existe) para que,
     * cuando se edite el recurso y cambie updated_at, se fuerce un nuevo loading.
     */
    getImageKey(rowData: any, col: Column): string {
        const id = rowData?.id ?? '';
        const updatedAt = (rowData as any)?.updated_at ?? (rowData as any)?.updatedAt ?? '';
        const url = rowData?.[col.key] ?? '';
        return `${id}_${col.key}_${updatedAt || url}`;
    }

    /**
     * Devuelve la URL de la imagen con un parámetro de versión para controlar el caché.
     * - Si la fila tiene updated_at/updatedAt, se usa como versión.
     * - Si no, se cae a un timestamp corto para evitar usar una imagen vieja en escenarios de edición.
     */
    getImageSrc(rowData: any, col: Column): string {
        const baseUrl = rowData?.[col.key];
        if (!baseUrl) return '';

        const updatedAt = (rowData as any)?.updated_at ?? (rowData as any)?.updatedAt ?? '';

        if (updatedAt) {
            return `${baseUrl}?v=${encodeURIComponent(updatedAt)}`;
        }

        return `${baseUrl}?t=${this.changeSecondsUrl}`;
    }

    /**
     * Genera una clave única por fila/columna para manejar el estado de imagen privada.
     */
    getPrivateImageKey(rowData: any, col: Column): string {
        const id = rowData?.id ?? rowData?.[col.key] ?? '';
        return `${id}_${col.key}`;
    }

    /**
     * Llama al backend para obtener la URL real de una imagen privada.
     * Ajusta la URL y el body según tu API.
     */
    loadPrivateImage(rowData: any, col: Column): void {
        const key = this.getPrivateImageKey(rowData, col);

        // Si ya tenemos la URL cargada, no repetimos la petición
        if (this.privateImageUrls[key]) {
            return;
        }

        // Validamos que exista un id de sale en la fila
        const saleId = rowData?.id;
        if (!saleId) {
            return;
        }

        this.privateImageLoading[key] = true;

        const body = {
            columnKey: col.key,
            row: rowData,
            // Enviamos explícitamente el id de la sale como parámetro "privateImageUrls"
            privateImageUrls: saleId
        };

        this.http
            .get<{ url: string }>(`${environment.host}/sales/photo/${saleId}`)
            .subscribe({
                next: (response) => {
                    this.privateImageUrls[key] = response.url;
                    this.privateImageLoading[key] = false;
                },
                error: () => {
                    this.privateImageLoading[key] = false;
                }
            });
    }
}
