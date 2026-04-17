import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InstallmentsService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ✅ Get all installments
  getInstallments(page: number = 1, perPage: number = 10) {
    return this.http.get(`${this.baseUrl}/customer/installments`, {
      params: {
        page,
        per_page: perPage
      }
    });
  }

  // ✅ Pay installment
  payInstallment(id: number) {
    return this.http.post(`${this.baseUrl}/customer/installments/${id}/pay`, {});
  }
}
