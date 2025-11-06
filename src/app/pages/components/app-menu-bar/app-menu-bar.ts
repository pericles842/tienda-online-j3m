import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { LayoutService } from '@/layout/service/layout.service';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { ReportService } from '@/services/report.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { AuthService } from '@/services/auth.service';

@Component({
  selector: 'app-menu-bar',
  imports: [Toolbar, Button, TooltipModule, CommonModule, Ripple],
  templateUrl: './app-menu-bar.html',
  styleUrl: './app-menu-bar.scss'
})
export class AppMenuBar {
  @Output() touchNew: EventEmitter<any> = new EventEmitter<any>();
  @Output() touchDelete: EventEmitter<any> = new EventEmitter<any>();

  @Input() labelNewButton: string = 'Nuevo';
  @Input() disableDeleteButton: boolean = true;
  @Input() viewExportExcelButton: boolean = true;
  @Input() viewExportPdfButton: boolean = true;
  @Input() viewDeleteButton: boolean = true;

  @Input() url_api_pdf: string = '';

  constructor(
    public layoutService: LayoutService,
    private messageService: MessageService,
    private reportService: ReportService,
    private authService: AuthService
  ) {}

  get getPermissionsUser() {
    return this.authService.getPermissionsUser();
  }

  generatePdf() {
    this.reportService.generateDowlandReportPdf(this.url_api_pdf).subscribe((response: any) => {
      const file = new Blob([response.body as Blob], { type: 'application/pdf' });
      const contentDisposition = response.headers.get('Content-Disposition');

      //obtenemos el nombre del archivo
      let filename = 'reporte.pdf';
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match && match[1]) {
          filename = match[1];
        }
      }

      const url = window.URL.createObjectURL(file);

      window.open(url, '_blank');

      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);

      //!CON WIONDUS OPEN SE ABRE DIRECTAMENTE
      //const fileURL = URL.createObjectURL(file);

      // Abrir el archivo en una nueva ventana con el nombre del reporte
      //const finalURL = `${fileURL}#filename=${encodeURIComponent(filename)}`;
      // window.open(finalURL, '_blank');

      //?DESCARGAMOS DIRECTAMENTE se requiere el token
      // window.open(`${environment.host}/${this.url_api}`, '_blank');

      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Reporte generado exitosamente' });
    });
  }
}
