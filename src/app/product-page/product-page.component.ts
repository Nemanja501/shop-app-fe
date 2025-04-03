import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { constants } from '../../shared/constants';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [NavbarComponent, RouterLink],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent implements OnInit{
  id!: string;
  product!: Product;
  apiUrl: string = constants.apiUrl; 

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.productService.getById(this.id).subscribe({
      next: (response: any) => {
        console.log('prod page res', response);
        this.product = response.product;
      },
      error: err => console.log('product page err', err)
    });
  }
}
