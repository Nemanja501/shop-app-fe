import { Component, Input } from "@angular/core";
import { Product } from "../../models/product.model";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { constants } from "../../constants";

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
    @Input() products: Array<Product> = [];
    apiUrl: string = constants.apiUrl;
}