import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { ProductListComponent } from "../../shared/components/product-list/product-list.component";
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { PaginationArrowComponent } from "../../shared/components/pagination-arrow/pagination-arrow.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, ProductListComponent, CommonModule, LoadingSpinnerComponent, PaginationArrowComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  products: Array<Product> = [];
  currentPage!: number;
  lastPage!: number;
  isLoading: boolean = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (response: any) => {
        console.log(response);
        this.isLoading = false;
        this.products = response.products.data;
        this.currentPage = response.products.current_page;
        this.lastPage = response.products.last_page;
      },
      error: err => console.log('home err', err)
    });
  }

  nextPage() {
    this.isLoading = true;
    this.currentPage = this.currentPage + 1;
    this.productService.getAll(this.currentPage).subscribe({
      next: (response: any) => {
        console.log(response);
        this.isLoading = false;
        this.products = response.products.data;
        this.currentPage = response.products.current_page;
        this.lastPage = response.products.last_page;
      },
      error: err => console.log('home err', err)
    });
  }

  previousPage() {
    this.isLoading = true;
    this.currentPage = this.currentPage - 1;
    this.productService.getAll(this.currentPage).subscribe({
      next: (response: any) => {
        console.log(response);
        this.isLoading = false;
        this.products = response.products.data;
        this.currentPage = response.products.current_page;
        this.lastPage = response.products.last_page;
      },
      error: err => console.log('home err', err)
    });
  }
}
