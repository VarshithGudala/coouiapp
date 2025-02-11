import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../order.service';
import { CatalogService } from '../catalog.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalog-list',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
  ], // Import CommonModule here for *ngFor and other directives
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.css'],
  standalone: true,
})
export class CatalogListComponent implements OnInit {
  productsForm!: FormGroup;
  customerId: number | 0 = 0;

  constructor(private fb: FormBuilder, 
    private orderService: OrderService, 
      private route: ActivatedRoute,
    private router: Router,
    private catalogService: CatalogService,
  ) {}


  
  ngOnInit(): void {
    this.productsForm = this.fb.group({
      products: this.fb.array([]),
    });

    this.route.queryParams.subscribe(params => {      
      this.customerId = params['customerId'];
    });
    
    this.catalogService.getProducts().subscribe((products: any[]) => {
      console.log('Products received:', products); // Debugging log
  
      if (!products || products.length === 0) {
        console.warn('No products received from the API.');
        return;
      }
  
      const productArray = this.fb.array(
        products.map(product =>
          this.fb.group({
            id: [product.id],
            name: [product.name],
            description: [product.description],
            quantity: [1],
            price: [product.price],
            selected: [false],
          })
        )
      );
  
      this.productsForm.setControl('products', productArray);
      this.productsForm.updateValueAndValidity(); // Ensure UI updates
    });
  }
  



  get products() {
    return this.productsForm.get('products') as FormArray;
  }

  onSubmit() {
    const selectedProducts = this.products.value;//.filter((p: any) => p.selected);

        this.orderService.submitOrder(selectedProducts, this.customerId ).subscribe(
      (response) => {
        alert('Order submitted successfully');
        this.router.navigate(['/order'], { queryParams: { customerId: this.customerId, refresh: 'true' } });
      },
      (error) => {
        alert('Error submitting order');
        this.router.navigate(['/order'], { queryParams: { refresh: 'true' } }).then((navigated) => {
          console.log('Navigation Success:', navigated);
        });
        
      }
      
    );
  }
}
