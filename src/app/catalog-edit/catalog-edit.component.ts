import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Import ReactiveFormsModule

import { FormBuilder, FormGroup } from '@angular/forms';
import { CatalogService, Product } from '../catalog.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule], // Import CommonModule here for *ngFor and other directives
   selector: 'app-catalog-edit',
   templateUrl: './catalog-edit.component.html',
})
export class CatalogEditComponent implements OnInit {

  productsForm!: FormGroup;
  productForm: FormGroup;
  productId: number | null = null;
  product: Product | undefined;

  constructor(
    private fb: FormBuilder,
    private catalogService: CatalogService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      id: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {

    this.productsForm = this.fb.group({
      products: this.fb.array([]),
    });
    
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.catalogService.getProducts().subscribe(
        (products) => {
          this.product = products.find((p) => p.id === this.productId);
          if (this.product) {
            this.productForm.patchValue(this.product);
          } else {
            console.error('Product not found');
          }
        },
        (error) => {
          console.error('Failed to load product:', error);
        }
      );
    }
  }


  onCancel(): void {
    this.router.navigate(['/']);
  }
  saveProduct(): void {
    const updatedProduct: Product = {
      id: this.productId!,
      name: this.productForm.get('name')?.value,
      description: this.productForm.get('description')?.value,
      price: this.productForm.get('price')?.value,
    };

    this.catalogService.saveProduct(updatedProduct).subscribe(() => {
      alert('Product updated successfully!');
      this.router.navigate(['/catalog']);
    });
  }
}




