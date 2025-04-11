import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { UserService } from '../../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { Product } from '../../shared/models/product.model';
import { ProductListComponent } from "../../shared/components/product-list/product-list.component";
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NavbarComponent, ProductListComponent, CommonModule, LoadingSpinnerComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{
  id!: string;
  user!: User;
  products: Array<Product> = [];
  isLoading: boolean = true;

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.userService.getById(this.id).subscribe({
      next: (response: any) => {
        console.log('user response', response);
        this.user = response.user;
        this.products = this.user.products;
        this.isLoading = false;
      },
      error: err => console.log('user err', err)
    })
  }
}
