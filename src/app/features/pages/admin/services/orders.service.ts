import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getOrders(params: any = {}) {
    let httpParams = new HttpParams();

    httpParams = httpParams.set('per_page', params.per_page || 10);

    Object.keys(params).forEach(key => {
      const value = params[key];
      if (value !== null && value !== undefined && value !== '' && key !== 'per_page') {
        httpParams = httpParams.set(key, value);
      }
    });

    return this.http.get(`${this.baseUrl}/admin/orders`, {
      params: httpParams
    });
  }

  getOrder(id: number) {
    return this.http.get(`${this.baseUrl}/admin/orders/${id}`);
  }

  updateOrder(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/admin/orders/${id}`, data);
  }
}
