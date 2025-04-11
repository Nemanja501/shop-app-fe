import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { constants } from '../../shared/constants';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [NavbarComponent, RouterLink, CommonModule, LoadingSpinnerComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent implements OnInit{
  id!: string;
  product!: Product;
  apiUrl: string = constants.apiUrl;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.productService.getById(this.id).subscribe({
      next: (response: any) => {
        console.log('prod page res', response);
        this.product = response.product;
        this.isLoading = false;
      },
      error: err => console.log('product page err', err)
    });
  }
}
