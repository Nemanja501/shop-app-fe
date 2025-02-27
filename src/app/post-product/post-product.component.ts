import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-post-product',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.scss'
})
export class PostProductComponent {

}
