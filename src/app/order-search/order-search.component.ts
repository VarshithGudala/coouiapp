import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../order.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule], 
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css'],
  providers: [OrderService],
})
export class OrderSearchComponent {
  searchForm: FormGroup;
  orders: any[] = [];
  isLoading = false;
  customerId: number | null = null;

  constructor(private fb: FormBuilder, 
  private route: ActivatedRoute,
  private router: Router,
    private orderService: OrderService) {
    this.searchForm = this.fb.group({
      orderDateFrom: [''],
      orderDateTo: [''],
      orderId: [''],
    });

    
    this.route.queryParams.subscribe(params => {      
      this.customerId = params['customerId'];
      if (this.customerId) {
        this.searchOrders();
      }
    });

    // Refresh results when navigating back
  this.route.queryParams.subscribe((params) => {
    //if (params['refresh'] === 'true') {
      this.searchOrders();
    //}
  });
  }

  ngOnInit() {
    // Get CustomerID from route params
    this.route.queryParams.subscribe(params => {      
      this.customerId = params['customerId'];
      //if (this.customerId) {
        this.searchOrders();
      //}
    });
  }


  navigateToNewOrder() {
    this.router.navigate(['/catalog'], { queryParams: { customerId: this.customerId } });
  }
  
  
  searchOrders() {
    this.isLoading = true;

    const searchCriteria = { ...this.searchForm.value, customerId: this.customerId };

    this.orderService.searchOrders(searchCriteria).subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        alert('Error fetching orders');
      },
    });
  }
}
