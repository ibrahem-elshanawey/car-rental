import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ✅ Create Order
  createOrder(data: any) {
    return this.http.post(`${this.baseUrl}/customer/orders`, data);
  }

  // ✅ Get My Orders (with filters / pagination later)
 getOrders(page: number = 1, perPage: number = 10) {

  let params = new HttpParams()
    .set('page', page)
    .set('per_page', perPage);

  return this.http.get(`${this.baseUrl}/customer/orders`, { params });
}

  // ✅ Get Order Details
  getOrder(id: number) {
    return this.http.get(`${this.baseUrl}/customer/orders/${id}`);
  }
}
