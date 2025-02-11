import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:5230/api/products'; // Replace with your API URL
  private orderApiUrl = 'https://dummyapi.com/orders'; // Replace with actual API endpoint
  private dummyOrders: any[] = [];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }


  searchOrders(criteria: any): Observable<any[]> {
    // Replace with actual API call. Simulating with dummy data.
    this.dummyOrders = [
      {
        orderId: '1001',
        customerId: 1,
        orderedBy: 'John Doe',
        orderedDate: new Date(),
        productCount: 3,
      },
      {
        orderId: '1002',
        customerId: 2,
        orderedBy: 'Jane Smith',
        orderedDate: new Date(),
        productCount: 5,
      },
      {
        orderId: '1003',
        customerId: 2,
        orderedBy: 'John Doe',
        orderedDate: new Date(),
        productCount: 3,
      },
      {
        orderId: '1004',
        customerId: 3,
        orderedBy: 'Jane Smith',
        orderedDate: new Date(),
        productCount: 5,
      },
    ];

    if (criteria.orderId) {
    
    this.dummyOrders = this.dummyOrders.filter(order => order.orderId === criteria.orderId);
    }
    if (criteria.customerId) {
      return of(this.dummyOrders.filter(order => order.customerId === +criteria.customerId));
    }
    return of(this.dummyOrders);
  }
  
  submitOrder(selectedProducts: any[], customerId: number): Observable<any> {
    const order = {
      orderId: Math.floor(1000 + Math.random() * 9000).toString(), // Generate unique order ID
      customerId: customerId,
      orderedBy: 'DEV Test',
      orderedDate: new Date(),
      productCount: selectedProducts.length,
      products: selectedProducts
    };
    this.dummyOrders.push(order);
    return of(true);
    //return this.http.post(`${this.apiUrl}/submit`, order);
    
  }
}
