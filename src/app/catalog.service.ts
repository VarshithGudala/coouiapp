import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { environment } from '../environments/environment.dev';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
      return new Observable<Product[]>((observer) => {
        this.http.get<Product[]>(this.apiUrl).subscribe((products) => {
          if (products && products.length > 0) {
            console.log('Fetched Products:');
            products.forEach(product => {
              console.log(`ID: ${product.id}, Name: ${product.name}, Price: ${product.price}`);
            });
            observer.next(products);
          } else {
            console.error('No products found or data is empty.');
            observer.error('No products found or data is empty.');
          }
          observer.complete();
        }, (error) => {
          console.error('Error fetching products:', error);
          observer.error(error);
        });
      });
    }

  getProductById(id: number): Observable<Product> {
    return this.getProducts().pipe(
      map((products: any[]) => products.find((product) => product.id === id)!)
    );
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

}