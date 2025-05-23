import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { UserService } from '../../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { Product } from '../../shared/models/product.model';
import { ProductListComponent } from "../../shared/components/product-list/product-list.component";
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { PaginationArrowComponent } from '../../shared/components/pagination-arrow/pagination-arrow.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NavbarComponent, ProductListComponent, CommonModule, LoadingSpinnerComponent, PaginationArrowComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{
  id!: string;
  user!: User;
  products: Array<Product> = [];
  isLoading: boolean = true;
  currentPage: number = 1;
  lastPage!: number;

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  fetchData() {
    this.userService.getById(this.id, this.currentPage).subscribe({
      next: (response: any) => {
        console.log('user response', response);
        this.user = response.user;
        this.products = response.products.data;
        this.currentPage = response.products.current_page;
        this.lastPage = response.products.last_page;
        this.isLoading = false;
      },
      error: err => console.log('user err', err)
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
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
