import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from '../catalog.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

@Component({
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule], // Import CommonModule here for *ngFor and other directives
   selector: 'app-catalog-view',
  templateUrl: './catalog-view.component.html',
})
export class CatalogViewComponent implements OnInit {
  product: any;

  constructor(private route: ActivatedRoute, private catalogService: CatalogService) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.catalogService.getProductById(id).subscribe((data) => (this.product = data));
  }
}