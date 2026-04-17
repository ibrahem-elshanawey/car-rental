import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
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
  
  return this.http.get(`${this.baseUrl}/customer/cars`, { params: httpParams });
  }

  getCar(id: number) {
    return this.http.get(`${this.baseUrl}/customer/cars/${id}`);
  }
}
