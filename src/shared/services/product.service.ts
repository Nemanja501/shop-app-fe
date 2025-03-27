import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ProductService {
    headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders();
    }

    postProduct(productData: any) {
        console.log('product service data', productData);
        return this.http.post('http://localhost:8000/api/post-product', productData, {headers: this.headers});
    }

}