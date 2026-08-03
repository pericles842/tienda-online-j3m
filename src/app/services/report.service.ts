import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';

/**
 * PDF mínimo válido usado como contenido de descarga simulada.
 */
const MOCK_PDF_CONTENT = `%PDF-1.1
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 300 150]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj
4 0 obj<</Length 66>>
stream
BT /F1 16 Tf 15 70 Td (Reporte Demo - J3M) Tj ET
endstream
endobj
5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj
xref
0 6
trailer<</Size 6/Root 1 0 R>>
%%EOF`;

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  /**
   * Genera y descarga un PDF simulado (sin backend)
   *
   * @param {string} url
   * @return {*}  {Observable<HttpResponse<Blob>>}
   * @memberof ReportService
   */
  generateDowlandReportPdf(url: string): Observable<HttpResponse<Blob>> {
    const body = new Blob([MOCK_PDF_CONTENT], { type: 'application/pdf' });
    const filename = `reporte-demo-${Date.now()}.pdf`;

    const response = new HttpResponse<Blob>({
      body,
      status: 200,
      headers: new HttpHeaders({ 'Content-Disposition': `attachment; filename="${filename}"` })
    });

    return of(response).pipe(delay(200));
  }
}
