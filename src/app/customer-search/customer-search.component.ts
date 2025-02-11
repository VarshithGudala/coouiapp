import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent {
  searchForm: FormGroup;
  customers: any[] = [];
  selectedCustomer: any = null;
  isLoading = false;
  paginatedCustomers: any[] = [];
  isSearchCollapsed = false;
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;
  sortColumn: string = '';
  sortAscending = true;

  constructor(private fb: FormBuilder, 
    private customerService: CustomerService,
    private router: Router) {
    this.searchForm = this.fb.group({
      customerId: [''],
      firstName: [''],
      zipCode: [''],
      creationDate: ['']
    });
  }

  toggleSearch() {
    this.isSearchCollapsed = !this.isSearchCollapsed;
  }

  selectCustomer(customer: any) 
  { this.selectedCustomer = customer; }

  updatePaginatedList() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedCustomers = this.customers.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedList();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedList();
    }
  }

  sort(column: string) {
    if (this.sortColumn === column) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortColumn = column;
      this.sortAscending = true;
    }
    
    this.customers.sort((a, b) => {
      if (a[column] < b[column]) return this.sortAscending ? -1 : 1;
      if (a[column] > b[column]) return this.sortAscending ? 1 : -1;
      return 0;
    });
    this.updatePaginatedList();
  }


  goToOrderPage(customer: any) 
    { 
      if (this.selectedCustomer) 
        { 
          this.router.navigate(['/order'], { queryParams: { customerId: customer.id } }); 
        } 
      else { alert('Please select a customer first.'); 

      }
    }

  onSearch() {
    const filters = this.searchForm.value;
    this.isLoading = true;
    this.customerService.searchCustomers(filters).subscribe(
      (data: any[]) => {
        this.customers = data;
        this.isLoading = false;
        this.totalPages = Math.ceil(this.customers.length / this.itemsPerPage);
        this.updatePaginatedList();
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching customers', error);
      }
    );
  }
}