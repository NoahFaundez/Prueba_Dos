import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl);
  }
}
