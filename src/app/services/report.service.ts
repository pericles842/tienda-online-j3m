import { CreateCharge, SimpleCharge } from '@/interfaces/charges';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private http: HttpClient) {}

  /**
   * Genera y descarga un PDF
   *
   * @param {string} url
   * @return {*}  {Observable<Blob>}
   * @memberof ReportService
   */
  generateDowlandReportPdf(url: string): Observable<any> {
    return this.http.get(`${environment.host}/${url}`, {
      responseType: 'blob',
      observe: 'response'
    });
  }
}
