import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCars(params?: any) {
   let httpParams = new HttpParams();
  
  // ✅ default values
  httpParams = httpParams.set('per_page', params.per_page || 10);

  // ✅ add filters only if exist
  Object.keys(params).forEach(key => {
    const value = params[key];

    if (value !== null && value !== undefined && value !== '' && key !== 'per_page') {
      httpParams = httpParams.set(key, value);
    }
  });
  
  return this.http.get(`${this.baseUrl}/admin/cars`, { params: httpParams });
  }

  getCar(id: number) {
    return this.http.get(`${this.baseUrl}/admin/cars/${id}`);
  }

  createCar(data: any) {
    return this.http.post(`${this.baseUrl}/admin/cars`, data);
  }

  updateCar(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/admin/cars/${id}`, data);
  }

  deleteCar(id: number) {
    return this.http.delete(`${this.baseUrl}/admin/cars/${id}`);
  }
}
