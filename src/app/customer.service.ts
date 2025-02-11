import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private localXmlPath = '/assets/customer.xml';
  private apiUrl = 'https://api.yourdomain.com/customers'; // Replace with actual API URL

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any[]> {
    if (environment.env === 'local') {
      return this.http.get(this.localXmlPath, { responseType: 'text' }).pipe(
        map(xmlString => {
          const parsedData = this.parseXml(xmlString);
          console.log('Parsed Customers:', parsedData); // Debugging
          return Array.isArray(parsedData) ? parsedData : [];
        }),
        catchError(error => {
          console.error('XML Parsing Error:', error);
          return of([]);
        })
      );
    } else {
      return this.http.get<any[]>(this.apiUrl).pipe(
        catchError(error => {
          console.error('API Fetch Error:', error);
          return of([]);
        })
      );
    }
  }

  searchCustomers(filters: any): Observable<any[]> {
    return this.getCustomers().pipe(
      map(customers => {
        if (!Array.isArray(customers)) {
          console.error('Unexpected Data Format:', customers);
          return [];
        }
        return customers.filter(customer => 
          (!filters.customerId || customer.id?.toString().includes(filters.customerId)) &&
          (!filters.firstName || customer.firstName?.toLowerCase().includes(filters.firstName.toLowerCase())) &&
          (!filters.lastName || customer.lastName?.toLowerCase().includes(filters.lastName.toLowerCase())) &&
          (!filters.zipCode || customer.zipCode?.includes(filters.zipCode)) &&
          (!filters.creationDate || customer.creationDate === filters.creationDate)
        );
      })
    );
  }

  private parseXml(xmlString: string): any[] {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

      // Validate XML format
      if (!xmlDoc || xmlDoc.getElementsByTagName('parsererror').length) {
        console.error('Invalid XML format');
        return [];
      }
      
      const customers: any[] = [];
      const xmlCustomers = xmlDoc.getElementsByTagName('customer');

      // Ensure xmlCustomers is iterable
      if (!xmlCustomers || xmlCustomers.length === 0) {
        console.error('No customers found in XML');
        return [];
      }

      for (let i = 0; i < xmlCustomers.length; i++) {
        const customer = xmlCustomers[i];
        if (!customer) continue;

        const locationElements = customer.getElementsByTagName('location');
        const locations: string[] = [];
        for (let j = 0; j < locationElements.length; j++) {
          locations.push(locationElements[j]?.textContent?.trim() || '');
        }

        customers.push({
          id: customer.getElementsByTagName('id')[0]?.textContent?.trim() || '',
          firstName: customer.getElementsByTagName('firstName')[0]?.textContent?.trim() || '',
          lastName: customer.getElementsByTagName('lastName')[0]?.textContent?.trim() || '',
          zipCode: customer.getElementsByTagName('zipCode')[0]?.textContent?.trim() || '',
          creationDate: customer.getElementsByTagName('creationDate')[0]?.textContent?.trim() || '',
          locations: locations
        });
      }

      console.log('Final Parsed Customers:', customers); // Debugging
      return customers;
    } catch (error) {
      console.error('XML Parsing Failed:', error);
      return [];
    }
  }
}
