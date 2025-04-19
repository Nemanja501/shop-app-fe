import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ProductService {
    headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders();
    }

    postProduct(productData: any) {
        return this.http.post('http://localhost:8000/api/post-product', productData, {headers: this.headers});
    }

    getById(id: string) {
        return this.http.get(`http://localhost:8000/api/product/${id}`);
    }

    getAll(page: number = 1) {
        return this.http.get('http://localhost:8000/api/home', {
            params: {
                page
            }
        })
    }

    search(search: string, page: number = 1) {
        return this.http.get('http://localhost:8000/api/search', {
            params: {
                search,
                page
            }
        })
    }

}