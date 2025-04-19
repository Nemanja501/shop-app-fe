import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ProductListComponent } from '../../shared/components/product-list/product-list.component';
import { PaginationArrowComponent } from '../../shared/components/pagination-arrow/pagination-arrow.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [NavbarComponent, CommonModule, LoadingSpinnerComponent, ProductListComponent, PaginationArrowComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent implements OnInit{
  searchQuery!: string;
  products: Array<Product> = [];
  isLoading: boolean = true;
  currentPage: number = 1;
  lastPage!: number;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  fetchData() {
    this.productService.search(this.searchQuery, this.currentPage).subscribe({
      next: (response: any) => {
        console.log('search page res', response);
        this.products = response.products.data;
        this.currentPage = response.products.current_page;
        this.lastPage = response.products.last_page;
        this.isLoading = false;
      },
      error: err => console.log('search page err', err)
    });
  }

  ngOnInit(): void {
    this.searchQuery = this.route.snapshot.paramMap.get('query') as string;
    this.fetchData();
  }

  nextPage() {
    this.isLoading = true;
    this.currentPage = this.currentPage + 1;
    this.fetchData();
  }

  previousPage() {
    this.isLoading = true;
    this.currentPage = this.currentPage - 1;
    this.fetchData();
  }
}
