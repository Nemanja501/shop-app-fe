import { Component, Input } from "@angular/core";
import { Product } from "../../models/product.model";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
    @Input() products: Array<Product> = [];
}